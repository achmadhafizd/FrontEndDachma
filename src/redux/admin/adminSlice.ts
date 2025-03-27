import { createSlice } from "@reduxjs/toolkit";
import { addUser, deleteUser, fetchUsers, updateUser } from "./adminThunks";
import { AdminState } from "./adminTypes";

const initialState: AdminState = {
  users: [],
  loading: false,
  error: null as string | null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // handle fetching users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })

      // handle update user
      .addCase(updateUser.fulfilled, (state, action) => {
        const { id, userData } = action.payload;
        const userIndex = state.users.findIndex((user) => user._id === id);
        if (userIndex !== -1) {
          state.users[userIndex] = { ...state.users[userIndex], ...userData };
        }
      })

      //   handle delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })

      // handle add user
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.user);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const adminSliceReducer = adminSlice.reducer;
