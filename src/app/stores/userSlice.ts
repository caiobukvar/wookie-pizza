import { User } from "@/services/database/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const UPDATE_USER_POINTS = "UPDATE_USER_POINTS";

export const updateUserPoints = (user: User, newPoints: number) => ({
  type: UPDATE_USER_POINTS,
  payload: { user, newPoints },
});

export interface UserState {
  users: User[];
}

const getDefaultUser = (): User => ({
  name: "Caio Bukvar",
  points: 0,
});

export const loadUserState = (): UserState => {
  if (typeof localStorage !== "undefined") {
    const storedState = localStorage.getItem("userState");
    return storedState
      ? JSON.parse(storedState)
      : { users: [getDefaultUser()] };
  } else {
    return { users: [getDefaultUser()] };
  }
};

const saveUserState = (state: UserState): void => {
  localStorage.setItem("userState", JSON.stringify(state));
};

const initialUserState: UserState = loadUserState();

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUserPoints: (
      state,
      action: PayloadAction<{ user: User; newPoints: number }>
    ) => {
      const { user, newPoints } = action.payload;
      const existingUser = state.users.find((u) => u.name === user.name);

      if (existingUser) {
        existingUser.points = newPoints;
        saveUserState(state);
      }
    },
    setPersistedUserPoints: (state, action: PayloadAction<number>) => {
      state.users[0].points = action.payload;
      saveUserState(state);
    },
  },
});

export const { setUserPoints, setPersistedUserPoints } = userSlice.actions;
export default userSlice.reducer;
