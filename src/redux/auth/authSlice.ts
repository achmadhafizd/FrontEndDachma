import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./authTypes";
import { loginUser, registerUser } from "./authThunks";
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from "./authHelpers";

const initialGuestId = localStorage.getItem("guestId") || `guest_${Date.now()}`
localStorage.setItem("guestId", initialGuestId);

const initialState: AuthState = {
  user: getFromLocalStorage("userInfo"),
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// Redux Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${Date.now()}`;
      removeFromLocalStorage("userInfo");
      removeFromLocalStorage("userToken");
      saveToLocalStorage("guestId", state.guestId);
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${Date.now()}`;
      saveToLocalStorage("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Registration failed";
      });
  },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
