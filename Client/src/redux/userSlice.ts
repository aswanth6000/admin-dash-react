import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string; // Change "_id" to "id"
  fullname: string;
  email: string;
  profilePic: string;
  // Add other fields as needed
}

interface UserState {
  user: User | null;
  token: string | null;
  allusers: User[]; // Rename "allUsers" to "allusers"
}

const initialState: UserState = {
  user: null,
  token: null,
  allusers: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<{ user: User | null; token: string | null }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    updateProfile: (state, action: PayloadAction<User[]>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload[0], // Assuming you are updating the user's own profile
        };
      }
    },
  },
});

export const { setLogin, setLogout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
