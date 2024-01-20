"use client";
import { RootState } from "@/app/stores/store";
import { Badge, HStack, Icon, Text, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "./index.module.css";

export default function Navbar() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  console.log(currentUser);

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
          <Tooltip
            hasArrow
            label={`Bora pedir uma pizza${
              currentUser?.name ? `, ${currentUser?.name}` : ``
            }?`}
            fontSize="xs"
            placement="left"
            isOpen
            color="#231f20"
            fontWeight="bold"
            backgroundColor={"#d69e2e"}
            p={3}
          >
            <Image
              src="/chewbacca.svg"
              alt="Chewbacca Helper"
              width={32}
              height={32}
            />
          </Tooltip>
          <Badge variant="solid" colorScheme="yellow" color="#231f20" p={3}>
            {currentUser?.points} pontos
          </Badge>
        </HStack>
      </HStack>
    </div>
  );
}
