import dotenv from 'dotenv'

dotenv.config();

const _config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI
}




export  {_config}