import express from 'express';
let router = express.Router();

// Get the movie controller
import { DisplayMovieList, DisplayMovieByID, AddMovie, UpateMovie, DeleteMovie } from '../Controllers/movies';

// Get list of all the movies
router.get('/list', function (req, res, next) {
    DisplayMovieList(req, res, next)
  }) 
  
router.get('/find/:id', function (req, res, next) {
    DisplayMovieByID(req, res, next);
})

router.post('/add', function(req, res, next) {
    AddMovie(req, res, next)
})

router.put('/update/:id', function(req, res, next) {
    UpateMovie(req, res, next)
})

router.delete('/delete/:id', function(req, res, next) {
    DeleteMovie(req, res, next)
})

export default router