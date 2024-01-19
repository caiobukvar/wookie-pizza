import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice";
import { Order } from "../order/page";

const SET_ACTIVE_STEP = "SET_ACTIVE_STEP";

export const setActiveStep = (step: number) => ({
  type: SET_ACTIVE_STEP,
  payload: step,
});

export interface RootState {
  order: Order;
  activeStep: number;
}

const initialOrderState: Order = {
  flavors: [],
  dough: "medium",
  size: "medium",
  sizePrice: 0,
  price: 0,
  amount: 0,
  points: 0,
};

const initialState: RootState = {
  order: initialOrderState,
  activeStep: 0,
};

const rootReducer = (state: RootState = initialState, action: any) => {
  switch (action.type) {
    case SET_ACTIVE_STEP:
      return { ...state, activeStep: action.payload };
    default:
      return {
        order: orderReducer(state.order, action),
        activeStep: state.activeStep,
      };
  }
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
