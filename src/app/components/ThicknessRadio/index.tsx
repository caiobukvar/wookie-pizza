import { Pizza } from "@/app/order/page";
import { HStack, Radio, useRadioGroup } from "@chakra-ui/react";

interface Thickness {
  thin: string;
  medium: string;
  thick: string;
}

interface MakeYourPizzaProps {
  setOrder: (order: Pizza) => void;
  order: Pizza;
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
        ...setOrder,
        dough: order.dough,
        size: value,
        flavor: order.flavor,
        price: order.price,
        amount: order.amount,
        points: order.points,
      }),
  });

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
