"use client";
import { RootState } from "@/app/stores/store";
import { useDispatch, useSelector } from "react-redux";
import { setOrder as setOrderAction } from "@/app/stores/orderSlice";
import { Order } from "@/app/order/page";
import { useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
interface Translation {
  [key: string]: string;
}

const Review = () => {
  const dispatch = useDispatch();

  const order = useSelector((state: RootState) => state.order);

  const setOrder = (newOrder: Order) => {
    dispatch(setOrderAction(newOrder));
  };
  const updateOrder = () => {
    const totalPrice = order.flavors.reduce(
      (accumulator, flavor) => accumulator + flavor.price + order.sizePrice,
      0
    );

    const totalPoints = order.flavors.reduce(
      (accumulator, flavor) => accumulator + flavor.points,
      0
    );

    setOrder({
      ...order,
      price: totalPrice,
      points: totalPoints,
    });
  };

  const translation: Translation = {
    thin: "Massa fina",
    medium: "Massa média",
    thick: "Massa grossa",
  };

  const translateDough = (originalDough: string) => {
    return translation[originalDough] || originalDough;
  };

  useEffect(() => {
    updateOrder();
  }, []);
  console.log(order);

  return (
    <div>
      <Card>
        <CardHeader>
          <Heading size="md"> Seu pedido:</Heading>
        </CardHeader>
        <CardBody>
          <VStack w="100%" alignItems="flex-start" spacing={5}>
            <Text as="b">
              {order.flavors.length > 1
                ? "Pizzas escolhidas"
                : "Pizza escolhida"}
            </Text>

            {order.flavors.map((flavor) => (
              <>
                <Text>
                  {flavor.amount}x {flavor.flavor}
                </Text>
              </>
            ))}
            <Text>
              <b>Massa:</b> {translateDough(order.dough)}{" "}
            </Text>
          </VStack>
          <Text>
            <b>Total:</b> R$ {order.price}
          </Text>
          <Text>
            Ao finalizar a compra, você ganhará {order.points} pontos!
          </Text>
        </CardBody>
        <CardFooter>
          <Button>View here</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Review;
