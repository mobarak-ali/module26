// Function that searchcs meal using a Given API
function searchMeal() {

    const mealName = document.getElementById('meal-name').value; // Grabs Search input value 

    const apiURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; // initial API URL 

    const resultWraper = document.getElementById('results'); // Container to put Search Result

    const modalWraper = document.getElementById('modal-container'); // Container for individual Search Data

    //validate Input
    if (mealName === "") {
        // Prints if blank search is made
        resultWraper.innerHTML = `<p class=" h2 text-danger text-center w-100"> Please type something for search!</p>`;

    } else {
        // Adds valid search text to initial API url
        const searchURL = apiURL + mealName; 
        clearSearchInput();
        
        fetch(searchURL)
        .then(res => res.json())
        .then(data => {
            if (data.meals == null) {
                // Prints if No Meal is found
                resultWraper.innerHTML = `<p class=" h2 text-danger text-center w-100"> Sorry, No Meal found! Please Search Again.</p>`;
            } else {
                // Executes if any Meal is found
                resultWraper.innerHTML = ""; // Cleans Previous Result

                const result = data.meals;
                let showMeals = "";
                let showModal = "";

                // Generating HTML to display each Meal Result 
                result.map(data => {
                    const mealData = `
                    <div class="col">
                        <div class="card" data-bs-toggle="modal" data-bs-target="#showMeal${data.idMeal}">
                            <img src="${data.strMealThumb}" class="card-img-top">
                            <div class="card-body text-center">
                                <h5 class="card-title fw-bold">${data.strMeal}</h5>
                            </div>
                        </div>
                    </div> `;

                    showMeals = showMeals + mealData;

                    // Generating HTML to display individual Meal Detail as Modal 
                    const modalData = `
                    <div class="modal fade" id="showMeal${data.idMeal}" tabindex="-1" aria-labelledby="showMealLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body pt-0">
                                    <button type="button" class="btn-close ms-auto d-block" data-bs-dismiss="modal" aria-label="Close"></button>
                                    <div class="card border-0">
                                        <img src="${data.strMealThumb}" class="card-img-top">
                                        <div class="card-body p-0">
                                            <h2 class="card-title my-4 fw-bold">${data.strMeal}</h2>
                                            <h5 class="card-title mb-2 fw-bold">Ingredients</h5>
                                            <ul class="list-group-item border-0">
                                                ${ingradients(data)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> `;

                    showModal = showModal + modalData;

                });
                // Adds Generated HTML to document
                resultWraper.innerHTML = showMeals;
                modalWraper.innerHTML = showModal;
            }
        });
    }

}


// Removes Empty ingradient Values from ingradient list
function ingradients(data) {
    let liValue = "";

    Object.keys(data).forEach(key => {
        const checkKey = key.search('strIngredient');

        // Checks the ingredient value is not Emptuy("") or null
        if (checkKey >= 0 && (data[key] != "" && data[key] != null)) {
            // Writes as list item
            liValue = liValue + ` <li>${data[key]}</li> `;
        }
    });
    return liValue;
}

const clearSearchInput = () =>{
    document.getElementById('meal-name').value = "";
}