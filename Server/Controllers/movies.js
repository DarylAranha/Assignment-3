"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMovie = exports.UpateMovie = exports.AddMovie = exports.DisplayMovieByID = exports.DisplayMovieList = void 0;
const movies_1 = __importDefault(require("../Models/movies"));
function SanitizeArray(unsanitizedArry) {
    let sanizitedArray = Array();
    for (const unsanitizedString of unsanitizedArry) {
        sanizitedArray.push(unsanitizedString.trim());
    }
    return sanizitedArray;
}
function DisplayMovieList(req, res, next) {
    movies_1.default.find({})
        .then(function (data) {
        res.json(data);
    })
        .catch(function (err) {
        console.log(err);
    });
}
exports.DisplayMovieList = DisplayMovieList;
function DisplayMovieByID(req, res, next) {
    let id = req.params.id;
    movies_1.default.findById({ _id: id })
        .then(function (data) {
        res.status(200).json(data);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.DisplayMovieByID = DisplayMovieByID;
function AddMovie(req, res, next) {
    let genres = SanitizeArray(req.body.genres.split(","));
    let directors = SanitizeArray(req.body.directors.split(","));
    let writers = SanitizeArray(req.body.writers.split(","));
    let actors = SanitizeArray(req.body.actors.split(","));
    let movie = new movies_1.default({
        movieID: req.body.movieID,
        title: req.body.title,
        studio: req.body.studio,
        directors: directors,
        writers: writers,
        genres: genres,
        actors: actors,
        length: req.body.length,
        year: req.body.year,
        shortDescription: req.body.shortDescription,
        mpaRating: req.body.mpaRating,
        criticsRating: req.body.criticsRating,
        posterLink: req.body.posterLink
    });
    movies_1.default.create(movie)
        .then(function (data) {
        res.json(movie);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.AddMovie = AddMovie;
function UpateMovie(req, res, next) {
    let id = req.params.id;
    let genres = SanitizeArray(req.body.genres.split(","));
    let directors = SanitizeArray(req.body.directors.split(","));
    let writers = SanitizeArray(req.body.writers.split(","));
    let actors = SanitizeArray(req.body.actors.split(","));
    let movieToUpdate = new movies_1.default({
        _id: id,
        movieID: req.body.movieID,
        title: req.body.title,
        studio: req.body.studio,
        directors: directors,
        writers: writers,
        genres: genres,
        actors: actors,
        length: req.body.length,
        year: req.body.year,
        shortDescription: req.body.shortDescription,
        mpaRating: req.body.mpaRating,
        criticsRating: req.body.criticsRating,
        posterLink: req.body.posterLink
    });
    movies_1.default.updateOne({ _id: id }, movieToUpdate)
        .then(function (data) {
        res.json(movieToUpdate);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.UpateMovie = UpateMovie;
function DeleteMovie(req, res, next) {
    let id = req.params.id;
    movies_1.default.deleteOne({ _id: id })
        .then(function (data) {
        res.json(id);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.DeleteMovie = DeleteMovie;
//# sourceMappingURL=movies.js.map