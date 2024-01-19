"use client";
import { RootState, setActiveStep } from "@/app/stores/store";
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
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
interface Translation {
  [key: string]: string;
}

const Review = () => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const activeStep = useSelector((state: RootState) => state.activeStep);
  const order = useSelector((state: RootState) => state.order);

  const setOrder = (newOrder: Order) => {
    dispatch(setOrderAction(newOrder));
  };

  const handleStepChange = (step: number) => {
    dispatch(setActiveStep(step));
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
    thin: "Fina",
    medium: "Média",
    thick: "Grossa",
  };

  const translateDough = (originalDough: string) => {
    return translation[originalDough] || originalDough;
  };

  useEffect(() => {
    updateOrder();
  }, []);

  const handleOrder = () => {
    toast({
      title: "Seu pedido foi concluído, agora é só esperar chegar até você!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    router.push("/");
    return dispatch(setActiveStep(0));
  };

  return (
    <div>
      <Card>
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
                  <Text>
                    {flavor.amount}x {flavor.flavor}
                  </Text>
                ))}
              </VStack>
              <Text>
                <b>Massa:</b> {translateDough(order.dough)}
              </Text>
            </VStack>

            <VStack w="100%" alignItems="flex-start" spacing={5}>
              <Divider borderColor="yellow" w="100%" />
              <HStack>
                <Text as="b" fontSize={32}>
                  Total:
                </Text>
                <Text as="b" color="yellow.600" fontSize={32}>
                  R$ {order.price}0
                </Text>
              </HStack>
              {order.points > 0 && (
                <Text color="yellow.600">
                  Ao finalizar a compra, você ganhará{" "}
                  <b>{order.points} pontos</b>!
                </Text>
              )}
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
