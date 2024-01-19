"use client";
import { Button, HStack, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import MakeYourPizza from "../components/MakeYourPizza";
import OrderStepper from "../components/OrderStepper";
import Review from "../components/Review";
import styles from "./page.module.css";
import { RootState, setActiveStep } from "../stores/store";
import { setOrder as setOrderAction } from "@/app/stores/orderSlice";
export interface Flavor {
  flavor: string;
  price: number;
  amount: number;
  points: number;
}

export interface Order {
  flavors: Flavor[];
  dough: string;
  size: string;
  sizePrice: number;
  price: number;
  amount: number;
  points: number;
}

export default function Order() {
  const router = useRouter();
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.order);
  const activeStep = useSelector((state: RootState) => state.activeStep);
  const setOrder = (newOrder: Order) => {
    dispatch(setOrderAction(newOrder));
  };

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
        {activeStep === 3 ? <Review /> : <MakeYourPizza />}
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
