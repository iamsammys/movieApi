#!/usr/bin/env node
/**
 * module to implement the movieApi console
 * created by:
 *       Samuel Ezeh
 */

const readline = require('readline');
const movieClass = require('./models/movie');
const movieStorage = require('./storage/movieStorage');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function displayMenu() {
    console.log("\n===== Movie Rental System =====");
    console.log("1. Rent a Movie");
    console.log("2. Return a Movie");
    console.log("3. List All Movies");
    console.log("4. Exit");
}

function rentMovie() {
    rl.question("Enter the title of the movie you want to rent: ", (title) => {
        result = movieStorage.rentMovie(title);
        if (result) {
            console.log(result);
        }
        displayMenu();
        processSelection();
    });
}

function returnMovie() {
    rl.question("Enter the title of the movie you want to return: ", (title) => {
        const result = movieStorage.returnMovie(title);
        if (result)
            console.log(result);
        displayMenu();
        processSelection();
    });
}

function listAllMovies() {
    const allMovies = movieStorage.getAllMovies();
    console.log("\n===== All Movies =====");
    for (const key in allMovies) {
        movie = allMovies[key];
        console.log(movie.toDict());
    }
    displayMenu();
    processSelection();
}

function processSelection() {
    rl.question("Enter your choice (1-4): ", (choice) => {
        switch (choice) {
            case '1':
                rentMovie();
                break;
            case '2':
                returnMovie();
                break;
            case '3':
                listAllMovies();
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log("!!!!!!!!!!!!!!!!!!!!\nInvalid choice. Please enter a number between 1 and 4.");
                displayMenu();
                processSelection();
        }
    });
}

// Initial display
displayMenu();
processSelection();