import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@chakra-ui/react";
import { PiPizzaBold } from "react-icons/pi";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/wookie-logo.svg"
          alt="Wookie Pizza Logo"
          width={360}
          height={360}
          priority
        />
      </div>
      <Button
        leftIcon={<PiPizzaBold />}
        colorScheme="blue"
        size="lg"
        p={5}
        borderRadius={7}
      >
        Começar
      </Button>
    </main>
  );
}
