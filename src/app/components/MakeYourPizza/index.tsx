"use client";
import { RootState } from "@/app/stores/store";
import { HStack, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Flavors from "../Flavors";
import SizeRadio from "../SizeRadio";
import ThicknessRadio from "../ThicknessRadio";

const MakeYourPizza = () => {
  const activeStep = useSelector((state: RootState) => state.activeStep);

  return (
    <div>
      {activeStep === 0 && (
        <>
          <HStack>
            <ThicknessRadio />
          </HStack>
        </>
      )}

      {activeStep === 1 && (
        <VStack>
          <SizeRadio />
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
