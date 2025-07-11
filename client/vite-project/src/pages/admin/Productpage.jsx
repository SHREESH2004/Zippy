import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, deleteProduct } from '../../store/admin';

const ProductPage = () => {
  const [editProductData, setEditProductData] = useState(null);
  const [notification, setNotification] = useState('');
  const dispatch = useDispatch();

  const { productList, isLoading, error } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;

        const response = await fetch(`${SERVER_URL}/admin/products/products/all`);

        const data = await response.json();
        if (data.success) {
          dispatch({ type: 'adminProducts/setInitialProducts', payload: data.data });
        } else {
          throw new Error('Failed to fetch products');
        }
      } catch (err) {
        console.error('Fetching error:', err.message);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleEditClick = (product) => {
    setEditProductData({ ...product });
  };

  const handleDeleteClick = async (productId) => {
    const action = await dispatch(deleteProduct(productId));
    if (deleteProduct.fulfilled.match(action)) {
      setNotification(`✅ Product deleted successfully!`);
      setTimeout(() => setNotification(''), 3000);
    } else {
      setNotification(`❌ Delete failed: ${action.payload}`);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleEditSubmit = async () => {
    const action = await dispatch(editProduct(editProductData));
    if (editProduct.fulfilled.match(action)) {
      setNotification(`✅ Product updated successfully!`);
      setEditProductData(null);
      setTimeout(() => setNotification(''), 3000);
    } else {
      setNotification(`❌ Update failed: ${action.payload}`);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  return (
    <div style={pageContainerStyles}>
      <h1 style={headingStyles}>🛍️ Product Dashboard</h1>

      {notification && <div style={notificationStyles}>{notification}</div>}
      {error && <div style={errorMessageStyles}>{error}</div>}
      {isLoading && <p style={loadingStyles}>Loading products...</p>}

      <div style={productListStyles}>
        {productList.length > 0 ? (
          productList.map((product) => (
            <div key={product._id} style={productCardStyles}>
              <img src={product.image} alt={product.title} style={productImageStyles} />
              <div style={productInfoStyles}>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Stock:</strong> {product.totalStock}</p>
                <p><strong>Updated At:</strong> {new Date(product.updatedAt).toLocaleString()}</p> {/* Format updatedAt */}
              </div>
              <div style={buttonGroupStyles}>
                <button onClick={() => handleEditClick(product)} style={editButtonStyles}>Edit</button>
                <button onClick={() => handleDeleteClick(product._id)} style={deleteButtonStyles}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>

      {editProductData && (
        <div style={editFormStyles}>
          <h2>Edit Product</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(); }}>
            <input
              type="text"
              value={editProductData.title}
              onChange={(e) => setEditProductData({ ...editProductData, title: e.target.value })}
              placeholder="Title"
              style={inputStyles}
              required
            />
            <textarea
              value={editProductData.description}
              onChange={(e) => setEditProductData({ ...editProductData, description: e.target.value })}
              placeholder="Description"
              style={textareaStyles}
              required
            />
            <input
              type="text"
              value={editProductData.category}
              onChange={(e) => setEditProductData({ ...editProductData, category: e.target.value })}
              placeholder="Category"
              style={inputStyles}
              required
            />
            <input
              type="text"
              value={editProductData.brand}
              onChange={(e) => setEditProductData({ ...editProductData, brand: e.target.value })}
              placeholder="Brand"
              style={inputStyles}
              required
            />
            <input
              type="number"
              value={editProductData.price}
              onChange={(e) => setEditProductData({ ...editProductData, price: Number(e.target.value) })}
              placeholder="Price"
              style={inputStyles}
              required
            />
            <input
              type="number"
              value={editProductData.salePrice}
              onChange={(e) => setEditProductData({ ...editProductData, salePrice: Number(e.target.value) })}
              placeholder="Sale Price"
              style={inputStyles}
            />
            <input
              type="number"
              value={editProductData.totalStock}
              onChange={(e) => setEditProductData({ ...editProductData, totalStock: Number(e.target.value) })}
              placeholder="Total Stock"
              style={inputStyles}
              required
            />
            <input
              type="text"
              value={editProductData.image}
              onChange={(e) => setEditProductData({ ...editProductData, image: e.target.value })}
              placeholder="Image URL"
              style={inputStyles}
              required
            />

            <div style={formButtonGroupStyles}>
              <button type="submit" style={saveButtonStyles}>Save Changes</button>
              <button type="button" onClick={() => setEditProductData(null)} style={cancelButtonStyles}>Cancel</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

// === Styles ===
const pageContainerStyles = {
  padding: '30px',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f9fafc',
};

const headingStyles = {
  textAlign: 'center',
  marginBottom: '20px',
};

const productListStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px',
};

const productCardStyles = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
};

const productImageStyles = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '8px',
  marginBottom: '10px',
};

const productInfoStyles = {
  marginBottom: '10px',
};

const buttonGroupStyles = {
  display: 'flex',
  justifyContent: 'space-between',
};

const editButtonStyles = {
  backgroundColor: '#4CAF50',
  color: '#fff',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

const deleteButtonStyles = {
  backgroundColor: '#f44336',
  color: '#fff',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

const editFormStyles = {
  marginTop: '30px',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
  maxWidth: '500px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const inputStyles = {
  display: 'block',
  width: '100%',
  marginBottom: '10px',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

const textareaStyles = {
  ...inputStyles,
  height: '80px',
};

const saveButtonStyles = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px 16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

const cancelButtonStyles = {
  backgroundColor: '#6c757d',
  color: '#fff',
  padding: '10px 16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  marginLeft: '10px',
};

const formButtonGroupStyles = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '10px',
};

const notificationStyles = {
  backgroundColor: '#d4edda',
  color: '#155724',
  padding: '10px',
  borderRadius: '6px',
  marginBottom: '20px',
  textAlign: 'center',
};

const errorMessageStyles = {
  backgroundColor: '#f8d7da',
  color: '#721c24',
  padding: '10px',
  borderRadius: '6px',
  marginBottom: '20px',
  textAlign: 'center',
};

const loadingStyles = {
  textAlign: 'center',
  fontStyle: 'italic',
};

export default ProductPage;