"use client";
import { HStack, Radio, useRadioGroup } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setOrder as setOrderAction } from "@/app/stores/orderSlice";
import { RootState } from "@/app/stores/store";
import { Order } from "@/app/types/types";

interface Thickness {
  thin: string;
  medium: string;
  thick: string;
}

const ThicknessRadio = () => {
  const dispatch = useDispatch();

  const order = useSelector((state: RootState) => state.order);

  const setOrder = (newOrder: Order) => {
    dispatch(setOrderAction(newOrder));
  };

  const setSizePrice = (sizePrice: number) => {
    dispatch(setOrderAction({ ...order, sizePrice }));
  };

  const options = ["thin", "medium", "thick"];

  const translation = {
    thin: "Massa fina",
    medium: "Massa média",
    thick: "Massa grossa",
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "massa",
    defaultValue: order.dough || "medium",
    onChange: (value: string) =>
      setOrder({
        ...order,
        dough: value,
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
