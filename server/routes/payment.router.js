import express from 'express';
import Stripe from 'stripe';
import { configDotenv } from 'dotenv';
configDotenv();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const clientBaseUrl = process.env.CLIENT_BASE_URL;

router.post('/create-checkout-session', async (req, res) => {
  const { amount, orderId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Order #${orderId}`,
          },
          unit_amount: amount * 100, // Convert ₹ to paisa
        },
        quantity: 1,
      }],
      success_url: `${clientBaseUrl}/payments/success`,
      cancel_url: `${clientBaseUrl}/payments/canceled`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Payment session failed' });
  }
});

export default router;
