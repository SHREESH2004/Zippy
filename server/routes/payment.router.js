import express from 'express';
import Stripe from 'stripe';
import { configDotenv } from 'dotenv';
configDotenv();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


router.post('/create-checkout-session', async (req, res) => {
  const { amount, orderId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: `Order #${orderId}`,
          },
          unit_amount: amount * 100, // Convert ₹ to paisa
        },
        quantity: 1,
      }],
      success_url: `https://mgx-19trn8lgbrr.mgx.world/`,
      cancel_url: `http://localhost:5173/payments/failure`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Payment session failed' });
  }
});

export default router;
