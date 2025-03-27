import { createSlice } from "@reduxjs/toolkit";
import { loadCartFromStorage, saveCartToStorage } from "./cartHelpers";
import {
  addToCart,
  fetchCart,
  mergeCart,
  removeFromCart,
  updateCart,
} from "./cartThunks";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage() || {
      _id: "",
      guestId: "",
      products: [],
      totalPrice: 0,
      createdAt: "",
      updatedAt: "",
      user: "",
    },
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      // handle fetching cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.error.message as string) || "Failed to fetch cart";
      })

      //   handle adding to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.error.message as string) || "Failed to add to cart";
      })

      //   handle updating the cart
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.error.message as string) || "Failed to update item quantity";
      })

      //   handle removing from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.error.message as string) || "Failed to remove item";
      })

      // handle merge cart
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.error.message as string) || "Failed to merge cart";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export const cartSliceReducer = cartSlice.reducer;
