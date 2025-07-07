import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe("sk_test_51RiLp2CVlmo1BCrahjpjuz1lP2Xnt97cRPzDU2IQF9ODmr9ElFULxWm4l8Hx5i8yjITyxU1FgBQgtzQMZEQ8EV6q00w0EMjO8k"); // ✅ Keep secret

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
