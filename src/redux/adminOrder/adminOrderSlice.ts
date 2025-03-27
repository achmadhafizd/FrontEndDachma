import { createSlice } from "@reduxjs/toolkit";
import {
  deleteOrder,
  fetchAllOrders,
  updateOrderStatus,
} from "./adminOrderThunks";
import { OrderState } from "./adminOrderTypes";

const initialState: OrderState = {
  orders: [],
  totalOrders: 0,
  totalSales: 0,
  loading: false,
  error: null as string | null,
};

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = state.orders.length;

        // calculate total sales
        const totalSales = action.payload.reduce(
          (acc: number, order: { totalPrice: number }) => {
            return acc + order.totalPrice;
          },
          0
        );
        state.totalSales = totalSales;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })

      // handle update status product
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const orderIndex = state.orders.findIndex(
          (order) => order._id === updatedOrder._id
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updatedOrder;
        }
      })

      // handle delete order status
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const deleteOrderId = action.payload;
        state.orders = state.orders.filter(
          (order) => order._id !== deleteOrderId
        );
      });
  },
});

export const adminOrderSliceReducer = adminOrderSlice.reducer;
