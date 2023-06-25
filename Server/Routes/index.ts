import express from 'express';
let router = express.Router();

import { DisplayMovieList, DisplayMovieByID, AddMovie, UpateMovie, DeleteMovie, ProcessRegister, ProcessLogin, ProcessLogout } from '../Controllers/movies';

/**
 * File: Routes/index.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 25, 2023
 * 
 * Returns list of movies if route matches /list
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
router.get('/list', function (req, res, next) {
    DisplayMovieList(req, res, next)
}) 

/**
 * File: Routes/index.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 25, 2023
 * 
 * Returns a specific movies if route matches /find/:id (:id is movie ID)
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
router.get('/find/:id', function (req, res, next) {
    DisplayMovieByID(req, res, next);
})

/**
 * File: Routes/index.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 25, 2023
 * 
 * Adds a movies if route matches /add
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
router.post('/add', function(req, res, next) {
    AddMovie(req, res, next)
})

/**
 * File: Routes/index.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 25, 2023
 * 
 * Updates a movies if route matches /update
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
router.put('/update/:id', function(req, res, next) {
    UpateMovie(req, res, next)
})

/**
 * File: Routes/index.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 25, 2023
 * 
 * Deletes a movies if route matches /delete/:id (:id is movie ID)
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
router.delete('/delete/:id', function(req, res, next) {
    DeleteMovie(req, res, next)
})

/**
 * File: Routes/index.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 25, 2023
 * 
 * Registeration route
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
router.post('/register', function (req, res, next) {
    ProcessRegister(req, res, next);
})

/**
 * File: Routes/index.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 25, 2023
 * 
 * Login route
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
router.post('/login', function (req, res, next) {
    ProcessLogin(req, res, next);
})

/**
 * File: Routes/index.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 25, 2023
 * 
 * Logout route
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
router.get('/logout', function(req, res, next) {
    ProcessLogout(req, res, next)
})

export default router