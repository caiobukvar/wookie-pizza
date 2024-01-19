"use client";
import { Badge, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/app/stores/store";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user.users[0]);

  return (
    <div className={styles.navbar}>
      <HStack w="100%" justifyContent="space-between">
        <Link href="/">
          <Image
            src="/wookie-logo.svg"
            alt="Wookie Pizza Logo"
            width={64}
            height={64}
            priority
          />
        </Link>
        <HStack textAlign="center" spacing={5}>
          <Text as="b" fontSize="sm" maxW={100}>
            Bem-vindo, {user.name}!
          </Text>
          <Badge variant="solid" colorScheme="yellow" p={3}>
            {user.points} pontos
          </Badge>
        </HStack>
      </HStack>
    </div>
  );
}
