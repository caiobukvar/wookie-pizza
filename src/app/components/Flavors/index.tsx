"use client";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import pizzaFlavors from "../../api/flavors.json";
import styles from "./page.module.css";
interface Pizza {
  name: string;
  ingredients: string;
  price: number;
  image: string;
  day: string;
  points: number;
}

const Flavors: React.FC = () => {
  const [flavors, setFlavors] = useState<Pizza[]>(pizzaFlavors);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const today = new Date()
    .toLocaleDateString("pt-BR", { weekday: "long" })
    .toLowerCase();

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

  const calculatePoints = (pizza: Pizza): number => {
    return pizza.day === today ? 1 : 0;
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

  const handleSelect = (pizza: Pizza) => {
    const points = calculatePoints(pizza);
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
                backgroundColor="#facb57e6"
                border=".5px solid #231f20"
                color="#231f20"
                alignItems="center"
                textAlign="center"
              >
                <Text>Pizza do dia! </Text>
                <Text>Ganhe {pizza.points} pontos!</Text>
              </Badge>
            )}
            <CardBody>
              <Image
                src={pizza.image}
                alt={`Pizza de ${pizza.name}`}
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
                <Heading size="md">{pizza.name}</Heading>
                <Text fontSize="sm">{pizza.ingredients}</Text>

                <Text color="blue.600" fontSize="2xl">
                  R${pizza.price}0
                </Text>

                <VStack spacing={0} alignItems="flex-start">
                  <Text fontSize="sm" fontWeight="bold">
                    Quantidade
                  </Text>
                  <InputGroup size="sm">
                    <Button onClick={() => handleDecrement(pizza.name)}>
                      -
                    </Button>
                    <Input
                      value={quantities[pizza.name] || 0}
                      w="50px"
                      readOnly
                      textAlign="center"
                    />
                    <Button onClick={() => handleIncrement(pizza.name)}>
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
                  colorScheme="blue"
                  onClick={() => handleSelect(pizza)}
                >
                  Selecionar
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
