import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Payments = () => {
  const totalAmount = localStorage.getItem('paymentTotalAmount') || '0.00';
  const orderId = localStorage.getItem('paymentOrderId');

  const handleStripePayment = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/create-checkout-session', {
        amount: totalAmount,
        orderId,
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error("❌ Couldn't initiate payment session.");
      }
    } catch (err) {
        console.error("Payment error:", err);
      toast.error("❌ Payment session failed");
    }
  };

  return (
    <div style={{
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <h2 style={{ marginBottom: '1rem' }}>💳 Pay with Stripe</h2>
      <button
        onClick={handleStripePayment}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#635BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
        }}
      >
        Pay ₹{totalAmount}
      </button>
    </div>
  );
};

export default Payments;
