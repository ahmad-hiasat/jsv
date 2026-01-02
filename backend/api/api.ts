import express from 'express';
import login from '../auth/login'
import Delete from "../CRUD/Delete";
import update from "../CRUD/update";
import register from "../auth/register";
const app = express.Router();
app.use('/login' , login)
app.use('/delete' , Delete)
app.use('/update' , update)
app.use('/register' , register)
export default app;