const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemZ3aGtqamt4d3NodXB3ZHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDM2NDcsImV4cCI6MjA1OTg3OTY0N30.vIMKaY6llWcXPFoKcW7jAnVRcdBOTBACktUN-Mw9Rew"
const projectURL = "https://tgzfwhkjjkxwshupwdse.supabase.co"

const supabase = window.supabase.createClient(projectURL, anonKey);

function applyConditionalFilters(data, filters) {
    if (!Array.isArray(data)) {
        console.error('Expected array for data but got:', data);
        return [];
    }
    
    console.log('Applying conditional filters to', data.length, 'records');
    console.log('Filter object:', filters);

    let filteredData = data;

    if (filters.virtual !== undefined) {
        const before = filteredData.length;
        filteredData = filteredData.filter(opportunity => {
            // Check if the opportunity has virtual property
            const isVirtual = opportunity.LOCATION === "Virtual" || opportunity.virtual === true;
            return isVirtual === filters.virtual;
        });
        console.log(`Virtual filter (${filters.virtual}): reduced from ${before} to ${filteredData.length} records`);
    }

    if (filters.age !== undefined && filters.age !== 0) {
        const before = filteredData.length;
        
        // Handle the case where age might be an HTMLSelectElement
        let ageValue = filters.age;
        
        // If it's an object with a value property, use that
        if (filters.age && typeof filters.age === 'object') {
            if (filters.age.value !== undefined) {
                ageValue = filters.age.value;
                console.log('Extracted age value from object:', ageValue);
            } else if (filters.age.selectedOptions && filters.age.selectedOptions[0]) {
                ageValue = filters.age.selectedOptions[0].value;
                console.log('Extracted age from select element:', ageValue);
            } else {
                console.warn('Could not extract age value from object:', filters.age);
                // Skip this filter if we can't extract a valid age
                return filteredData;
            }
        }
        
        // Convert to number
        const numericAge = Number(ageValue);
        
        if (isNaN(numericAge) || numericAge === 0) {
            console.warn('Age value is not valid for filtering:', ageValue);
            return filteredData; // Skip this filter if age is not a valid number or is 0
        }
        
        console.log('Using age value for filtering:', numericAge);
        
        filteredData = filteredData.filter(opportunity => {
            // Cast to numbers in case they're strings
            const minAge = Number(opportunity.MIN_AGE);
            const maxAge = Number(opportunity.MAX_AGE);
            
            // Make sure the age is within range - use >= and <= to be inclusive
            return !isNaN(minAge) && !isNaN(maxAge) && 
                   numericAge >= minAge && numericAge <= maxAge;
        });
        console.log(`Age filter (${numericAge}): reduced from ${before} to ${filteredData.length} records`);
    }
    
    console.log('Final filtered data count:', filteredData.length);
    return filteredData;
}

// Function to get data from Supabase
async function requestData(searchQuery, filters = {}) {
    try {
        // Process and sanitize filter values before applying them
        const sanitizedFilters = sanitizeFilters(filters);
        
        // Start with unfiltered query to check total records
        const { data: totalData, error: totalError } = await supabase
            .from('Opportunities')
            .select('*');
        
        console.log('Total records in database:', totalData ? totalData.length : 0);
        
        // Now apply filters
        let query = supabase.from('Opportunities').select('*');
        console.log('Initial query:', query);
        
        // Only apply filters if they exist and are not empty
        if (searchQuery || Object.keys(sanitizedFilters).length > 0) {
            query = applyFilters(query, sanitizedFilters, searchQuery);
            console.log('Query after filters applied:', query);
        }

        const { data, error } = await query;
        
        if (error) {
            console.error('Supabase query error:', error);
            throw error;
        }
        
        console.log('Data after database query:', data ? data.length : 0, 'records');
        
        if (!data || data.length === 0) {
            console.warn('No data returned from Supabase query');
            return [];
        }
        
        // Apply conditional filters if any exist
        const hasConditionalFilters = 
            sanitizedFilters.virtual !== undefined || 
            (sanitizedFilters.age !== undefined && sanitizedFilters.age !== 0);
            
        let filteredData = data;
        if (hasConditionalFilters) {
            filteredData = applyConditionalFilters(data, sanitizedFilters);
            console.log('Data after conditional filters:', filteredData ? filteredData.length : 0, 'records');
        }
        
        const formattedResults = formatSupabaseResults(filteredData);
        console.log('Final formatted results:', formattedResults ? formattedResults.length : 0, 'records');
        
        return formattedResults;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to sanitize filter values before applying them
function sanitizeFilters(filters) {
    const sanitized = {};
    
    // Copy over all regular filters
    Object.keys(filters).forEach(key => {
        sanitized[key] = filters[key];
    });
    
    // Special handling for age filter
    if (filters.age !== undefined) {
        let ageValue = filters.age;
        
        // If it's an object with a value property, use that
        if (typeof filters.age === 'object') {
            if (filters.age.value !== undefined) {
                ageValue = filters.age.value;
            } else if (filters.age.selectedOptions && filters.age.selectedOptions[0]) {
                ageValue = filters.age.selectedOptions[0].value;
            } else if (filters.age.tagName === 'SELECT') {
                ageValue = filters.age.value;
            }
        }
        
        // Convert to number
        sanitized.age = Number(ageValue);
        if (isNaN(sanitized.age)) {
            // If conversion fails, remove the age filter
            console.warn('Removed invalid age filter:', filters.age);
            delete sanitized.age;
        } else {
            console.log('Sanitized age filter to:', sanitized.age);
            
            // Skip age filtering if the value is 0 (likely default/unselected value)
            if (sanitized.age === 0) {
                console.log('Age value is 0, skipping age filter');
            }
        }
    }
    
    // Add more special case handling here if needed
    
    return sanitized;
}

function formatSupabaseResults(supabaseResults) {
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
        if(new Date(formattedResult.deadline) < new Date()){
           formattedResult.deadlinePassed = true;
        }
        
        //check if the location is virtual
        if(formattedResult.location === "Virtual"){
            formattedResult.virtual = true;
        }
        
        //add the age range to the object
        formattedResult.agerange = result.MIN_AGE + " - " + result.MAX_AGE;
        
        formattedSupabaseResults.push(formattedResult);
    });
    
    // Return the formatted array - this was inside the forEach loop before!
    return formattedSupabaseResults;
}

