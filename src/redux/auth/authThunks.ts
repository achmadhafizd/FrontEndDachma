import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { LoginUserData, RegisterUserData } from "./authTypes";
import { saveToLocalStorage } from "./authHelpers";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: LoginUserData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData
      );

      saveToLocalStorage("userInfo", response.data.user);
      localStorage.setItem("userToken", response.data.token);

      return response.data.user;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterUserData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData
      );

      saveToLocalStorage("userInfo", response.data.user);
      saveToLocalStorage("userToken", response.data.token);

      return response.data.user;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Registration failed"
      );
    }
  }
);
