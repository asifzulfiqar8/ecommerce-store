import getEnv from "../config/config.js";
import { stripe } from "../lib/stripe.js";
import Coupon from "../models/coupon.model.js";

const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount;

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100); // stripe wants you to send in the format of cents
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });

      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }

    const session = stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${getEnv(
        "CLIENT_URL"
      )}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getEnv("CLIENT_URL")}/purchase-cancel`,
      discounts: coupon
        ? [{ coupon: await createStripeCoupon(coupon.discountPercentage) }]
        : [],
      metadata: {
        userId: req.user._id.toSring(),
        couponCode: couponCode || "",
      },
    });
  } catch (error) {}
};

const createStripeCoupon = async (discountPercentage) => {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });

  return coupon.id;
};

export { createCheckoutSession };
