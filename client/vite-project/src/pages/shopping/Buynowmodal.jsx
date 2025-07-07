// BuyNowModal.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const BuyNowModal = ({ isOpen, onClose, addresses, cartId, total, userId }) => {
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const placeOrder = async () => {
    if (!userId || !cartId || !selectedAddressId) {
      toast.error("Missing user, cart, or address info.");
      return;
    }

    const orderPayload = {
      userId,
      cart: cartId,
      address: selectedAddressId,
      shippingAddress: selectedAddressId,
      paymentMethod: "Cash on Delivery",
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
        maxWidth: '600px', width: '90%', maxHeight: '80vh', overflowY: 'auto',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Choose Shipping Address</h3>

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
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyNowModal;