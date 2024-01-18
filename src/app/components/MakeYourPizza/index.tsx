import { Pizza } from "@/app/order/page";
import { RootState } from "@/app/store";
import { HStack, Radio, Text, VStack, useRadioGroup } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Flavors from "../Flavors";
interface Translation {
  thin: string;
  medium: string;
  thick: string;
}

interface MakeYourPizzaProps {
  setPizza: (pizza: Pizza) => void;
  pizza: Pizza;
}

const MakeYourPizza: React.FC<MakeYourPizzaProps> = ({ setPizza, pizza }) => {
  const activeStep = useSelector((state: RootState) => state.activeStep);

  const options = ["thin", "medium", "thick"];

  const translation = {
    thin: "Massa fina",
    medium: "Massa média",
    thick: "Massa grossa",
  };

  const translate = (key: keyof Translation) => {
    return translation[key] || key;
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "massa",
    defaultValue: "thin",
    onChange: (value: string) =>
      setPizza({
        ...setPizza,
        dough: value,
        flavor: pizza.flavor,
        price: pizza.price,
      }),
  });

  const group = getRootProps();

  return (
    <div>
      {activeStep === 0 && (
        <>
          <HStack spacing={5} direction="column" {...group} my={5}>
            {options.map((value) => {
              const radio = getRadioProps({ value });
              return (
                <Radio key={value} {...radio}>
                  {translate(value as keyof Translation)}
                </Radio>
              );
            })}
          </HStack>
        </>
      )}

      {activeStep === 1 && (
        <VStack>
          <Text>Sabores</Text>
          <Flavors />
        </VStack>
      )}
    </div>
  );
};

export default MakeYourPizza;
