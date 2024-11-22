import express from 'express'
import { signup } from '../controllers/auth.controller.js';

const app = express();

app.get('/signup', signup)

export default app;