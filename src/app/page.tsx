import Image from "next/image";
import styles from "./page.module.css";
import { Button, Heading, Text } from "@chakra-ui/react";
import { PiPizzaBold } from "react-icons/pi";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <Image
          className={styles.logo}
          src="/wookie-logo.svg"
          alt="Wookie Pizza Logo"
          width={360}
          height={360}
          priority
        />
      </div>

      <Heading size="md">Seja bem-vindo à melhor pizzaria da galáxia!</Heading>

      <Link href="/order">
        <Button
          leftIcon={<PiPizzaBold size={20} />}
          colorScheme="yellow"
          size="lg"
          p={3}
        >
          Fazer um pedido
        </Button>
      </Link>
    </main>
  );
}
