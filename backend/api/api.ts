import express from 'express';
import login from '../auth/login'
import Delete from "../CRUD/Delete";
import update from "../CRUD/update";
const app = express.Router();
app.use('/login' , login)
app.use('/delete' , Delete)
app.use('/update' , update)
export default app;