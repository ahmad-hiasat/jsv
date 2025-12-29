import express from 'express';
import successfully from "./class/successfully";
import api from './api/api'
import dotenv from 'dotenv';
import mongoose from "mongoose";
import session from "express-session";
import errorHandler from "./errorHandel";
dotenv.config();
const  app = express();
app.use(
    session({
        secret: process.env.secret_key_session||"secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
        },
    })
);
mongoose.connect(process.env.MONGO_URL!).then(()=>{
    console.log("Connected to MongoDB");
})

app.use(express.json());
app.get('/', function (req:any, res:any) {
    res.status(successfully.homePage().status).json(successfully.homePage().json);
})
app.use('/api' , api)

app.use(errorHandler);

app.listen(3001 , ()=>{
    console.log("listening on port 3000");
})