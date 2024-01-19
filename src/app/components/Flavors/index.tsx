"use client";
import { Order } from "../../order/page";
import { setOrder as setOrderAction } from "@/app/stores/orderSlice";
import { RootState } from "@/app/stores/store";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Input,
  InputGroup,
  Stack,
  Text,
  VStack,
  Wrap,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import pizzaFlavors from "../../api/flavors.json";
import styles from "./page.module.css";

interface PizzaFlavor {
  id: number;
  flavor: string;
  ingredients: string;
  price: number;
  image: string;
  day: string;
  points: number;
}

const Flavors = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  const order = useSelector((state: RootState) => state.order);

  const setOrder = (newOrder: Order) => {
    dispatch(setOrderAction(newOrder));
  };

  const [flavors, setFlavors] = useState<PizzaFlavor[]>(pizzaFlavors);

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const today = new Date()
    .toLocaleDateString("pt-BR", { weekday: "long" })
    .toLowerCase();

  useEffect(() => {
    setFlavors((prevFlavors) =>
      prevFlavors.map((pizza) => ({
        ...pizza,
        totalPrice: order.sizePrice + pizza.price,
      }))
    );
  }, [order.sizePrice]);

  const handleIncrement = (pizzaName: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [pizzaName]: (prevQuantities[pizzaName] || 0) + 1,
    }));
  };

  const handleDecrement = (pizzaName: string) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[pizzaName] || 0;
      const newQuantity = Math.max(currentQuantity - 1, 0);
      return {
        ...prevQuantities,
        [pizzaName]: newQuantity,
      };
    });
  };
  const calculatePoints = (pizza: PizzaFlavor, quantity: number): number => {
    if (pizza.day.toLowerCase() === today) {
      return quantity === 1 ? pizza.points : pizza.points * quantity;
    } else {
      return 0;
    }
  };

  const sortedFlavors = [...flavors].sort((a, b) => {
    if (a.day.toLowerCase() === today) {
      return -1;
    } else if (b.day.toLowerCase() === today) {
      return 1;
    } else {
      return 0;
    }
  });

  const handleSelect = (pizza: PizzaFlavor) => {
    const quantity = quantities[pizza.flavor] || 0;

    if (quantity <= 0) {
      return toast({
        title: "Favor adicionar a quantidade desejada!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    const price = (order.sizePrice + pizza.price) * quantity;
    const pointsPerPizza = calculatePoints(pizza, quantity);
    const existingFlavor = order.flavors.find(
      (flavor) => flavor.flavor === pizza.flavor
    );

    if (existingFlavor) {
      const updatedFlavors = order.flavors.map((flavor) =>
        flavor.flavor === pizza.flavor
          ? {
              ...flavor,
              amount: quantity,
              price,
              points: pointsPerPizza,
            }
          : flavor
      );
      setOrder({
        ...order,
        flavors: updatedFlavors,
      });
    } else {
      setOrder({
        ...order,
        flavors: [
          ...order.flavors,
          {
            flavor: pizza.flavor,
            amount: quantity,
            price,
            points: pointsPerPizza,
          },
        ],
      });
    }
    toast({
      title: "Pedido adicionado ao carrinho!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Stack spacing={4}>
      <Wrap spacing={4}>
        {sortedFlavors.map((pizza, index) => (
          <Card key={index} maxW="250px" size="sm" p={2}>
            {pizza.day.toLowerCase() === today && (
              <Badge
                className={styles.badge}
                borderRadius={10}
                p={2}
                colorScheme="yellow"
                variant="solid"
                alignItems="center"
                textAlign="center"
              >
                <Text>Pizza do dia </Text>
                <Text>Ganhe {pizza.points} pontos!</Text>
              </Badge>
            )}
            <CardBody>
              <Image
                src={pizza.image}
                alt={`Pizza de ${pizza.flavor}`}
                width={250}
                height={140}
                className={styles.img}
              />
              <Stack
                mt="6"
                spacing="3"
                justifyContent="space-between"
                h="220px"
              >
                <Heading size="md">{pizza.flavor}</Heading>
                <Text fontSize="sm">{pizza.ingredients}</Text>

                <Text color="yellow.600" fontSize="2xl">
                  R${(order.sizePrice + pizza.price).toFixed(2)}
                </Text>

                <VStack spacing={0} alignItems="flex-start">
                  <Text fontSize="sm" fontWeight="bold">
                    Quantidade
                  </Text>
                  <InputGroup size="sm">
                    <Button onClick={() => handleDecrement(pizza.flavor)}>
                      -
                    </Button>
                    <Input
                      value={quantities[pizza.flavor] || 0}
                      w="50px"
                      readOnly
                      textAlign="center"
                    />
                    <Button onClick={() => handleIncrement(pizza.flavor)}>
                      +
                    </Button>
                  </InputGroup>
                </VStack>
              </Stack>
            </CardBody>

            <Divider />

            <CardFooter>
              <ButtonGroup spacing="2">
                <Button
                  variant="solid"
                  colorScheme="yellow"
                  onClick={() => handleSelect(pizza)}
                >
                  Adicionar ao carrinho
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </Wrap>
    </Stack>
  );
};

export default Flavors;
