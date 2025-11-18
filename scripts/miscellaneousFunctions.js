
export function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export function contains(parent, child) {
    if (parent.toLowerCase().includes(child.toLowerCase())) {
        return true;
    }
    return false;
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
