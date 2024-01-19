import { Order } from "@/app/order/page";
import { HStack, Radio, useRadioGroup } from "@chakra-ui/react";
import { useEffect } from "react";

interface PizzaSize {
  medium: string;
  big: string;
}

interface MakeYourPizzaProps {
  setOrder: (order: Order) => void;
  order: Order;
}

const SizeRadio: React.FC<MakeYourPizzaProps> = ({ setOrder, order }) => {
  const options = ["medium", "big"];

  const translation = {
    medium: "Pizza média",
    big: "Pizza grande",
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "massa",
    defaultValue: order.size || "medium",
    onChange: (value: string) =>
      setOrder({
        ...order,
        dough: order.dough,
        size: order.size === "" ? "medium" : value,
        flavor: order.flavor,
        price: value === "big" ? 15 : 0,
        amount: order.amount,
        points: order.points,
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
            <Radio key={value} {...radio} colorScheme="yellow">
              {translate(value as keyof PizzaSize)}
            </Radio>
          );
        })}
      </HStack>
    </div>
  );
};

export default SizeRadio;
