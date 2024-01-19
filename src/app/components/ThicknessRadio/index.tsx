import { Order } from "@/app/order/page";
import { HStack, Radio, useRadioGroup } from "@chakra-ui/react";

interface Thickness {
  thin: string;
  medium: string;
  thick: string;
}

interface MakeYourPizzaProps {
  setOrder: (order: Order) => void;
  order: Order;
}

const ThicknessRadio: React.FC<MakeYourPizzaProps> = ({ setOrder, order }) => {
  const options = ["thin", "medium", "thick"];

  const translation = {
    thin: "Massa fina",
    medium: "Massa média",
    thick: "Massa grossa",
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "massa",
    defaultValue: "medium",
    onChange: (value: string) =>
      setOrder({
        ...order,
        dough: value === "medium" ? "medium" : value,
        size: order.size,
        flavor: order.flavor,
        price: order.price,
        amount: order.amount,
        points: order.points,
      }),
  });

  console.log(order);

  const translate = (key: keyof Thickness) => {
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
              {translate(value as keyof Thickness)}
            </Radio>
          );
        })}
      </HStack>
    </div>
  );
};

export default ThicknessRadio;
