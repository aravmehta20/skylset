import { contains, formatDate } from "../scripts/miscellaneousFunctions.js"
import { filterByType, filterByGrade, filterByInterest, filterByLocation, filterBySkylscore, filterByEligibility, filterByDeadline, sanitizeNullFilters } from "../scripts/filters.js"

const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemZ3aGtqamt4d3NodXB3ZHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDM2NDcsImV4cCI6MjA1OTg3OTY0N30.vIMKaY6llWcXPFoKcW7jAnVRcdBOTBACktUN-Mw9Rew"
const projectURL = "https://tgzfwhkjjkxwshupwdse.supabase.co"

const client = supabase.createClient(projectURL, anonKey);



// Function to get data from Supabase
export async function fetchOpportunities(searchQuery = "", filters = {}) {

    try {
        let query = client.from("Opportunities").select('*');

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


export function formatSupabaseResults(supabaseResults) {
    if (!Array.isArray(supabaseResults)) {
        console.error('Expected array for supabaseResults but got:', supabaseResults);
        return [];
    }

    const formattedSupabaseResults = [];

    //loop through the array and add the results to the object
    supabaseResults.forEach(result => {
        const formattedResult = {
            id: result.ID,
            name: result.NAME,
            type: result.TYPE,
            price: result.PRICE,
            location: result.LOCATION,
            deadline: formatDate(result.DEADLINE),
            skylscore: result.SKYLSCORE,
            hyperlink: result.HYPERLINK,
            area_of_interest: result.AREA_OF_INTEREST,
            eligibility: result.ELIGIBILITY,
            grades: result.GRADE,
            min_age: result.MIN_AGE,
            max_age: result.MAX_AGE
        };

        //add conditional properties to the result object
        //check if the deadline has passed
        if (new Date(formattedResult.deadline) < new Date()) {
            formattedResult.deadlinePassed = true;
        }

        //check if the location is virtual
        if (formattedResult.location === "Virtual") {
            formattedResult.virtual = true;
        }

        //add the age range to the object
        formattedResult.agerange = result.MIN_AGE + " - " + result.MAX_AGE;

        formattedSupabaseResults.push(formattedResult);
    });

    // Return the formatted array - this was inside the forEach loop before!
    return formattedSupabaseResults;
}
