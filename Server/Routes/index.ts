import express from 'express';
let router = express.Router();

// Get the movie controller
import { DisplayMovieList } from '../Controllers/movies';

// Get list of all the movies
router.get('/movies', function (req, res, next) {
    DisplayMovieList(req, res, next)
}) 

export default router