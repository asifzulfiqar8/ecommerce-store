import express from 'express'
import { login, logout, signup } from '../controllers/auth.controller.js';

const app = express();

app.post('/signup', signup);
app.post('/login', login);
app.post('/logout', logout);

export default app;