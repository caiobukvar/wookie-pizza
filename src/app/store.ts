import { configureStore } from "@reduxjs/toolkit";

const SET_ACTIVE_STEP = "SET_ACTIVE_STEP";

export const setActiveStep = (step: number) => ({
  type: SET_ACTIVE_STEP,
  payload: step,
});

export interface RootState {
  activeStep: number;
}

const initialState: RootState = {
  activeStep: 0,
};

const reducer = (state: RootState = initialState, action: any) => {
  switch (action.type) {
    case SET_ACTIVE_STEP:
      return { ...state, activeStep: action.payload };
    default:
      return state;
  }
};

const store = configureStore({
  reducer,
});

export default store;
