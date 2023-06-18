import { Request, Response, NextFunction } from "express";

import Movie from '../Models/movies';

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