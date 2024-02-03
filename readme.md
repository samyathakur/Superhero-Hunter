Project Overview
This project consists of a simple web application that allows users to explore and interact with Marvel characters. 
The application includes three main pages: 

index.html
character.html
favorite.html. 

Files Overview

index.html

Home page with a navigation bar, background image, search functionality, and a display list of Marvel characters.
Utilizes the Font Awesome icon library for heart icons.

character.html

Page for displaying detailed information about a specific Marvel character.
Includes a navigation bar, character image, and various characteristics.

favorite.html

Page that displays the user's favorite Marvel characters.
Contains a navigation bar and a display list of favorite characters.

styles/ folder containing stylesheets for different pages: main.css, style.css, character.css, and favorite.css.


img/ folder containing image files used in the project, such as logos and background images.

script/ folder containing JavaScript files: script.js, character.js, and favorite.js.

script.js
Fetches Marvel character data from the Marvel API and dynamically generates HTML for each character card.
Handles user interactions, such as clicking on favorite icons and updating local storage.

character.js
Retrieves the character ID from the URL and fetches detailed character information from the Marvel API.
Dynamically creates HTML elements to display character details.

favorite.js
Retrieves favorite characters from local storage or displays a message if the favorite list is empty.
Fetches details for each favorite character and dynamically generates HTML for the favorite list.
Handles user interactions, such as clicking on favorite icons and updating local storage.

How to Use
Open index.html in a web browser to explore Marvel characters and add them to your favorites.
Click on a character card to view detailed information on character.html.
Navigate to favorite.html to see your list of favorite Marvel characters.
