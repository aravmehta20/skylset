
export function setupMultiSelect(id) {
    const container = document.getElementById(`${id}-container`);
    const selected = document.getElementById(`${id}-selected`);
    const dropdown = document.getElementById(`${id}-dropdown`);
    const allCheckbox = document.getElementById(`${id}-all`);
    console.log(allCheckbox);
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]:not([id$="-all"])');
    const tagsContainer = document.getElementById(`${id}-tags`);
    let autoChange = false;
    // Toggle dropdown when clicking on the selected area
    selected.addEventListener('click', function () {
        dropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!container.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

    // Handle "All" checkbox
    allCheckbox.addEventListener('change', function () {
        if(this.checked){
            //if all is checked, disable all boxes
            uncheckAllBoxes(checkboxes);
        }
            

            updateSelectedText();
            updateTags();
        
    });

    // Handle individual checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            // If any individual checkbox is checked, uncheck "All"
            if(allCheckbox.checked){
                allCheckbox.checked = false;
            }
            //update cards when a checkbox is checked
            updateSelectedText();
            updateTags();
        });
    });

    // Update the selected text based on checked items
    function updateSelectedText() {
        if (allCheckbox.checked) {
            selected.textContent = allCheckbox.nextElementSibling.textContent;
        } else {
            const checkedItems = Array.from(checkboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.nextElementSibling.textContent);

            if (checkedItems.length > 0) {
                selected.textContent = `${checkedItems.length} selected`;
            } else {
                // If nothing is selected, default back to "All"
                allCheckbox.checked = true;
                uncheckAllBoxes(checkboxes);
                selected.textContent = allCheckbox.nextElementSibling.textContent;
            }
        }
    }

    // Update tags display
    function updateTags() {
        tagsContainer.innerHTML = '';

        if (!allCheckbox.checked) {
            Array.from(checkboxes)
                .filter(checkbox => checkbox.checked)
                .forEach(checkbox => {
                    const tag = document.createElement('div');
                    tag.className = 'selected-tag';
                    tag.innerHTML = `
                        ${checkbox.nextElementSibling.textContent}
                        <span class="tag-remove" data-value="${checkbox.value}">×</span>
                    `;
                    tagsContainer.appendChild(tag);

                    // Add event listener to remove tag
                    tag.querySelector('.tag-remove').addEventListener('click', function (e) {
                        e.stopPropagation();
                        const value = this.getAttribute('data-value');
                        
                        checkbox.checked = false;
                        //update UI
                        console.log("updating UI");
                        checkbox.dispatchEvent(new Event('change'));

                        // If no tags left, check "All"
                        const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
                        if (!anyChecked) {
                            allCheckbox.checked = true;
                            uncheckAllBoxes(checkboxes);
                        }

                        updateSelectedText();
                        updateTags();
                    });
                });
        }
    }

    // Initialize states
    checkboxes.forEach(cb => {
        cb.disabled = allCheckbox.checked;
    });
    
    updateSelectedText();
    updateTags();
}

export function setupSingleSelect(id) {
    const container = document.getElementById(`${id}-container`);
    const selected = document.getElementById(`${id}-selected`);
    const dropdown = document.getElementById(`${id}-dropdown`);
    const radioButtons = dropdown.querySelectorAll('input[type="radio"]');

    // Toggle dropdown when clicking on the selected area
    selected.addEventListener('click', function () {
        dropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!container.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

    // Handle radio button selection
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function () {
            updateSelectedText();
            // Hide dropdown after selection
            dropdown.classList.remove('show');
            
        });
    });

    // Update the selected text based on the selected radio button
    function updateSelectedText() {
        const checkedRadio = Array.from(radioButtons).find(radio => radio.checked);
        if (checkedRadio) {
            selected.textContent = checkedRadio.nextElementSibling.textContent;
        }
    }

    // Initialize selected text
    updateSelectedText();
}
function uncheckAllBoxes(checkboxes){
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}
