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

interface OrderStepperProps {
  selectedOption: string;
}

const OrderStepper: React.FC<OrderStepperProps> = ({ selectedOption }) => {
  const activeStep = useSelector((state: RootState) => state.activeStep);
  console.log(activeStep);

  let steps;

  if (selectedOption === "manual") {
    steps = [
      { title: "First", description: "Monte sua pizza" },
      { title: "Second", description: "Date & Time" },
      { title: "Third", description: "Select Rooms" },
    ];
  } else {
    steps = [
      { title: "First", description: "Escolha uma recomendação" },
      { title: "Second", description: "Date & Time" },
      { title: "Third", description: "Select Rooms" },
    ];
  }

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
