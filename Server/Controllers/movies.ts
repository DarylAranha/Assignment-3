import { Request, Response, NextFunction } from "express";
import passport from "passport";

import User from '../Models/user';
import Movie from '../Models/movies';

function SanitizeArray (unsanitizedArry: string[]): string[] {
    
    let sanizitedArray: string[] = Array<string>()
    for (const unsanitizedString of unsanitizedArry) {
        sanizitedArray.push(unsanitizedString.trim())
    }

    return sanizitedArray;
}

// Authentication Fuction 
export function ProcessRegister(req:Request, res:Response, next:NextFunction): void
{
    // instantiate a new user object
    let newUser = new User({
        username: req.body.username,
        emailAddress: req.body.EmailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName
    });
    
    User.register(newUser, req.body.password, (err) =>{
        if(err){
            console.error('Error: Inserting New User');
            if(err.name == "UserExistsError")
            {
            console.error('Error: User Already Exists');
            }
            return res.json({success: false, msg: 'User not Registered Successfully!'});
        }

        // if we had a front-end (Angular, React or a Mobile UI)...
        // return res.json({success: true, msg: 'User Registered Successfully!'});
        
        // automatically login the user
        return passport.authenticate('local')(req, res, () => {
            return res.json({success: true, msg: 'User Logged in Successfully!', user: newUser});
        });
    });
}

export function ProcessLogin(req:Request, res:Response, next:NextFunction): void
{
    passport.authenticate('local', (err: any, user: any, info: any) => {
        // are there server errors?
        if(err) {
            console.error(err);
            return next(err);
        }

        // are the login errors?
        if(!user) {
            return res.json({success: false, msg: 'User Not Logged in Successfully!', user: user});
        }
        
        req.login(user, (err) => {
            // are there DB errors?
            if(err) {
                console.error(err);
                return next(err);
            }
            
            // if we had a front-end (like Angular or React or Mobile UI)...
            return res.json({success: true, msg: 'User Logged in Successfully!'});
        });
    })(req, res, next);
}

export function ProcessLogout(req:Request, res:Response, next:NextFunction): void
{
    req.logout(() => {
        console.log("User Logged Out");
    });
    
    // if we had a front-end (Angular, React or Mobile UI)...
    res.json({success: true, msg: 'User Logged out Successfully!'});
}

// Movies Function
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