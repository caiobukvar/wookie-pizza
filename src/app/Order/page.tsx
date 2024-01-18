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
import { useRouter } from "next/navigation";

export interface Pizza {
  dough: string;
  flavor: string;
  price: number;
}

export default function Order() {
  const router = useRouter();
  const dispatch = useDispatch();
  const activeStep = useSelector((state: RootState) => state.activeStep);
  const [pizza, setPizza] = useState<Pizza>({
    dough: "",
    flavor: "",
    price: 0,
  });

  const handleStepChange = (step: number) => {
    if (step >= 3) {
      return;
    }

    dispatch(setActiveStep(step));
  };

  const handleGoBack = () => {
    if (activeStep === 0) {
      router.push("/");
    } else {
      handleStepChange(activeStep - 1);
    }
  };

  return (
    <main className={styles.main}>
      <OrderStepper />

      <VStack>
        {activeStep === 2 ? (
          <Review />
        ) : (
          <MakeYourPizza setPizza={setPizza} pizza={pizza} />
        )}
        <HStack spacing={4} mt={4} alignSelf="center">
          {activeStep >= 0 && (
            <Button onClick={handleGoBack}>
              {activeStep === 0 ? "Cancelar" : "Voltar"}
            </Button>
          )}
          <Button onClick={() => handleStepChange(activeStep + 1)}>
            Próximo
          </Button>
        </HStack>
      </VStack>
    </main>
  );
}
