"use client";
import { RootState } from "@/app/stores/store";
import { Badge, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "./index.module.css";

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
