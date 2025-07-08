import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/shopping/account');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #d1fae5, #ecfccb)',
      padding: '2rem',
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '1rem',
        padding: '2rem 3rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
      }}>
        <CheckCircle size={64} color="#10b981" />
        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: '700',
          marginTop: '1rem',
          color: '#065f46',
        }}>Payment Successful</h1>
        <p style={{ margin: '0.5rem 0', color: '#374151' }}>
          Thank you for shopping with Zippy!
        </p>

        <div style={{
          margin: '2rem 0',
          padding: '1.5rem',
          backgroundColor: '#f0fdf4',
          borderRadius: '0.75rem',
          border: '1px solid #bbf7d0',
          textAlign: 'left',
          fontSize: '0.95rem',
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#065f46' }}>🧾 Order Receipt</h3>
          <p><strong>Order ID:</strong> #{localStorage.getItem('paymentOrderId') || 'NA'}</p>
          <p><strong>Amount Paid:</strong> ₹{localStorage.getItem('paymentTotalAmount') || '0.00'}</p>
          <p><strong>Status:</strong> ✅ Confirmed</p>
        </div>

        <button
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '1rem',
            transition: '0.3s',
          }}
          onClick={handleBackToHome}
        >
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
