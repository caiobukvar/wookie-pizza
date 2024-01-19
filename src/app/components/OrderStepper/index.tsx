import { RootState } from "@/app/stores/store";
import {
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Stepper,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const OrderStepper = () => {
  const activeStep = useSelector((state: RootState) => state.activeStep);

  const steps = [
    { title: "First", description: "Escolha a massa" },
    { title: "Second", description: "Escolha o tamanho" },
    { title: "Third", description: "Escolha o sabor" },
    { title: "Fourth", description: "Resumo do pedido" },
  ];

  const activeStepText = steps[activeStep].description;

  return (
    <Stack w="100%">
      <Stepper size="sm" colorScheme="yellow" index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete={<StepIcon color="black" />} />
            </StepIndicator>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Text>
        Passo 0{activeStep + 1}: <b>{activeStepText}</b>
      </Text>
    </Stack>
  );
};

export default OrderStepper;
