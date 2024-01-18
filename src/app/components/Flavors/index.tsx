"use client";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
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
}

const Flavors: React.FC = () => {
  const [flavors, setFlavors] = useState<Pizza[]>(pizzaFlavors);

  console.log(flavors);

  return (
    <Stack spacing={4}>
      <Wrap spacing={4}>
        {flavors.map((pizza, index) => (
          <Card key={index} maxW="250px" size="sm" p={2}>
            <CardBody>
              <Image
                src={pizza.image}
                alt={`Pizza de ${pizza.name}`}
                width={250}
                height={250}
                className={styles.img}
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">{pizza.name}</Heading>
                <Text fontSize="sm">{pizza.ingredients}</Text>
                <Text color="blue.600" fontSize="2xl">
                  R${pizza.price}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="blue">
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
