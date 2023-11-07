
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  adminEmail: string | null;
}

const initialState: AdminState = {
  adminEmail: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLogin: (state, action: PayloadAction<{ adminEmail: string | null }>) => {
      state.adminEmail = action.payload.adminEmail;
    },
  },
});

export const { adminLogin } = adminSlice.actions;
export default adminSlice.reducer;
