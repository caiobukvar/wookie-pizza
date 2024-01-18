import { Pizza } from "@/app/order/page";
import { RootState } from "@/app/store";
import { HStack, Radio, Text, VStack, useRadioGroup } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Flavors from "../Flavors";
import SizeRadio from "../SizeRadio";
interface Thickness {
  thin: string;
  medium: string;
  thick: string;
}

interface MakeYourPizzaProps {
  setOrder: (order: Pizza) => void;
  order: Pizza;
}

const MakeYourPizza: React.FC<MakeYourPizzaProps> = ({ setOrder, order }) => {
  const activeStep = useSelector((state: RootState) => state.activeStep);

  const options = ["thin", "medium", "thick"];

  const translation = {
    thin: "Massa fina",
    medium: "Massa média",
    thick: "Massa grossa",
  };

  const translate = (key: keyof Thickness) => {
    return translation[key] || key;
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "massa",
    defaultValue: "thin",
    onChange: (value: string) =>
      setOrder({
        ...setOrder,
        dough: value,
        size: order.size,
        flavor: order.flavor,
        price: order.price,
        amount: order.amount,
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
                  {translate(value as keyof Thickness)}
                </Radio>
              );
            })}
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
