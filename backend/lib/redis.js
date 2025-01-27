import Redis from "ioredis"
import getEnv from "../config/config.js";

export const redis = new Redis(getEnv("UOSTASH_REDIS_URI"));