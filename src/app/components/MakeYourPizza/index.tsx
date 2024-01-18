import { Pizza } from "@/app/order/page";
import { RootState } from "@/app/store";
import { HStack, Radio, Text, VStack, useRadioGroup } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Flavors from "../Flavors";
import SizeRadio from "../SizeRadio";
import ThicknessRadio from "../ThicknessRadio";

interface MakeYourPizzaProps {
  setOrder: (order: Pizza) => void;
  order: Pizza;
}

const MakeYourPizza: React.FC<MakeYourPizzaProps> = ({ setOrder, order }) => {
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
          <Flavors />
        </VStack>
      )}
    </div>
  );
};

export default MakeYourPizza;
