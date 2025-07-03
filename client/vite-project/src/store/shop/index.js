import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    products: [],
    error: null,
};

export const fetchAllProducts = createAsyncThunk(
    'shoppingProducts/fetchAllProducts',
    async (filters = {}, thunkAPI) => {
        try {
            const query = new URLSearchParams(filters).toString();
            const url = `http://localhost:3000/admin/products/products${query ? `?${query}` : ''}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();
            return data.data; 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
        }
    }
);


const ShopProductsSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
                state.error = null;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default ShopProductsSlice.reducer;
