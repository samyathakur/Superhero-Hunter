// Select the HTML element for displaying the favorite character list
let displayList = document.querySelector('.display-list');

// Initialize variables for dynamically creating HTML elements
let divEle;

// Retrieve the favorite character list from localStorage or create an empty array
let favList = JSON.parse(localStorage.getItem('favList')) || [];

// Check if the favorite list is empty, display a message; otherwise, fetch and display each favorite character
if (favList.length === 0) {
    // Display a message if the favorite list is empty
    divEle = `<div class="message">
                <h3>No character added to favorite list yet</h3>
              </div>`;
    displayList.insertAdjacentHTML('beforeEnd', divEle);
} else {
    // Iterate through each element in the favorite list and fetch corresponding character details
    favList.forEach(function (element) {
        fetch(`https://gateway.marvel.com/v1/public/characters/${element}?ts=1&apikey=70e56b7dd94e89b259cbb7e0625a92ee&hash=8b18d739e6f0be231a4967977ee49053`)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            // Extract relevant character details from the API response
            const ele = result.data.results[0];

            // Construct HTML for each favorite character card
            let path = ele.thumbnail.path;
            let ext = ele.thumbnail.extension;
            let img = `${path}/portrait_xlarge.${ext}`;
            let heroName = ele.name;

            let divEle = `<div class="card">
                <div class="img">
                <a href="character.html?id=${ele.id}">  <img src="${img}" alt=""></a>
                </div>
                <div class="fav" data-index=${ele.id}>
                    <div class="name">${heroName} </div>
                    <!-- Check and set the favorite icon based on whether the character is in the favorite list -->
                    <i class="fa-heart 
                    ${
                        favList ? 
                        favList.includes(ele.id) ? 'fa-solid' : 'fa-regular' 
                        : 'fa-regular'                 
                    }
                    " ></i>
                </div>
            </div>`;

            // Insert the HTML representing the favorite character card into the displayList
            displayList.insertAdjacentHTML('beforeEnd', divEle);
        });

        // Add click event listener to handle favorite icon clicks
        displayList.addEventListener('click', clickFav);
    });
}

// Function to handle the click event on the favorite icon
function clickFav(event) {
    if (event.target.classList.contains('fa-heart')) {
        // Get the character ID from the data-index attribute
        const id = event.target.parentElement.dataset.index;

        // Update the favorite list and localStorage, and refresh the display list
        createFavAndLocal(id, event);
        updateDisplayList();
    }
}

// Function to update the favorite list and localStorage based on user interaction
function createFavAndLocal(id, event) {
    let intId = parseInt(id, 10);
    let index = favList.indexOf(intId);

    // If the character is not in the favorite list, add it; otherwise, remove it
    if (index === -1) {
        let val = parseInt(id, 10);
        favList.push(val);
        event.target.classList.replace('fa-regular', 'fa-solid');
    } else {
        favList.splice(index, 1);
        console.log("Removed from favorites");
        event.target.classList.replace('fa-solid', 'fa-regular');
    }

    // Update the favorite list in localStorage
    localStorage.setItem('favList', JSON.stringify(favList));
}

// Function to update the displayList based on the current favorite list
function updateDisplayList() {
    // Get all card elements
    const cardElements = document.querySelectorAll('.card');

    // Iterate over each card and check if its ID is in the updated favList
    cardElements.forEach(card => {
        const id = card.querySelector('.fav').dataset.index;
        const intId = parseInt(id, 10);

        // Check if the ID is still in the favList
        if (!favList.includes(intId)) {
            // Remove the card element from the displayList
            card.remove();
        }
    });

    // If favList is empty, display a message
    if (favList.length === 0) {
        const message = `<div class="message">
                            <h3>No character added to favorite list yet</h3>
                         </div>`;
        displayList.innerHTML = message;
    }
}
