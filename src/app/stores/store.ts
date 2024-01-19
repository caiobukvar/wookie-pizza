import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer, { UserState, loadUserState } from "./userSlice";
import orderReducer from "./orderSlice";
import { Order } from "../order/page";

export const SET_ACTIVE_STEP = "SET_ACTIVE_STEP";

export const setActiveStep = (step: number) => ({
  type: SET_ACTIVE_STEP,
  payload: step,
});

export interface RootState {
  user: UserState;
  order: Order;
  activeStep: number;
}

const initialOrderState: Order = {
  flavors: [],
  dough: "medium",
  size: "medium",
  sizePrice: 0,
  price: 0,
  points: 0,
};

// Load the initialUserState from localStorage
const initialUserState: UserState = loadUserState();

const initialState: RootState = {
  user: initialUserState,
  order: initialOrderState,
  activeStep: 0,
};

const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  activeStep: (state = initialState.activeStep, action) => {
    switch (action.type) {
      case SET_ACTIVE_STEP:
        return action.payload;
      default:
        return state;
    }
  },
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
