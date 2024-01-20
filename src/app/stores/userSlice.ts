import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id?: number;
  name: string;
  points: number;
}

export interface UserState {
  currentUser: User | null;
}

export const userInitialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;

      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    updateUserPoints: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.points += action.payload;
      }

      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
  },
});

export const { setUser, updateUserPoints } = userSlice.actions;
export default userSlice.reducer;
