import express from 'express'
import { login, logout, signup } from '../controllers/auth.controller.js';

const app = express();

app.get('/signup', signup);
app.get('/login', login);
app.get('/logout', logout);

export default app;