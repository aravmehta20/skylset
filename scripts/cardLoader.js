// Updated cardLoader.js

// Define the card template directly in JavaScript to avoid fetch issues
const CARD_TEMPLATE = `
<div class="card">
    <div class="card-body">
        <span class="opportunity-type">{{type}}</span>
        <h3>{{name}}</h3>
        <div class="card-info">
            <p><strong>Price:</strong>{{price}}</p>
            <p><strong>SkylScore Rating:</strong> {{skylscore}}</p>
            <p><strong>Area of Interest:</strong> {{area_of_interest}}</p>
        </div>
        <div class="card-footer">
            <span class="deadline">Deadline: {{deadline}}</span>
            <a href="{{hyperlink}}" class="view-button">View Details →</a>
        </div>
        <button class="save-later-button" title="Save for later">
    <span style="color: #6a1b9a;">❤️</span> Save for Later
</button>

    </div>
</div>
`;




// Function that replaces template placeholders with actual data
function editCardTemplate(template, opportunity) {
    let card = template;
    

    // Replace all placeholders with data
    card = card.replace('{{type}}', opportunity.type);
    card = card.replace('{{name}}', opportunity.name);
    card = card.replace('{{price}}', " $" + opportunity.price);
    card = card.replace('{{skylscore}}', opportunity.skylscore);
    card = card.replace('{{area_of_interest}}', arrayToFormattedString(opportunity.area_of_interest));
    card = card.replace('{{deadline}}', opportunity.deadline);
    card = card.replace('{{hyperlink}}', opportunity.hyperlink || '#');
    
    return card;
}

function clearCards(){
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
}

// Main function to load opportunities and render them into cards
export function loadAllCards(opportunities) {
    // Get the card container element
    const cardContainer = document.getElementById('card-container');
    const loader = document.getElementById('loader');

    // If the card container does not exist, end function
    if (!cardContainer) return;

    // Remove the loader if it exists
    if (loader) {
        loader.remove();
    }

    // Clear any existing cards
    clearCards();

    // Check if opportunities is defined and is an array
    if (!opportunities || !Array.isArray(opportunities)) {
        console.error('Invalid opportunities data:', opportunities);
        // Add a message to the card container
        cardContainer.innerHTML = '<div class="no-results">No opportunities found</div>';
        return;
    }

    // Create and add each card to the container
    opportunities.forEach(opportunity => {
        const editedCard = editCardTemplate(CARD_TEMPLATE, opportunity);
        // Use insertAdjacentHTML to properly parse the HTML string
        cardContainer.insertAdjacentHTML('beforeend', editedCard);
    });
}

function arrayToFormattedString(array){
    let result = "";
    array.forEach(element => {
        result+=element+", ";
    });
    return result.substring(0,result.length-2);
}
function priceToFormattedString(price){
    if(price===0){
        return " Free";
    }else{
        return " $" + addCommasToPrice(price);
    }
}
function addCommasToPrice(price){
    let priceStr = price.toString();
    for(let i = priceStr.length-4; i >=0; i-=3){
        priceStr = priceStr.substring(0,i+1) + "," + priceStr.substring(i+1);
    }
    return priceStr
}