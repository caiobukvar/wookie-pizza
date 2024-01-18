"use client";
import { Button, FormControl, HStack, Text } from "@chakra-ui/react";
import styles from "./page.module.css";
import OrderStepper from "../components/OrderStepper";
import { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setActiveStep } from "../store";

export default function Order() {
  const dispatch = useDispatch();
  const activeStep = useSelector((state: RootState) => state.activeStep);

  const handleStepChange = (step: number) => {
    if (step - 1 < 0) {
      return setChoice("");
    }

    if (step + 1 > 3) {
      return;
    }

    dispatch(setActiveStep(step));
  };

  const [choice, setChoice] = useState<string>("");

  return (
    <main className={styles.main}>
      {choice ? (
        <>
          <OrderStepper selectedOption={choice} />
          <div>
            <FormControl>Sabor 1</FormControl>
            <Button onClick={() => handleStepChange(activeStep - 1)}>
              Voltar
            </Button>
            <Button onClick={() => handleStepChange(activeStep + 1)}>
              Próximo
            </Button>
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
