import { contains } from "../scripts/miscellaneousFunctions.js"
const default_filters = {
    type: "All",
    grade: -1,
    area_of_interest: ["All"],
    location: "All",
    skylscore: "All",
    eligibility: ["All"],
    deadline: "All"
}

export function filterByType(query, type) {
    if (contains(type, "Scholarship")) {
        return query.ilike('TYPE','%scholarship%');
    }
    if (contains(type, "Internship")) {
        return query.ilike('TYPE','%internship%');
    }
    if (contains(type, "Research Opportunity")) {
        return query.ilike('TYPE','%research%');
    }
    return query;
}
export function filterByGrade(query, grade) {
    console.log('Filtering by grade:', grade, 'Type:', typeof grade);
    if(grade === -1 || grade === ''){
        return query;
    }
    const gradeStr = String(grade);
    console.log('Converted grade to string:', gradeStr);
    return query.overlaps('GRADE',[gradeStr]);
}
export function filterByInterest(query, area_of_interest) {
    if(contains(area_of_interest[0],"All")){
        return query;
    }
    return query.overlaps('AREA_OF_INTEREST',area_of_interest); 
}
export function filterByLocation(query, location) { 
    if(contains(location,"All")){
        return query;
    }else
    if(contains(location,"virtual")){
        return query.ilike('LOCATION','%Virtual%');
    }else{
        return query.not('LOCATION','ilike','%Virtual%');
    }

}
export function filterBySkylscore(query, skylscore) { 
    if(contains(skylscore, "low")){
        return query.lte('SKYLSCORE', 3);
    }else if(contains(skylscore, "high")){
        return query.gte('SKYLSCORE',7);
    }else if (contains(skylscore, "moderate")){
        return query.lt('SKYLSCORE', 7).gt('SKYLSCORE', 3);
    }
    return query;
}
export function filterByEligibility(query, eligibility) { 
    if(contains(eligibility[0],"All")){
        return query;
    }else{
        return query.overlaps('ELIGIBILITY',eligibility)
    }
}
export function filterByDeadline(query, deadline) { 
    if(contains(deadline, "Still Active")){
    return query.gte('DEADLINE', new Date().toISOString());
    }
    return query;
}


// Function to clean up and set default values for any missing or invalid filters
export function sanitizeNullFilters(filters) {
    // Log the filters we received to help with debugging
    console.log("Raw filters received:", filters);

    // If filters is not an object or is null, return the default filters
    if (typeof filters !== 'object' || filters === null) return default_filters;

    // Loop through each filter (type, grade, location, etc.)
    for (let key in filters) {
        // Only process if this is a property of the filters object
        if (filters.hasOwnProperty(key)) {
            // Log what we're currently processing
            console.log(`Processing ${key}:`, filters[key]);
            
            // Case 1: If the filter value is null or undefined
            if (isNull(filters[key])) {
                // Replace it with the default value for this filter
                filters[key] = default_filters[key];
            } 
            // Case 2: If the filter value is an array (like area_of_interest or eligibility)
            else if (isArray(filters[key])) {
                // If the array is empty, use the default value
                if (filters[key].length === 0) {
                    filters[key] = default_filters[key];
                }
            } 
            // Case 3: If the filter value is an empty string
            else if (filters[key] === '') {
                // Replace empty string with the default value
                filters[key] = default_filters[key];
            }
            
        }
    }

    // Log the final cleaned-up filters
    console.log("Sanitized filters:", filters);
    return filters;
}

// Helper function to check if a value is null or undefined
function isNull(value) {
    return (value === null || value === undefined);
}
//Helper function to check if a value is an array
function isArray(value) {
    return Array.isArray(value);
}