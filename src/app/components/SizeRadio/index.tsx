"use client";
import { HStack, Radio, useRadioGroup } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrder as setOrderAction } from "@/app/stores/orderSlice";
import { RootState } from "@/app/stores/store";
import { Order } from "@/types/types";

interface PizzaSize {
  medium: string;
  big: string;
}

const SizeRadio = () => {
  const dispatch = useDispatch();

  const order = useSelector((state: RootState) => state.order);

  const setOrder = (newOrder: Order) => {
    dispatch(setOrderAction(newOrder));
  };

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
        size: value === "big" ? value : "medium",
        sizePrice: value === "big" ? 15 : 0,
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
