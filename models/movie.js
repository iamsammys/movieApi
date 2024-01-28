#!/usr/bin/env node
/***
 * module to implement the movie schema
 * created by:
 *        Samuel Ezeh
 */

const { v4: uuidv4 } = require('uuid');
const math = require('mathjs');


class movieClass {
    // movie class
    constructor(dict=null, title=null, director=null, genre=null, releaseDate, rating=0, availableCopies=0, rented=false, maxAvailableCopies=10) {
        if (dict && typeof dict === 'object') {
            this._id = dict.id;
            this._title = dict.title;
            this._director = dict.director;
            this._genre = dict.genre;
            this._releaseDate = dict.releaseDate;
            this._rating = dict.rating;
            this._availableCopies = dict.availableCopies;
            this._rented = dict.rented;
            this._maxAvailableCopies = dict.maxAvailableCopies;
        } else {
        this._id = uuidv4();
        this._title = title;
        this._director = director;
        this._genre = genre;
        this._releaseDate = new Date();
        this._rating = rating;
        this._availableCopies = availableCopies;
        this._rented = rented;
        this._maxAvailableCopies = maxAvailableCopies;
        }
    }

    set setId(id) {
        // set id
        this._id = id;
    }

    get getId() {
        // get id
        return this._id;
    }

    set setTitle(title) {
        // set title
        this._title = title;
    }

    get getTitle() {
        // get title
        return this._title;
    }

    set setDirector(director) {
        // set director
        this._director = director;
    }

    get getDirector() {
        // get director
        return this._director;
    }

    set setGenre(genre) {
        this._genre = genre;
    }

    get getGenre() {
        // get genre
        return this._genre;
    }

    set setReleaseDate(releaseDate) {
        // set release date
        this._releaseDate = releaseDate;
    }

    get getReleaseDate() {
        // get release date
        return this._releaseDate;
    }

    set setRating(rating) {
        // set rating
        this._rating = rating;
    }

    get getRating() {
        // get rating
        return this._rating;
    }

    set setAvailableCopies(availableCopies) {
        // set available copies
        this._availableCopies = math.min(availableCopies, this._maxAvailableCopies);
    }

    get getAvailableCopies() {
        // get available copies
        return this._availableCopies;
    }

    set setMaxAvailableCopies(maxAvailableCopies) {
        // set max available copies
        this._maxAvailableCopies = maxAvailableCopies;
    }

    get getMaxAvailableCopies() {
        // get max available copies
        return this._maxAvailableCopies;
    }

    toDict() {
        // return movie as an object
        return {
            id: this._id,
            title: this._title,
            director: this._director,
            genre: this._genre,
            releaseDate: this._releaseDate,
            rating: this._rating,
            availableCopies: this._availableCopies,
            maxAvailableCopies: this._maxAvailableCopies,
            rented: this._rented
        }
    }

    rentMovie() {
        // rent movie
        if (this._availableCopies > 0) {
            this._availableCopies -= 1;
            this._rented = true;
            this.save()
            return true;
        }
        return false;
    }

    returnMovie() {
        // return movie
        if (this._rented) {
            if (this._availableCopies < this._maxAvailableCopies) {
                this._availableCopies += 1;
                if (this._availableCopies === this._maxAvailableCopies) {
                    this._rented = false;
                }
                this.save()
                return true
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    update() {
        // update movie
        const storage = require('../storage/movieStorage');
        this.setReleaseDate = new Date();
        this.save();
    }

    save() {
        // save movie
        const storage = require('../storage/movieStorage');
        storage.addMovie(this);
        storage.saveMovie();
    }

    delete() {
        // delete movie
        const storage = require('../storage/movieStorage');
        storage.deleteMovie(this);
    }
}
module.exports = movieClass;