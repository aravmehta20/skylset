import { formatSupabaseResults, contains, formatDate } from "../scripts/miscellaneousFunctions.js"
import { filterByType, filterByGrade, filterByInterest, filterByLocation, filterBySkylscore, filterByEligibility, filterByDeadline, sanitizeNullFilters } from "../scripts/filters.js"

const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemZ3aGtqamt4d3NodXB3ZHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDM2NDcsImV4cCI6MjA1OTg3OTY0N30.vIMKaY6llWcXPFoKcW7jAnVRcdBOTBACktUN-Mw9Rew"
const projectURL = "https://tgzfwhkjjkxwshupwdse.supabase.co"

const client = supabase.createClient(projectURL, anonKey);
const tableName = "Biomedical_Opportunities";


// Function to get data from Supabase
export async function fetchOpportunities(searchQuery = "", filters = {}) {

    try {
        let query = client.from(tableName).select('*');

        console.log(filters);
        //get rid of null filters
        let sanitizedFilters = sanitizeNullFilters(filters);
        console.log("sanitizedFilters", sanitizedFilters);
        //filter by type
        console.log("query before select:", query);
        if (!searchQuery=== '') {
            query = query.ilike(NAME, '%searchQuery%');
        }
        query = filterByType(query, sanitizedFilters.type);
        //filter by interest
        query = filterByInterest(query, sanitizedFilters.area_of_interest);
        //filter by grade
        console.log("Before grade filter - grade value:", sanitizedFilters.grade);
        query = filterByGrade(query, sanitizedFilters.grade);
        console.log("After grade filter");
        //filter by location
        query = filterByLocation(query, sanitizedFilters.location);
        //filter by skylscore
        query = filterBySkylscore(query, sanitizedFilters.skylscore);
        //filter by eligibility
        query = filterByEligibility(query, sanitizedFilters.eligibility);
        //filter by deadline
        query = filterByDeadline(query, sanitizedFilters.deadline);
        //send request to supabase


        const { data, error } = await query;

        if (error) {
            throw new Error(`Supabase query failed: ${error.message}`);
        }
        console.log(data);
        const formattedData = formatSupabaseResults(data);
        console.log(formattedData);
        return formattedData;
    }
    catch (error) {
        console.log("Failed to fetch data: " + error);
    }
}

export async function fetchOpportunityByID(id){
    try {
        let query = client.from(tableName).select('*');
        filterByID(id);
        const { data, error } = await query;
//some error handling
        if (error) {
            throw new Error(`Supabase query failed: ${error.message}`);
        }
        console.log(data);
        //return formatted data
        const formattedData = formatSupabaseResults(data);
        console.log(formattedData);
        return formattedData;
    }
    catch (error) {
        console.log("Failed to fetch data: " + error);
    }
}