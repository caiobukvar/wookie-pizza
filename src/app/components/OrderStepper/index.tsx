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
import { useDispatch, useSelector } from "react-redux";
import { setActiveStep, RootState } from "../../store";

const OrderStepper = () => {
  const activeStep = useSelector((state: RootState) => state.activeStep);

  const steps = [
    { title: "First", description: "Escolha a massa" },
    { title: "Second", description: "Escolha o sabor" },
    { title: "Third", description: "Resumo do pedido" },
  ];

  const activeStepText = steps[activeStep].description;

  return (
    <Stack w="100%">
      <Stepper size="sm" index={activeStep} gap="0">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete={<StepIcon />} />
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
