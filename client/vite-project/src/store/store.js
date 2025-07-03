import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"; 
import adminProductReducer from "./admin"; 
import shopProductsReducer from "./shop";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductReducer,
    shoppingProducts: shopProductsReducer, // <-- Add this line
  },
});


export default store;
