import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "@/app/order/page";

const initialState: Order = {
  flavors: [],
  dough: "medium",
  size: "medium",
  sizePrice: 0,
  price: 0,
  amount: 0,
  points: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
