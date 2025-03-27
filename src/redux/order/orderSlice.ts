import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderDetails, fetchUserOrders } from "./orderThunks";
import { OrderState } from "./orderTypes";

const initialState: OrderState = {
  orders: [],
  totalOrders: 0,
  orderDetails: null,
  loading: false,
  error: null as string | null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // handle fetching user orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message as string;
      })

      // handle fetching user orders Details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message as string;
      });
  },
});

export const orderSliceReducer = orderSlice.reducer;
