// orderUtils.ts
import { Order } from "@/types/types";
import { setOrder as setOrderAction } from "@/app/stores/orderSlice";
import { Dispatch } from "redux";

export const updateOrder = (
  order: Order,
  setOrder: (newOrder: Order) => void,
  dispatch: Dispatch
) => {
  const totalPrice = order.flavors.reduce(
    (accumulator, flavor) => accumulator + flavor.price + order.sizePrice,
    0
  );

  const totalPoints = order.flavors.reduce(
    (accumulator, flavor) => accumulator + flavor.points,
    0
  );

  const newOrder = {
    ...order,
    price: totalPrice,
    points: totalPoints,
  };

  setOrder(newOrder);
  dispatch(setOrderAction(newOrder));
};
