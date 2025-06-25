import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../store/admin'; // Update with the correct path to your slice
import { addProductFormElements } from '../../config';
import ImageUpload from './imageupload';

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    salePrice: '',
    brand: '',
    image: '',
    totalStock: '',
  });

  const [errors, setErrors] = useState({});
  const [formSubmissionError, setFormSubmissionError] = useState('');
  const [notification, setNotification] = useState(''); // State for notification

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.adminProducts);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Product title is required';
    if (!formData.brand) newErrors.brand = 'Product brand is required';
    if (!formData.image) newErrors.image = 'Product image is required';
    if (!formData.category) newErrors.category = 'Product category is required';
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Product price must be a positive number';
    }
    if (formData.salePrice && (isNaN(formData.salePrice) || parseFloat(formData.salePrice) < 0)) {
      newErrors.salePrice = 'Sale price must be a valid positive number';
    }
    if (!formData.totalStock || isNaN(formData.totalStock) || parseInt(formData.totalStock) < 0) {
      newErrors.totalStock = 'Total stock must be a valid non-negative number';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Reset form submission error if any
    setFormSubmissionError('');

    // Dispatch the addProduct action
    dispatch(addProduct(formData))
      .then(() => {
        // Reset the form and errors on successful submission
        setFormData({
          title: '',
          description: '',
          category: '',
          price: '',
          salePrice: '',
          brand: '',
          image: '',
          totalStock: '',
        });
        setErrors({});
        toggleModal();
        console.log(formData)

        // Set notification message
        setNotification('Product successfully added!');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
          setNotification('');
        }, 3000);
      })
      .catch((error) => {
        // Set error message if something goes wrong during submission
        setFormSubmissionError('Error adding product, please try again later.');
        console.error('Error adding product:', error);
      });
  };

  const isFormValid = Object.keys(errors).length === 0 && Object.values(formData).every(value => value !== "");

  return (
    <Fragment>
      <button style={buttonStyles} onClick={toggleModal}>Add Product</button>

{/* Display success message if exists */}
{notification && (
  <div style={notificationStyles}>
    {notification}
  </div>
)}


      {isModalOpen && (
        <div style={modalOverlayStyles}>
          <div style={modalContentStyles}>
            <button style={closeButtonStyles} onClick={toggleModal}>X</button>
            <h2 style={modalHeadingStyles}>Add New Product</h2>
            <form onSubmit={handleSubmit}>
              {addProductFormElements.map((field) => (
                <div key={field.name} style={formGroupStyles}>
                  <label htmlFor={field.name} style={labelStyles}>{field.label}</label>
                  {field.componentType === 'input' && (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      style={inputStyles}
                    />
                  )}
                  {field.componentType === 'textarea' && (
                    <textarea
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      style={textareaStyles}
                    />
                  )}
                  {field.componentType === 'select' && (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      style={selectStyles}
                    >
                      {field.options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                  {/* Display individual field errors */}
                  {errors[field.name] && <p style={errorMessageStyles}>{errors[field.name]}</p>}
                </div>
              ))}

              {/* Display errors for brand, image, category, price, salePrice, and totalStock */}
              <div style={formGroupStyles}>
                <label htmlFor="brand" style={labelStyles}>Product Brand</label>
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  placeholder="Enter product brand"
                  value={formData.brand || ''}
                  onChange={handleInputChange}
                  style={inputStyles}
                />
                {errors.brand && <p style={errorMessageStyles}>{errors.brand}</p>}
              </div>

              <div style={formGroupStyles}>
                <label htmlFor="image" style={labelStyles}>Product Image URL</label>
                <input
                  id="image"
                  name="image"
                  type="text"
                  placeholder="Enter product image URL"
                  value={formData.image || ''}
                  onChange={handleInputChange}
                  style={inputStyles}
                />
                {errors.image && <p style={errorMessageStyles}>{errors.image}</p>}
              </div>

              <div style={formGroupStyles}>
                <label htmlFor="category" style={labelStyles}>Product Category</label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  placeholder="Enter product category"
                  value={formData.category || ''}
                  onChange={handleInputChange}
                  style={inputStyles}
                />
                {errors.category && <p style={errorMessageStyles}>{errors.category}</p>}
              </div>

              <div style={formGroupStyles}>
                <label htmlFor="price" style={labelStyles}>Product Price</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Enter product price"
                  value={formData.price || ''}
                  onChange={handleInputChange}
                  style={inputStyles}
                />
                {errors.price && <p style={errorMessageStyles}>{errors.price}</p>}
              </div>

              <div style={formGroupStyles}>
                <label htmlFor="salePrice" style={labelStyles}>Sale Price</label>
                <input
                  id="salePrice"
                  name="salePrice"
                  type="number"
                  placeholder="Enter sale price (optional)"
                  value={formData.salePrice || ''}
                  onChange={handleInputChange}
                  style={inputStyles}
                />
                {errors.salePrice && <p style={errorMessageStyles}>{errors.salePrice}</p>}
              </div>

              <div style={formGroupStyles}>
                <label htmlFor="totalStock" style={labelStyles}>Total Stock</label>
                <input
                  id="totalStock"
                  name="totalStock"
                  type="number"
                  placeholder="Enter total stock"
                  value={formData.totalStock || ''}
                  onChange={handleInputChange}
                  style={inputStyles}
                />
                {errors.totalStock && <p style={errorMessageStyles}>{errors.totalStock}</p>}
              </div>

              <ImageUpload />

              {/* Display form submission errors */}
              {formSubmissionError && <p style={errorMessageStyles}>{formSubmissionError}</p>}

              <button
                type="submit"
                style={submitButtonStyles}
                disabled={isLoading || !isFormValid}
              >
                {isLoading ? 'Adding Product...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const notificationStyles = {
  position: 'fixed',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#4caf50',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  zIndex: 1000,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  fontWeight: 'bold',
  textAlign: 'center',
};
// Styles
const buttonStyles = {
  backgroundColor: '#00dfc4',
  color: '#fff',
  border: 'none',
  padding: '8px 18px',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const modalOverlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: '#fff',
  padding: '15px 20px',
  borderRadius: '8px',
  width: '350px',
  maxWidth: '80%',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  height: 'auto',
  maxHeight: '80vh',
  overflowY: 'auto',
};

const closeButtonStyles = {
  backgroundColor: '#ff5c5c',
  color: '#fff',
  border: 'none',
  padding: '5px 8px',
  fontSize: '1.1rem',
  borderRadius: '50%',
  cursor: 'pointer',
  position: 'absolute',
  top: '10px',
  right: '10px',
};

const modalHeadingStyles = {
  fontSize: '1.3rem',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '15px',
};

const formGroupStyles = {
  marginBottom: '10px',
};

const labelStyles = {
  fontSize: '0.95rem',
  fontWeight: 'bold',
  marginBottom: '5px',
  display: 'block',
};

const inputStyles = {
  width: '100%',
  padding: '8px',
  fontSize: '0.9rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const textareaStyles = {
  width: '100%',
  padding: '8px',
  fontSize: '0.9rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
  height: '80px',  // Adjust the height as needed
};

// ** New Styles for Select Element **
const selectStyles = {
  width: '100%',
  padding: '8px',
  fontSize: '0.9rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
};

const errorMessageStyles = {
  color: 'red',
  fontSize: '0.8rem',
};

const submitButtonStyles = {
  backgroundColor: '#00dfc4',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '100%',
  transition: 'background-color 0.3s ease',
};

export default Products;