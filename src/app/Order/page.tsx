"use client";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setActiveStep } from "../store";
import OrderStepper from "../components/OrderStepper";
import MakeYourPizza from "../components/MakeYourPizza";
import Review from "../components/Review";
import styles from "./page.module.css";
import { useState } from "react";

export interface Pizza {
  dough: string;
  flavor: string;
  price: number;
}

export default function Order() {
  const dispatch = useDispatch();
  const activeStep = useSelector((state: RootState) => state.activeStep);
  const [pizza, setPizza] = useState<Pizza>({
    dough: "",
    flavor: "",
    price: 0,
  });

  const handleStepChange = (step: number) => {
    if (step < 0) {
      dispatch(setActiveStep(-1));
    }
    if (step >= 3) {
      return;
    }

    dispatch(setActiveStep(step));
  };

  return (
    <main className={styles.main}>
      {activeStep >= 0 ? (
        <>
          <OrderStepper />

          <VStack>
            {activeStep === 2 ? (
              <Review />
            ) : (
              <MakeYourPizza setPizza={setPizza} pizza={pizza} />
            )}
            <HStack spacing={4} mt={4} alignSelf="center">
              {activeStep >= 0 && (
                <Button onClick={() => handleStepChange(activeStep - 1)}>
                  Voltar
                </Button>
              )}
              <Button onClick={() => handleStepChange(activeStep + 1)}>
                Próximo
              </Button>
            </HStack>
          </VStack>
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

          <Button onClick={() => handleStepChange(0)}>
            Escolher minha pizza
          </Button>
        </>
      )}
    </main>
  );
}
