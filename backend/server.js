import express from 'express';
import authRoutes from './routes/auth.route.js'
import getEnv from './config/config.js'
import { connectDB } from './lib/db.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use('/api/auth', authRoutes);
app.use(cookieParser())

const PORT = getEnv('PORT') || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at port: http://localhost:${PORT}`);
    connectDB(getEnv('MONGO_URI'))
})