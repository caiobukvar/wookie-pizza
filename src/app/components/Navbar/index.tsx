import { HStack } from "@chakra-ui/react";
import styles from "./index.module.css";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <HStack w="100%" justifyContent="space-between">
        <Image
          src="/wookie-logo.svg"
          alt="Wookie Pizza Logo"
          width={64}
          height={64}
          priority
        />
        <div>pontos:</div>
      </HStack>
    </div>
  );
}
