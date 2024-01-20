import {
  combineReducers,
  configureStore,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { Order } from "../../types/types";
import orderReducer from "./orderSlice";
import userReducer, { userInitialState, UserState } from "./userSlice";

export const setActiveStep = createAction<number>("SET_ACTIVE_STEP");

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

const initialState: RootState = {
  user: userInitialState,
  order: initialOrderState,
  activeStep: 0,
};

const activeStepReducer = createReducer(initialState.activeStep, (builder) => {
  builder.addCase(setActiveStep, (state, action) => {
    return action.payload;
  });
});

const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  activeStep: activeStepReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
