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
  size: string;
  flavor: string;
  price: number;
  amount: number;
  points: number;
}

export default function Order() {
  const router = useRouter();
  const dispatch = useDispatch();
  const activeStep = useSelector((state: RootState) => state.activeStep);
  const [order, setOrder] = useState<Pizza>({
    dough: "",
    size: "",
    flavor: "",
    price: 0,
    amount: 0,
    points: 0,
  });

  console.log(order);

  const handleStepChange = (step: number) => {
    if (step >= 4) {
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
        {activeStep === 3 ? (
          <Review />
        ) : (
          <MakeYourPizza setOrder={setOrder} order={order} />
        )}
        <HStack spacing={4} mt={4} alignSelf="center">
          {activeStep >= 0 && (
            <Button
              onClick={handleGoBack}
              colorScheme="yellow"
              variant="outline"
            >
              {activeStep === 0 ? "Cancelar" : "Voltar"}
            </Button>
          )}
          <Button
            onClick={() => handleStepChange(activeStep + 1)}
            colorScheme="yellow"
            variant="outline"
          >
            Próximo
          </Button>
        </HStack>
      </VStack>
    </main>
  );
}
