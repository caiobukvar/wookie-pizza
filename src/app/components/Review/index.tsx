import { RootState } from "@/app/stores/store";
import { useDispatch, useSelector } from "react-redux";
import { setOrder as setOrderAction } from "@/app/stores/orderSlice";
import { Order } from "@/app/order/page";

const Review = () => {
  const dispatch = useDispatch();

  const order = useSelector((state: RootState) => state.order);

  const setOrder = (newOrder: Order) => {
    dispatch(setOrderAction(newOrder));
  };

  const updateOrderPrice = () => {
    const totalPrice = order.flavors.reduce(
      (accumulator, flavor) => accumulator + flavor.price,
      0
    );

    setOrder({
      ...order,
      price: totalPrice,
    });
  };

  return <div>review</div>;
};

export default Review;
