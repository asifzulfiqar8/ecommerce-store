import Stripe from "stripe";
import getEnv from "../config/config.js";

export const stripe = new Stripe(getEnv("STRIPE_SECRET_KEY"));
