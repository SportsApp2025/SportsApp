import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  email: string;
  name: string;
}

const initialState: UserState = {
  id: "",
  email: "",
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const { id, email, name } = action.payload;
      state.id = id;
      state.email = email;
      state.name = name;
      console.log(action.payload); // Logs the user data
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
