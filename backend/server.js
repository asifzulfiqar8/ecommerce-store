import express from 'express';
import authRoutes from './routes/auth.route.js'
import { _config,  } from './config/config.js';

const app = express();

app.use('/api/auth', authRoutes)


const PORT = _config.PORT

app.listen(PORT, () => {
    console.log(`Server is running at port: http://localhost:${PORT}`)
})