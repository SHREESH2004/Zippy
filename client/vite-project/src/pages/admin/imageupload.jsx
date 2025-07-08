import React, { useState } from 'react';
const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      alert('Please select an image first!');
      return;
    }

    setUploading(true);
    setUploadSuccess(null);
    setUploadError(null);

    const formData = new FormData();
    const file = document.querySelector('input[type="file"]').files[0];
    formData.append('image', file);

    try {

      const SERVER_URL = import.meta.env.VITE_SERVER_URL;

      const response = await fetch(`${SERVER_URL}/admin/products/upload`, {
        method: 'POST',
        body: formData,
      });


      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();
      setUploadSuccess(result);
      setImage(null);
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={containerStyles}>
      <h2 style={headingStyles}>Upload an Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={inputStyles}
      />

      {image && (
        <div style={previewContainerStyles}>
          <h3 style={previewHeadingStyles}>Image Preview</h3>
          <img src={image} alt="Preview" style={imagePreviewStyles} />
        </div>
      )}

      <button
        type="button"
        style={uploadButtonStyles}
        onClick={handleImageUpload}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>

      {uploadSuccess && (
        <div style={successMessageStyles}>
          <h3>Upload Successful!</h3>

          <p><strong>Optimized URL:</strong></p>
          <a href={uploadSuccess.data.optimizeUrl} target="_blank" rel="noopener noreferrer">
            {uploadSuccess.data.optimizeUrl}
          </a>
          <img src={uploadSuccess.data.optimizeUrl} alt="Optimized" style={imagePreviewStyles} />

          <p><strong>Auto-Cropped URL:</strong></p>
          <a href={uploadSuccess.data.autoCropUrl} target="_blank" rel="noopener noreferrer">
            {uploadSuccess.data.autoCropUrl}
          </a>
          <img src={uploadSuccess.data.autoCropUrl} alt="Auto Cropped" style={imagePreviewStyles} />
        </div>
      )}

      {uploadError && (
        <div style={errorMessageStyles}>
          <h3>Error: {uploadError}</h3>
        </div>
      )}
    </div>
  );
};

// Styles
const containerStyles = {
  textAlign: 'center',
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const headingStyles = {
  fontSize: '1.5rem',
  marginBottom: '20px',
  color: '#333',
};

const inputStyles = {
  display: 'block',
  margin: '10px auto',
  padding: '10px',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '5px',
  cursor: 'pointer',
};

const previewContainerStyles = {
  marginTop: '20px',
  textAlign: 'center',
};

const previewHeadingStyles = {
  fontSize: '1rem',
  marginBottom: '10px',
  color: '#333',
};

const imagePreviewStyles = {
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '8px',
  marginTop: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
};

const uploadButtonStyles = {
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#00dfc4',
  color: '#fff',
  border: 'none',
  fontSize: '1rem',
  fontWeight: 'bold',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const successMessageStyles = {
  marginTop: '20px',
  padding: '10px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  borderRadius: '5px',
};

const errorMessageStyles = {
  marginTop: '20px',
  padding: '10px',
  backgroundColor: '#f44336',
  color: '#fff',
  borderRadius: '5px',
};

export default ImageUpload;
