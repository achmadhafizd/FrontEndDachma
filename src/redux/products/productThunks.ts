import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ProductFilterParams, UpdateProductParams } from "./productTypes";

// Async thunk to fetch products by collection and optional Filters
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async (params: ProductFilterParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      if (params.collection) query.append("collection", params.collection);
      if (params.size) query.append("size", params.size);
      if (params.color) query.append("color", params.color);
      if (params.gender) query.append("gender", params.gender);
      if (params.minPrice) query.append("minPrice", params.minPrice);
      if (params.maxPrice) query.append("maxPrice", params.maxPrice);
      if (params.sortBy) query.append("sortBy", params.sortBy);
      if (params.search) query.append("search", params.search);
      if (params.category) query.append("category", params.category);
      if (params.material) query.append("material", params.material);
      if (params.brand) query.append("brand", params.brand);
      if (params.limit) query.append("limit", params.limit);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "Products not found");
    }
  }
);

// Async thunk to fetch a single product by ID
export const fetchProductsDetails = createAsyncThunk(
  "products/fetchProductsDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Products Details Not Found"
      );
    }
  }
);

// Async thunk to update products
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }: UpdateProductParams, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return { id, productData };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Update Product Failed"
      );
    }
  }
);

// Async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Similar Products Not Found"
      );
    }
  }
);
