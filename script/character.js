// Get the complete URL of the current page
let url_str = window.location.href;

// Create a new URL object from the URL string
let url = new URL(url_str);

// Extract the search parameters (query parameters) from the URL
let search_params = url.searchParams;

// Get the 'id' parameter from the search parameters
let id = search_params.get('id');

// Select the HTML elements for displaying the character image and details
const image = document.querySelector('.image');
const descDiv = document.querySelector('.characterstic');

// Fetch character details from the Marvel API using the 'id' parameter
fetch(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=70e56b7dd94e89b259cbb7e0625a92ee&hash=8b18d739e6f0be231a4967977ee49053`)
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        // Extract relevant character details from the API response
        const characterDetails = result.data.results[0];

        // Display the character image
        let path = characterDetails.thumbnail.path;
        let ext = characterDetails.thumbnail.extension;
        let img = `${path}/portrait_uncanny.${ext}`;
        let imgEle =  `<img src="${img}" alt="">`
        image.insertAdjacentHTML('beforeEnd', imgEle);

        // Display various character details in a structured format
        let div = `<div class="desc-value">
                        <div class="title">Name:</div>
                        <div class="value">${characterDetails.name}</div>
                    </div>
                    <div class="desc-value">
                        <div class="title">Comic:</div>
                        <div class="value">${characterDetails.available}</div>
                    </div>
                    <div class="desc-value">                
                        <div class="title">Series:</div>
                        <div class="value">${characterDetails.available}</div>
                    </div>
                    <div class="desc-value">
                        <div class="title">Stories:</div>
                        <div class="value">${characterDetails.available}</div>
                    </div>
                    <div class="desc-value">
                        <div class="title">Desc:</div>
                        <div class="value">${characterDetails.description}</div>
                    </div>`

        // Insert the HTML representing character details into the designated element
        descDiv.insertAdjacentHTML('beforeEnd', div);
    });
