import { Pizza } from "@/app/order/page";
import { HStack, Radio, useRadioGroup } from "@chakra-ui/react";

interface PizzaSize {
  medium: string;
  big: string;
}

interface MakeYourPizzaProps {
  setOrder: (order: Pizza) => void;
  order: Pizza;
}

const SizeRadio: React.FC<MakeYourPizzaProps> = ({ setOrder, order }) => {
  const options = ["medium", "big"];

  const translation = {
    medium: "Pizza média",
    big: "Pizza grande",
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "massa",
    defaultValue: "medium",
    onChange: (value: string) =>
      setOrder({
        ...setOrder,
        dough: order.dough,
        size: value,
        flavor: order.flavor,
        price: order.price,
        amount: order.amount,
      }),
  });

  const translate = (key: keyof PizzaSize) => {
    return translation[key] || key;
  };

  const group = getRootProps();

  return (
    <div>
      <HStack spacing={5} direction="column" {...group} my={5}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <Radio key={value} {...radio}>
              {translate(value as keyof PizzaSize)}
            </Radio>
          );
        })}
      </HStack>
    </div>
  );
};

export default SizeRadio;
