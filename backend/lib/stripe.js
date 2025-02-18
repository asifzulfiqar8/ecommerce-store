import Stripe from "stripe";
import getEnv from "../config/config.js";

const stripe = new Stripe(getEnv("STRIPE_SECRET_KEY"));

export { stripe };
