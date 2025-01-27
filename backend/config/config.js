import dotenv from 'dotenv'

dotenv.config();

const config = Object.freeze({
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    UOSTASH_REDIS_URI: process.env.UOSTASH_REDIS_URI,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
})

const getEnv = (key) => {
    const value = config[key];
    if(!value) console.log(`Environment variable ${key} isn't defined or doesn't matched the config`);
    return value;
}

export default getEnv;