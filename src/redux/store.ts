import { configureStore } from "@reduxjs/toolkit";
import { authSliceReducer } from "./auth/authSlice";
import { productsSliceReducer } from "./products/productSlice";
import { cartSliceReducer } from "./cart/cartSlice";
import { checkoutSliceReducer } from "./checkout/checkoutSlice";
import { orderSliceReducer } from "./order/orderSlice";
import { adminSliceReducer } from "./admin/adminSlice";
import { adminProductSliceReducer } from "./adminProduct/adminProductSlice";
import { adminOrderSliceReducer } from "./adminOrder/adminOrderSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    products: productsSliceReducer,
    cart: cartSliceReducer,
    checkout: checkoutSliceReducer,
    orders: orderSliceReducer,
    admin: adminSliceReducer,
    adminProducts: adminProductSliceReducer,
    adminOrders: adminOrderSliceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppSubscribe = typeof store.subscribe;

export default store;
