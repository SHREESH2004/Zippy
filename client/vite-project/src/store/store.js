import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"; 
import adminProductReducer from "./admin"; 
import shopProductsReducer from "./shop";
import cartReducer from "./cart";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductReducer,
    shoppingProducts: shopProductsReducer,
    cart: cartReducer,  // Use 'cart' here, not 'cartReducer'
  },
});

export default store;
