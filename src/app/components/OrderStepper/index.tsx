import {
  Stack,
  Step,
  Stepper,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Text,
  useSteps,
} from "@chakra-ui/react";
interface OrderStepperProps {
  selectedOption: string;
}

const OrderStepper: React.FC<OrderStepperProps> = ({ selectedOption }) => {
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

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

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
