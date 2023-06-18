import { Request, Response, NextFunction } from "express";

import Movie from '../Models/movies';

function SanitizeArray (unsanitizedArry: string[]): string[] {
    
    let sanizitedArray: string[] = Array<string>()
    for (const unsanitizedString of unsanitizedArry) {
        sanizitedArray.push(unsanitizedString.trim())
    }

    return sanizitedArray;
}

export function DisplayMovieList(req: Request, res: Response, next: NextFunction) {
    // Find the list of all the movies
    Movie.find({})
        .then(function (data) {
            res.json(data)
        })
        .catch(function (err) {
            console.log(err)
        })
}

export function DisplayMovieByID(req: Request, res: Response, next: NextFunction) {
    
    let id = req.params.id;
    Movie.findById({_id: id})
        .then(function( data) {
            res.status(200).json(data)
        })
        .catch(function (err) {
            console.error(err);
        })
}

export function AddMovie(req: Request, res: Response, next: NextFunction) {

    let genres = SanitizeArray((req.body.genres as string).split(","));
    let directors = SanitizeArray((req.body.directors as string).split(","));
    let writers = SanitizeArray((req.body.writers as string).split(","));
    let actors = SanitizeArray((req.body.actors as string).split(","));

    let movie = new Movie({
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
    })


    Movie.create(movie)
        .then(function( data) {
            res.json(movie);
        })
        .catch(function (err) {
            console.error(err);
        })
}

export function UpateMovie(req: Request, res: Response, next: NextFunction) {

    let id = req.params.id;
    let genres = SanitizeArray((req.body.genres as string).split(","));
    let directors = SanitizeArray((req.body.directors as string).split(","));
    let writers = SanitizeArray((req.body.writers as string).split(","));
    let actors = SanitizeArray((req.body.actors as string).split(","));

    let movieToUpdate = new Movie({
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
    })


    Movie.updateOne({_id: id}, movieToUpdate)
        .then(function( data) {
            res.json(movieToUpdate);
        })
        .catch(function (err) {
            console.error(err);
        })
}

export function DeleteMovie(req: Request, res: Response, next: NextFunction) {

    let id = req.params.id;
    Movie.deleteOne({_id: id})
        .then(function( data) {
            res.json(id);
        })
        .catch(function (err) {
            console.error(err);
        })
}