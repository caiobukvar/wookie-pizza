"use client";
import { Button, HStack, VStack, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import MakeYourPizza from "../components/MakeYourPizza";
import OrderStepper from "../components/OrderStepper";
import Review from "../components/Review";
import { RootState, setActiveStep } from "../stores/store";
import styles from "./page.module.css";
import Navbar from "../components/Navbar";
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
  points: number;
}

export default function Order() {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.order);
  const activeStep = useSelector((state: RootState) => state.activeStep);

  const handleStepChange = (step: number) => {
    if (step >= 4) {
      return;
    }

    if (step === 2) {
      if (!order.flavors) {
        toast({
          title: "Adicione pelo menos uma pizza ao carrinho!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
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
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <OrderStepper />

        <VStack>
          {activeStep === 3 ? <Review /> : <MakeYourPizza />}

          {activeStep !== 3 && (
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
          )}
        </VStack>
      </div>
    </div>
  );
}
