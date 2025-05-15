import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Load user and token from localStorage
const userFromStorage = localStorage.getItem('user');
const tokenFromStorage = localStorage.getItem('token');

// ✅ Initial state
const initialState = {
  isAuthenticated: !!tokenFromStorage,
  isLoading: false,
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  error: null,
};

// ✅ Async thunk for register
export const register = createAsyncThunk(
  '/register',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/user/register', formData);
      return response.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Registration failed';
      return rejectWithValue({ message: errorMsg });
    }
  }
);

// ✅ Async thunk for login
export const login = createAsyncThunk(
  '/login',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/user/login', formData);
      return response.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Login failed';
      return rejectWithValue({ message: errorMsg });
    }
  }
);

// ✅ Async thunk to check authentication
export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/user/check-auth', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Authentication check failed';
      return rejectWithValue({ message: errorMsg });
    }
  }
);

// ✅ Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuthenticated = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      toast.info("You have been logged out.");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
        toast.success(action.payload.message || "Registration successful!");
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload?.message || "Registration failed");
      })

      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
        toast.success(action.payload.message || "Login successful!");
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload?.message || "Login failed");
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        toast.error(action.payload?.message || "Authentication check failed");
      });
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
