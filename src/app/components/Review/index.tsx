/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { setOrder as setOrderAction } from "@/app/stores/orderSlice";
import { RootState, setActiveStep } from "@/app/stores/store";
import { updateUserPoints } from "@/app/stores/userSlice";
import { Order } from "@/types/types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
interface Translation {
  [key: string]: string;
}

const Review = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useToast();
  const activeStep = useSelector((state: RootState) => state.activeStep);
  const order = useSelector((state: RootState) => state.order);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [userData, setUserData] = useState();
  const [error, setError] = useState<string | null>(null);

  const setOrder = (newOrder: Order) => {
    dispatch(setOrderAction(newOrder));
  };

  const handleStepChange = (step: number) => {
    dispatch(setActiveStep(step));
  };

  const translation: Translation = {
    thin: "Fina",
    medium: "Média",
    thick: "Grossa",
  };

  const translateDough = (originalDough: string) => {
    return translation[originalDough] || originalDough;
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

  const handleOrder = async () => {
    try {
      const response = await fetch("/api/database/updateUser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 1,
          points: order.points,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setUserData(data.user);
        dispatch(updateUserPoints(data.points));
        toast({
          title: "Pedido realizado com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push("/");
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      return setError("Internal Server Error");
    }
  };

  useEffect(() => {
    updateOrder();
  }, []);

  return (
    <div>
      <Card marginTop={10}>
        <CardHeader>
          <Heading size="md"> Seu pedido:</Heading>
        </CardHeader>
        <CardBody>
          <VStack w="100%" alignItems="flex-start" spacing={20}>
            <VStack w="100%" alignItems="flex-start" spacing={5}>
              <VStack alignItems="flex-start">
                <Text as="b">
                  {order.flavors.length > 1
                    ? "Pizzas escolhidas:"
                    : "Pizza escolhida:"}
                </Text>

                {order.flavors.map((flavor) => (
                  <Text key={flavor.flavor}>
                    {flavor.amount}x {flavor.flavor}
                  </Text>
                ))}
              </VStack>
              <Text>
                <b>Massa:</b> {translateDough(order.dough)}
              </Text>
            </VStack>

            <VStack w="100%" alignItems="flex-start" spacing={5}>
              <Divider borderColor="#b7791f" w="100%" />
              <HStack>
                <Text as="b" fontSize={32}>
                  Total:
                </Text>
                <Text as="b" color="yellow.600" fontSize={32}>
                  R$ {order.price.toFixed(2)}
                </Text>
              </HStack>
              <VStack alignItems="flex-start">
                {order.points > 0 && (
                  <Text color="yellow.600" fontSize="sm">
                    Ao finalizar a compra, você ganhará <b>{order.points} </b>
                    pontos!
                  </Text>
                )}
                <Text color="yellow.600" fontSize="sm">
                  No momento, você possui <b>{currentUser?.points} </b>pontos.
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </CardBody>
        <CardFooter>
          <HStack spacing={5}>
            <Button
              onClick={() => handleStepChange(activeStep - 1)}
              colorScheme="yellow"
              variant="outline"
            >
              Voltar
            </Button>
            <Button colorScheme="yellow" onClick={() => handleOrder()}>
              Finalizar pedido
            </Button>
          </HStack>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Review;
