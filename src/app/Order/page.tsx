"use client";
import { Button, FormControl, HStack, Text } from "@chakra-ui/react";
import styles from "./page.module.css";
import OrderStepper from "../components/OrderStepper";

export default function Order() {
  return (
    <main className={styles.main}>
      <OrderStepper />
      
      <HStack>
        <Button>Montar minha pizza</Button>
        <Text>ou</Text>
        <Button>Pedir uma recomendação</Button>
      </HStack>

      <div>
        <FormControl>Sabor 1</FormControl>
      </div>
    </main>
  );
}
