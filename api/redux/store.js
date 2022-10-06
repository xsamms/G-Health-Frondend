import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { productsApi } from "./services/productApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import cartReducer from "./slice/cartSlice";

export default store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

setupListeners(store.dispatch);
