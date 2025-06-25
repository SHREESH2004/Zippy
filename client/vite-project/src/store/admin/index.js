import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  isLoading: false,
  productList: [],
  error: null,
};

// Thunk: Delete Product
export const deleteProduct = createAsyncThunk(
  'adminProducts/deleteProduct',
  async (productId, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/products/products/${productId}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to delete product');
      }

      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk: Edit Product
export const editProduct = createAsyncThunk(
  'adminProducts/editProduct',
  async (updatedProduct, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/products/products/${updatedProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to update product');
      }

      return updatedProduct;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk: Add Product (with FormData)
// Thunk: Add Product (with JSON payload, since you're using an image URL)
export const addProduct = createAsyncThunk(
  'adminProducts/addProduct',
  async (productData, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3000/admin/products/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData), // image is a URL in this case
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || 'Something went wrong while adding the product.'
      );
    }
  }
);


// Slice
const adminProductSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {
    setInitialProducts: (state, action) => {
      state.productList = action.payload;
    },
},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = [...state.productList, action.payload];
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productList = state.productList.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.productList = state.productList.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      });
  },
});

export default adminProductSlice.reducer;