// Function to edit user data
async function editUserData(userId, newData) {
    try {
        const { data, error } = await supabase
            .from('Opportunities')
            .update(newData)
            .eq('id', userId);
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating data:', error);
        return null;
    }
}

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function applyFilters(query, filters = {}, searchQuery = '') {
    console.log('Applying filters:', { filters, searchQuery });
    
    // Apply search query if it exists
    if (searchQuery && searchQuery.trim() !== '') {
        query = query.ilike('NAME', `%${searchQuery}%`);
        console.log('Applied search filter for:', searchQuery);
    }

    // Filter by type if valid
    if (filters.type && filters.type.value) {
        if (filters.type.value === "Scholarship") {
            query = query.eq('TYPE', 'SCHOLARSHIP');
            console.log('Filtered by type: SCHOLARSHIP');
        } else if (filters.type.value === "Internship") {
            query = query.eq('TYPE', 'INTERNSHIP');
            console.log('Filtered by type: INTERNSHIP');
        } else if (filters.type.value === "Research Opportunity") {
            query = query.eq('TYPE', 'RESEARCH OPPORTUNITY');
            console.log('Filtered by type: RESEARCH OPPORTUNITY');
        }
    }

    // Filter by grade if array and non-empty
    if (filters.grade && Array.isArray(filters.grade.value) && filters.grade.value.length > 0) {
        query = query.filter('GRADE', 'cs', filters.grade.value);
        console.log('Filtered by grades:', filters.grade.value);
    }

    // Filter by area_of_interest if array and non-empty
    if (filters.area_of_interest && Array.isArray(filters.area_of_interest.value) && filters.area_of_interest.value.length > 0) {
        query = query.overlaps('AREA_OF_INTEREST', filters.area_of_interest.value.map(interest => interest.toUpperCase()));
        console.log('Filtered by interests:', filters.area_of_interest.value);
    }

    // Filter by age if a valid number and not 0 (default value)
    

    // Filter by skylscore if value is valid string
    if (filters.skylscore && typeof filters.skylscore.value === 'string') {
        if (filters.skylscore.value === "High") {
            query = query.gte('SKYLSCORE', 7);
            console.log('Filtered by skylscore: High (≥7)');
        } else if (filters.skylscore.value === "Medium") {
            query = query.gte('SKYLSCORE', 4).lte('SKYLSCORE', 7);
            console.log('Filtered by skylscore: Medium (4-7)');
        } else if (filters.skylscore.value === "Low") {
            query = query.lte('SKYLSCORE', 4);
            console.log('Filtered by skylscore: Low (≤4)');
        }
    }

    // Filter by deadline only if requested
    if (filters.deadline.value==="deadlineNotPassed") {
        query = query.gte('DEADLINE', new Date().toISOString());
        console.log('Filtered to only show active opportunities');
    }


    return query;
}