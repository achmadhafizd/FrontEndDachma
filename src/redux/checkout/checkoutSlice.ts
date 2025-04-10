import { createSlice } from "@reduxjs/toolkit";
import { createCheckoutSession } from "./checkoutThunks";
import { CheckoutProps } from "./checkoutTypes";

const initialState: CheckoutProps = {
  checkout: null,
  loading: false,
  error: null as string | null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const checkoutSliceReducer = checkoutSlice.reducer;
