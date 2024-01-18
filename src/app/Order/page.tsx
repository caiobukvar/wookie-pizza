"use client";
import { Button, FormControl, HStack, Text } from "@chakra-ui/react";
import styles from "./page.module.css";
import OrderStepper from "../components/OrderStepper";
import { useState } from "react";
import Image from "next/image";

export default function Order() {
  const [choice, setChoice] = useState<string>("");

  return (
    <main className={styles.main}>
      {choice ? (
        <>
          <OrderStepper selectedOption={choice} />
          <div>
            <FormControl>Sabor 1</FormControl>
            <Button onClick={() => setChoice("")}>Voltar</Button>
          </div>
        </>
      ) : (
        <>
          <Image
            src="/wookie-logo.svg"
            alt="Wookie Pizza Logo"
            width={360}
            height={360}
            priority
          />
          <HStack>
            <Button onClick={() => setChoice("manual")}>
              Montar minha pizza
            </Button>
            <Text>ou</Text>
            <Button onClick={() => setChoice("recommendation")}>
              Pedir uma recomendação
            </Button>
          </HStack>
        </>
      )}
    </main>
  );
}
