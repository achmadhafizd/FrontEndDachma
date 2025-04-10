import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ProductParams } from "./productAdminTypes";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const USERTOKEN = `Bearer ${localStorage.getItem("userToken")}`;

// async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async () => {
    const response = await axios.get(`${API_URL}/api/admin/products`, {
      headers: {
        Authorization: USERTOKEN,
      },
    });
    return response.data;
  }
);

// async function to create product
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/products`,
        productData,
        {
          headers: {
            Authorization: USERTOKEN,
          },
        }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to create product"
      );
    }
  }
);

// async thunk to update an existing product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async (
    { id, productData }: { id: string; productData: ProductParams },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/products/${id}`,
        productData,
        {
          headers: {
            Authorization: USERTOKEN,
          },
        }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update product"
      );
    }
  }
);

// async thunk to delete an existing product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/products/${id}`,
        {
          headers: {
            Authorization: USERTOKEN,
          },
        }
      );
      return {id, Product: response.data};
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete product"
      );
    }
  }
);
