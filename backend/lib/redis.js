import Redis from "ioredis"
import getEnv from "../config/config";

export const client = new Redis(getEnv(UOSTASH_REDIS_URI));