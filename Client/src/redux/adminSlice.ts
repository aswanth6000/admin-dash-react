import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  fullname: string;
  email: string;
  profilePic : string;
}

interface AdminState {
  adminEmail: string | null;
  allusers: User[]; 
}

const initialState: AdminState = {
  adminEmail: null,
  allusers: [], 
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLogin: (state, action: PayloadAction<{ adminEmail: string | null }>) => {
      state.adminEmail = action.payload.adminEmail;
    },
    
    setAdminUsers: (state, action: PayloadAction<{ users: User[] }>) => {
      state.allusers = action.payload.users;
    },
  },
});

export const { adminLogin, setAdminUsers } = adminSlice.actions;
export default adminSlice.reducer;
