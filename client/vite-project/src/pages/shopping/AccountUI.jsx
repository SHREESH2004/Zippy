import React, { useState } from 'react';
import {
  MapPin, ShoppingCart, Pencil, Trash2, BadgeIndianRupee, PlusCircle
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const AccountUI = ({ loading, addresses, cart, onAddAddress, onEditAddress, onDeleteAddress }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({
    address: '', city: '', state: '', pincode: '', phoneno: '', notes: ''
  });

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (isEditing) {
      onEditAddress(isEditing, formData);
      toast.success('Address updated successfully!');
      setIsEditing(null);
    } else {
      onAddAddress(formData);
      toast.success('Address added successfully!');
    }
    setFormData({ address: '', city: '', state: '', pincode: '', phoneno: '', notes: '' });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    onDeleteAddress?.(id);
    toast.success('Address deleted successfully!');
  };

  if (loading) return <div style={{ padding: '2.5rem', textAlign: 'center', fontSize: '1.5rem', color: '#374151' }}>Loading your account...</div>;

  const total = cart?.products?.reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 0;

  return (
    <div style={{ backgroundColor: 'white', fontFamily: 'sans-serif' }}>
      <Toaster position="top-right" />
      <div style={{ height: '70vh', width: '100%', backgroundImage: `url('https://images.stockcake.com/public/7/2/2/722df067-a4fe-4eee-a94d-bf306602ddd1_large/urban-graffiti-alley-stockcake.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', color: 'white', marginBottom: '1rem' }}>WELCOME TO YOUR ZIPPY ACCOUNT</h1>
          <p style={{ color: '#e5e7eb', fontSize: '1.125rem' }}>Where your style, cart, and orders live in style 🛍️</p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '6rem' }}>
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <MapPin color="#2563eb" /> Saved Addresses
            </h2>
            <button
              onClick={() => {
                setIsAdding(!isAdding);
                setIsEditing(null);
                setFormData({ address: '', city: '', state: '', pincode: '', phoneno: '', notes: '' });
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1rem', borderRadius: '9999px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)', cursor: 'pointer', border: 'none' }}
            >
              <PlusCircle size={18} /> {isAdding || isEditing ? 'Cancel' : 'Add Address'}
            </button>
          </div>

          {(isAdding || isEditing) && (
            <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '1rem', border: '1px solid #e5e7eb', display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
              {['address', 'city', 'state', 'pincode', 'phoneno', 'notes'].map((field, idx) => (
                <input
                  key={idx}
                  name={field}
                  value={formData[field]}
                  onChange={handleFormChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', width: '100%' }}
                />
              ))}
              <button onClick={handleSubmit} style={{ gridColumn: '1 / -1', marginTop: '1rem', padding: '0.75rem', backgroundColor: '#111827', color: 'white', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer' }}>{isEditing ? 'Update' : 'Submit'}</button>
            </div>
          )}

          {addresses.length === 0 ? (
            <p style={{ color: '#6b7280', fontStyle: 'italic' }}>You haven’t added any addresses yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {addresses.map((addr) => (
                <div key={addr._id} style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>{addr.address}</h3>
                  <p style={{ color: '#374151' }}>{addr.city}, {addr.state} - {addr.pincode}</p>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '0.25rem' }}>📞 {addr.phoneno}</p>
                  <p style={{ fontSize: '0.75rem', fontStyle: 'italic', color: '#6b7280', marginTop: '0.5rem' }}>{addr.notes}</p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                    <button onClick={() => {
                      setIsEditing(addr._id);
                      setIsAdding(true);
                      setFormData({
                        address: addr.address,
                        city: addr.city,
                        state: addr.state,
                        pincode: addr.pincode,
                        phoneno: addr.phoneno,
                        notes: addr.notes,
                      });
                    }} style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', borderRadius: '9999px', border: '1px solid #3b82f6', color: '#3b82f6', backgroundColor: 'transparent', cursor: 'pointer' }}>
                      <Pencil size={14} style={{ marginRight: '0.25rem', display: 'inline' }} /> Edit
                    </button>
                    <button onClick={() => handleDelete(addr._id)} style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', borderRadius: '9999px', border: '1px solid #ef4444', color: '#ef4444', backgroundColor: 'transparent', cursor: 'pointer' }}>
                      <Trash2 size={14} style={{ marginRight: '0.25rem', display: 'inline' }} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Cart Section */}
        <section>
          <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShoppingCart color="#10b981" /> Current Cart
          </h2>

          {!cart?.products?.length ? (
            <p style={{ color: '#6b7280', fontStyle: 'italic' }}>Your cart is empty. Let’s go shopping!</p>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {cart.products.map(item => (
                  <div key={item._id} style={{ backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', transition: 'all 0.3s ease' }}>
                    <img src={item.product.image} alt={item.product.title} style={{ width: '100%', height: '12rem', objectFit: 'cover' }} />
                    <div style={{ padding: '1rem' }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>{item.product.title}</h3>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{item.product.description}</p>
                      <div style={{ fontSize: '0.875rem', color: '#374151', display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                        <span>{item.product.brand}</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '1.25rem', fontWeight: '700', color: '#ec4899', marginTop: '0.5rem' }}>
                        ${item.product.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BadgeIndianRupee color="#111827" /> Total: ${total}
                </div>
                <button
                  style={{ marginTop: '1rem', padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: '600', borderRadius: '9999px', backgroundColor: 'black', color: 'white', border: '2px solid transparent', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = 'black';
                    e.target.style.border = '2px solid black';
                  }}
                  onMouseLeave={e => {
                    e.target.style.backgroundColor = 'black';
                    e.target.style.color = 'white';
                    e.target.style.border = '2px solid transparent';
                  }}
                  onClick={() => toast.success('Proceeding to Checkout!')}
                >
                  🛍️ Buy Now
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default AccountUI;