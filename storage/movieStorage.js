#!/usr/bin/env node
/**
 * module to implement the movie storage
 * created by:
 *       Samuel Ezeh
 */

const fs = require('fs');
movies = {};
fileName = "./movies.json";


class movieStorage {
    static addMovie(movie) {
        // add movie to storage
        const newKey = `${movie.getId}.${movie.getTitle}`;
        movies[newKey] = movie;
        for (const key in movies) {
            const similarMovie = movies[key];
            if (similarMovie.getId === movie.getId) {
                if (newKey !== key) {
                    this.deleteMovie(null, key);
                }
            }
        }
    }

    static getAllMovies(movieTitle=null) {
        // return all movies in storage
        if (movieTitle) {
            for (const key in movies) {
                const movie = movies[key];
                if (movie.getTitle == movieTitle)
                    return movie;
            }
        }
        return movies;
    }

    static rentMovie(movieTitle) {
        // rent movie from storage
        for (const key in this.getAllMovies()) {
            const movie = movies[key];
            if (movie.getTitle == movieTitle)
                if (movie.rentMovie()) {
                    console.log('\n!!!!!!!!!!!!!!!!!!!!\nMovie rented successfully!\n');
                    return null;
                } else {
                    console.log('\n!!!!!!!!!!!!!!!!!!!!!Movie not available!\n');
                    return null
                }
        }
        return '\nMovie not found\n'
    }
    
    static returnMovie(movieTitle) {
        // return movie to storage
        for (const key in movies) {
            const movie = movies[key];
            if (movie.getTitle == movieTitle) {
                if (movie.returnMovie()) {
                    console.log('\n!!!!!!!!!!!!!!!!!!!!\nMovie returned successfully!\n');
                    return null;
                } else {
                    return '\n!!!!!!!!!!!!!!!!!!!!\nAll movies have been returned or movie has not been rented out yet\n';
                }
            } else {
                return '\n!!!!!!!!!!!!!!!!!!!!\nMovie not found\n'
            }
        }
    }

    static saveMovie() {
        // save movies to storage
        const newDict = {};
        for (const key in movies) {
            const obj = movies[key];
            newDict[key] = obj.toDict();
        }
        const json = JSON.stringify(newDict);
        fs.writeFileSync(fileName, json, 'utf8', (err) => {
            if (err) {
                console.log(err);
            }
        });
    }

    static reload() {
        // reload movies from storage
        try {
            const movieClass = require('../models/movie');
            const data = fs.readFileSync(fileName, 'utf8');
            const obj = JSON.parse(data);

            for (const key in obj) {
                const movieDict = obj[key];
                const newMovie = new movieClass(movieDict);
                movies[key] = newMovie;
            }
        }
        catch (err) {}
    }

    static deleteMovie(movie,key=null) {
        // delete movie from storage
        if (key) {
            delete movies[key];
        } else {
            const key = `${movie.getId}.${movie.getTitle}`;
            delete movies[key];
        this.saveMovie();
        }
    }
}
movieStorage.reload();
module.exports = movieStorage;