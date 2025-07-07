// BuyNowModal.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Payments from './Payments';

const BuyNowModal = ({ isOpen, onClose, addresses, cartId, total, userId }) => {
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  const placeOrder = async () => {
    if (!userId || !cartId || !selectedAddressId || !paymentMethod) {
      toast.error("Missing required information.");
      return;
      
    }

    const orderPayload = {
      userId,
      cart: cartId,
      address: selectedAddressId,
      shippingAddress: selectedAddressId,
      paymentMethod,
      shippingCost: 50,
      discount: 100,
      tax: 30,
      totalAmount: total
    };

    try {
      const response = await axios.post("http://localhost:3000/orders", orderPayload);
      toast.success("🎉 Order placed successfully!");
      console.log("Order response:", response.data);
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to place order. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        background: 'white', borderRadius: '1rem', padding: '2rem',
        maxWidth: '650px', width: '90%', maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)', fontFamily: 'sans-serif'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>🛒 Confirm Your Order</h3>

        {/* Address Section */}
        <div>
          <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>📍 Choose Shipping Address</h4>
          {addresses.map(addr => (
            <label key={addr._id} style={{
              display: 'block', marginBottom: '1rem', padding: '1rem',
              border: selectedAddressId === addr._id ? '2px solid #2563eb' : '1px solid #e5e7eb',
              borderRadius: '0.75rem', cursor: 'pointer', backgroundColor: selectedAddressId === addr._id ? '#f3f4f6' : 'white'
            }}>
              <input
                type="radio"
                name="selectedAddress"
                value={addr._id}
                checked={selectedAddressId === addr._id}
                onChange={() => setSelectedAddressId(addr._id)}
                style={{ marginRight: '0.5rem' }}
              />
              {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
            </label>
          ))}
        </div>

        {/* Payment Section */}
        <div style={{ marginTop: '2rem' }}>
          <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>💳 Select Payment Method</h4>
          {['Cash on Delivery', 'GPay'].map(method => (
            <label key={method} style={{
              display: 'block', marginBottom: '1rem', padding: '0.75rem 1rem',
              border: paymentMethod === method ? '2px solid #10b981' : '1px solid #e5e7eb',
              borderRadius: '0.75rem', cursor: 'pointer', backgroundColor: paymentMethod === method ? '#ecfdf5' : 'white'
            }}>
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                style={{ marginRight: '0.5rem' }}
              />
              {method}
            </label>
          ))}
        </div>

        {/* Footer Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem 1rem', borderRadius: '9999px',
              backgroundColor: '#ef4444', color: 'white', fontWeight: '600', border: 'none'
            }}
          >
            Cancel
          </button>
          <button
            onClick={placeOrder}
            style={{
              padding: '0.5rem 1.5rem', borderRadius: '9999px',
              backgroundColor: '#10b981', color: 'white', fontWeight: '600', border: 'none'
            }}
          >
            ✅ Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyNowModal;
