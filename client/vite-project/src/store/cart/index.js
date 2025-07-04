import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 🛒 Fetch cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3000/cart?userId=${userId}`, {
        headers: { ...getAuthHeader() },
      });
      if (!res.ok) throw new Error('Failed to fetch cart');
      const data = await res.json();
      return {
        items: data.cart?.products || [],
        totalPrice: data.totalPrice || 0,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// ➕ Add to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, quantity }, thunkAPI) => {
    try {
      const res = await fetch('http://localhost:3000/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({ userId, productId, quantity }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to add item');
      }
      const data = await res.json();
      return {
        items: data.cart?.products || [],
        totalPrice: data.totalPrice || 0,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// 🔁 Update cart
export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ userId, productId, quantityChange }, thunkAPI) => {
    try {
      const res = await fetch('http://localhost:3000/cart/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({ userId, productId, quantityChange }),
      });
      if (!res.ok) throw new Error('Failed to update cart');
      const data = await res.json();
      return {
        items: data.cart?.products || [],
        totalPrice: data.totalPrice || 0,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// 🧾 Cart slice
const initialCart = {
  isLoading: false,
  items: [],
  totalPrice: 0,
  error: null,  // add error here
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCart,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Update cart
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});


export default cartSlice.reducer;
