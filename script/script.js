// Selecting elements from the DOM
let displayList = document.querySelector('.display-list');
let searchInput = document.querySelector('#searchInput');
let suggestionsList = document.querySelector('#suggestionsList');
let heroList = [];
let favList = [];

document.addEventListener('DOMContentLoaded', function () {
    // Load favList from local storage or initialize an empty array
    favList = JSON.parse(localStorage.getItem('favList')) || [];

    // Fetching data from the Marvel API
    fetch('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=70e56b7dd94e89b259cbb7e0625a92ee&hash=8b18d739e6f0be231a4967977ee49053')
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            heroList = result.data.results;

            // Generating HTML for each hero and appending it to displayList
            heroList.forEach((ele) => {
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
                        <i class="fa-heart 
                        ${
                            favList ? 
                            favList.includes(ele.id) ? 'fa-solid' : 'fa-regular' 
                            : 'fa-regular'                 
                        }
                        " ></i>
                    </div>
                </div>`;
                displayList.insertAdjacentHTML('beforeEnd', divEle);
            });
        });

    // Adding event listeners
    displayList.addEventListener('click', clickFav);

    searchInput.addEventListener('input', (event) => {
        // Filtering hero suggestions based on user input
        let userInput = searchInput.value.toLowerCase();
        let filterSuggestion = heroList.filter((char) => char.name.toLowerCase().startsWith(userInput));
        displaySuggestionList(filterSuggestion);
    });

    // Function to display suggestion list
    function displaySuggestionList(suggestion) {
        suggestionsList.innerHTML = '';
        if (suggestion.length > 0) {
            suggestion.forEach((char) => {
                let searchDiv = `
                    <li class="char-list" data-index=${char.id}>
                        <a href="character.html?id=${char.id}"> ${char.name} </a>
                        <i class="fa-heart 
                            ${favList ? 
                                favList.includes(char.id) ? 'fa-solid' : 'fa-regular' 
                                : 'fa-regular'}
                        "></i>
                    </li>`;
                suggestionsList.insertAdjacentHTML('beforeEnd', searchDiv);

                // Adding click event listener to each suggestion item
                suggestionsList.addEventListener('click', clickFav);
            });
        } else {
            suggestionsList.innerHTML = '<li>No suggestions found</li>';
        }
    }

    // Adding click event listener to the document to hide suggestionsList when clicked outside
    document.addEventListener('click', function (event) {
        if (!suggestionsList.contains(event.target)) {
            // Clicked outside suggestionsList, hide it or remove its content
            suggestionsList.innerHTML = '';
        }
    });

    // Function to handle favorite clicks
    function clickFav(event) {
        if (event.target.classList.contains('fa-heart')) {
            const id = event.target.parentElement.dataset.index;
            createFavAndLocal(id, event);

            // Update the display-list based on localStorage
            updateDisplayList();
        }
    }

    // Function to add/remove favorites and update localStorage
    function createFavAndLocal(id, event) {
        let intId = parseInt(id, 10);
        let index = favList.indexOf(intId);

        if (index === -1) {
            let val = parseInt(id, 10);
            favList.push(val);
            event.target.classList.replace('fa-regular', 'fa-solid');
        } else {
            // If already present, remove it
            favList.splice(index, 1);
            console.log("Removed from favorites");
            event.target.classList.replace('fa-solid', 'fa-regular');
        }

        localStorage.setItem('favList', JSON.stringify(favList));
    }

    // Function to update the display list based on favorites
    function updateDisplayList() {
        const allFavIcons = document.querySelectorAll('.fa-heart');

        allFavIcons.forEach((favIcon) => {
            const id = favIcon.parentElement.dataset.index;
            const intId = parseInt(id, 10);

            // Update the class based on whether it's in favList or not
            favIcon.classList.toggle('fa-solid', favList.includes(intId));
            favIcon.classList.toggle('fa-regular', !favList.includes(intId));
        });
    }
});
