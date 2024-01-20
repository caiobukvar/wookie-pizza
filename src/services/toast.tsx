"use client";

import { useToast } from "@chakra-ui/react";

export function ShowToast(
  title: string,
  status: "info" | "warning" | "success" | "error" | "loading" | undefined
) {
  const toast = useToast();

  return toast({
    title: title,
    status: status,
    duration: 5000,
    isClosable: true,
  });
}
