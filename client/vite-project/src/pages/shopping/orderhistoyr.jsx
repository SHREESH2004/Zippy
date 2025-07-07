import React, { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      const response = await axios.get(`http://localhost:3000/orders/my?userId=${userId}`);
      const transformed = response.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(order => ({
          id: order._id.slice(-6).toUpperCase(),
          date: new Date(order.createdAt).toLocaleDateString(),
          status: order.status,
          amount: order.totalAmount,
          items: order.cart.products.length,
          fullData: order,
        }));

      setOrders(transformed);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/orders/${orderId}/status`, {
        status: newStatus,
      });
      fetchOrders();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderDetailsModal = () => {
    if (!selectedOrder) return null;
    const { fullData } = selectedOrder;

    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
        justifyContent: 'center', alignItems: 'center', zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white', padding: '2rem', borderRadius: '1rem',
          width: '90%', maxWidth: '700px', maxHeight: '90%', overflowY: 'auto'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4f46e5' }}>
            Order #{selectedOrder.id} - Full Details
          </h3>
          <p><strong>Placed On:</strong> {selectedOrder.date}</p>
          <p><strong>Status:</strong> {selectedOrder.status}</p>
          <p><strong>Total Amount:</strong> ₹{selectedOrder.amount}</p>
          <p><strong>Payment Method:</strong> {fullData.paymentMethod}</p>
          <p><strong>Shipping Cost:</strong> ₹{fullData.shippingCost}</p>
          <p><strong>Discount:</strong> ₹{fullData.discount}</p>
          <p><strong>Tax:</strong> ₹{fullData.tax}</p>

          <hr style={{ margin: '1rem 0' }} />

          <h4>🧾 Products:</h4>
          <ul style={{ marginLeft: '1rem' }}>
            {fullData.cart.products.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>
                <strong>{item.product?.title || 'N/A'}</strong> (x{item.quantity}) — ₹{item.priceAtTime}
              </li>
            ))}
          </ul>

          <hr style={{ margin: '1rem 0' }} />
          <h4>📍 Shipping Address:</h4>
          <p>{fullData.shippingAddress?.address}, {fullData.shippingAddress?.city}, {fullData.shippingAddress?.state} - {fullData.shippingAddress?.pincode}</p>
          <p>Phone: {fullData.shippingAddress?.phoneno}</p>
          <p>Notes: {fullData.shippingAddress?.notes || "None"}</p>

          <hr style={{ margin: '1rem 0' }} />

          <button
            style={{
              marginTop: '1.5rem',
              backgroundColor: '#4f46e5',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedOrder(null)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

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

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No past orders found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map(order => (
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
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' }}>
                  Order ID: <span style={{ color: '#6b7280' }}>#{order.id}</span>
                </h3>
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

              <div style={{ textAlign: 'right', minWidth: '200px' }}>
                <p style={{ fontSize: '1.125rem', fontWeight: '700', color: '#a855f7' }}>₹{order.amount}</p>

                <button
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '9999px',
                    backgroundColor: '#a855f7',
                    color: 'white',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: '0.5rem',
                  }}
                  onClick={() => setSelectedOrder(order)}
                >
                  View Details
                </button>

                {(order.status !== 'Delivered' && order.status !== 'Cancelled') && (
                  <button
                    style={{
                      padding: '0.5rem 1.25rem',
                      borderRadius: '0.75rem',
                      backgroundColor: '#10b981',
                      color: 'white',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer',
                      marginTop: '0.5rem',
                    }}
                    onClick={() => {
                      updateOrderStatus(order.fullData._id, 'Confirmed');
                      localStorage.setItem('paymentOrderId', order.fullData._id);
                      localStorage.setItem('paymentTotalAmount', order.amount);
                      navigate('/shopping/payments');
                    }}
                  >
                    Pay with Google Pay →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {renderDetailsModal()}
    </section>
  );
};

export default OrderHistory;
