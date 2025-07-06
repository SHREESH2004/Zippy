import React from 'react';
import { Package } from 'lucide-react';

const OrderHistory = ({ orders = [] }) => {
  const dummyOrders = [
    { id: 'ORD1001', date: '2025-06-28', status: 'Delivered', amount: 1899, items: 2 },
    { id: 'ORD1002', date: '2025-06-22', status: 'Shipped', amount: 2799, items: 3 },
    { id: 'ORD1003', date: '2025-06-15', status: 'Out for Delivery', amount: 999, items: 1 },
    { id: 'ORD1004', date: '2025-06-10', status: 'Cancelled', amount: 0, items: 2 },
    { id: 'ORD1005', date: '2025-06-02', status: 'Delivered', amount: 3499, items: 4 },
  ];

  const displayOrders = orders.length ? orders : dummyOrders;

  return (
    <section style={{ marginBottom: '6rem' }}>
      <h2 style={{
        fontSize: '1.875rem',
        fontWeight: '700',
        color: '#111827',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <Package color="#a855f7" /> Order History
      </h2>

      {displayOrders.length === 0 ? (
        <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No past orders found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {displayOrders.map(order => (
            <div
              key={order.id}
              style={{
                width: '100%',
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.5rem',
              }}
            >
              <div style={{ flex: 1, minWidth: '220px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' }}>Order ID: <span style={{ color: '#6b7280' }}>#{order.id}</span></h3>
                <p style={{ color: '#374151' }}>Placed on: <strong>{order.date}</strong></p>
                <p style={{ color: '#374151' }}>Items: {order.items}</p>
                <p style={{ color: '#4b5563' }}>Status: <span style={{
                  fontWeight: '600',
                  color:
                    order.status === 'Delivered' ? '#10b981' :
                    order.status === 'Cancelled' ? '#ef4444' :
                    '#f59e0b'
                }}>{order.status}</span></p>
              </div>

              <div style={{ textAlign: 'right', minWidth: '160px' }}>
                <p style={{ fontSize: '1.125rem', fontWeight: '700', color: '#a855f7' }}>₹{order.amount}</p>
                <button
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '9999px',
                    backgroundColor: '#a855f7',
                    color: 'white',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#9333ea'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#a855f7'}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OrderHistory;
