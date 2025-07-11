import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userFromStorage = localStorage.getItem('user');
const tokenFromStorage = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!tokenFromStorage,
  isLoading: false,
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  error: null,
};

export const register = createAsyncThunk(
  '/register',
  async (formData, { rejectWithValue }) => {
    try {
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;

      const response = await axios.post(`${SERVER_URL}/user/register`, formData);

      return response.data;
    } catch (error) {
      let errorMsg = error?.response?.data?.message || 'Registration failed';

      if (error.message === 'Network Error' || error.code === 'ERR_CONNECTION_REFUSED') {
        errorMsg = 'Server down. Work In Progress';
      } else {
        errorMsg = error?.response?.data?.message || errorMsg;
      }

      return rejectWithValue({ message: errorMsg });
    }
  }
);


export const login = createAsyncThunk(
  '/login',
  async (formData, { rejectWithValue }) => {
    try {
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;

      const response = await axios.post(`${SERVER_URL}/user/login`, formData);

      return response.data;
    } catch (error) {
      let errorMsg = 'Login failed';

      if (error.message === 'Network Error' || error.code === 'ERR_CONNECTION_REFUSED') {
        errorMsg = 'Server down. Work In Progress';
      } else {
        errorMsg = error?.response?.data?.message || errorMsg;
      }

      return rejectWithValue({ message: errorMsg });
    }
  }
);



export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/user/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(logout());
      return true;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Logout failed';
      toast.error(errorMsg);
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
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;

      const response = await axios.get(`${SERVER_URL}/user/check-auth`, {
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
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
