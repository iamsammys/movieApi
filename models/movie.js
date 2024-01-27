#!/usr/bin/env node
/***
 * module to implement the movie schema
 * created by:
 *        Samuel Ezeh
 */

const { v4: uuidv4 } = require('uuid');
const storage = require('../storage');


class movie {
    constructor(title, director, genre, releaseDate, rating, availableCopies) {
        this._id = uuidv4();
        this._title = title;
        this._director = director;
        this._genre = genre;
        this._releaseDate = releaseDate;
        this._rating = rating;
        this._availableCopies = availableCopies;
    }

    set setId(id) {
        this._id = id;
    }

    get getId() {
        return this._id;
    }

    set setTitle(title) {
        this._title = title;
    }

    get getTitle() {
        return this._title;
    }

    set setDirector(director) {
        this._director = director;
    }

    get getDirector() {
        return this._director;
    }

    set setGenre(genre) {
        this._genre = genre;
    }

    get getGenre() {
        return this._genre;
    }

    set setReleaseDate(releaseDate) {
        this._releaseDate = releaseDate;
    }

    get getReleaseDate() {
        return this._releaseDate;
    }

    set setRating(rating) {
        this._rating = rating;
    }

    get getRating() {
        return this._rating;
    }

    set setAvailableCopies(availableCopies) {
        this._availableCopies = availableCopies;
    }

    get getAvailableCopies() {
        return this._availableCopies;
    }

    toDict() {
        return {
            id: this._id,
            title: this._title,
            director: this._director,
            genre: this._genre,
            releaseDate: this._releaseDate,
            rating: this._rating,
            availableCopies: this._availableCopies
        }
    }
}