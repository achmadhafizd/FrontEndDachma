import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { UserAdmin } from "./adminTypes";

// fetch all users (admin only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return response.data;
});

// add the create user action
export const addUser = createAsyncThunk(
  "admin/addUser",
  async (userData: UserAdmin, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "Failed to add user");
    }
  }
);

// update the user info
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async (
    {
      id,
      userData,
    }: {
      id: string;
      userData: { name?: string; email?: string; role: "admin" | "customer" };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return { id, userData, User: response.data };
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update user"
      );
    }
  }
);

// delete the user
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return {id, userDetails: response.data};
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete user"
      );
    }
  }
);
