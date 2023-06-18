import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';


// Database modules
import mongoose from 'mongoose';
import db from './db';

mongoose.connect(db.localURI);

// DB Connection Events
// Event 1: When connection is established
mongoose.connection.on('connected', function() {
    console.log(`Connected to MongoDB`)
    console.log(mongoose.connection.readyState)
});

// When connection has some error
mongoose.connection.on('error', function(err) {
    console.log(`Error in connecting ${err}`)
})

// When connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log(`Disconnected from MongoDB`)
});


import indexRouter from '../Routes/index';

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);

export default app;
