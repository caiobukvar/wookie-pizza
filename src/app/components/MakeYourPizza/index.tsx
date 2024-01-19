"use client";
import { Order } from "@/app/order/page";
import { RootState } from "@/app/store";
import { HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import pizzaFlavors from "../../api/flavors.json";
import Flavors from "../Flavors";
import SizeRadio from "../SizeRadio";
import ThicknessRadio from "../ThicknessRadio";

export interface MakeYourPizzaProps {
  order: Order;
  setOrder: (order: Order) => void;
}

const MakeYourPizza: React.FC<MakeYourPizzaProps> = ({ setOrder, order }) => {
  const [flavors, setFlavors] = useState<Order[]>(pizzaFlavors);
  const activeStep = useSelector((state: RootState) => state.activeStep);

  return (
    <div>
      {activeStep === 0 && (
        <>
          <HStack>
            <ThicknessRadio setOrder={setOrder} order={order} />
          </HStack>
        </>
      )}

      {activeStep === 1 && (
        <VStack>
          <SizeRadio setOrder={setOrder} order={order} />
        </VStack>
      )}

      {activeStep === 2 && (
        <VStack>
          <Flavors setOrder={setOrder} order={order} />
        </VStack>
      )}
    </div>
  );
};

export default MakeYourPizza;
