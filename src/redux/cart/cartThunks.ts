import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { CartData, CartIdentity } from "./cartTypes";

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ guestId, userId }: CartIdentity, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/carts`,
        { params: { guestId, userId } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

// Add an item to the cart for a user or a guest
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, size, color, guestId, userId }: CartData,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/carts`,
        {
          productId,
          quantity,
          size,
          color,
          guestId,
          userId,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "Cart not found");
    }
  }
);

// Update the quantity of an item in the cart for a user or a guest
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (
    { productId, quantity, size, color, guestId, userId }: CartData,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/carts`,
        {
          productId,
          quantity,
          size,
          color,
          guestId,
          userId,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "Cart not found");
    }
  }
);

// Remove an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (
    { productId, guestId, userId, size, color }: CartData,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/carts`,
        {
          data: {
            productId,
            guestId,
            userId,
            size,
            color,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "Failed to remove");
    }
  }
);

// Merge guest cart into user cart
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId, user }: CartIdentity, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/carts/merge`,
        { guestId, user },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      const axioError = error as AxiosError;
      return rejectWithValue(axioError.response?.data || error);
    }
  }
);
