import { Button, Heading, VStack } from "@chakra-ui/react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PiPizzaBold } from "react-icons/pi";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Wookie Pizza",
  description: "A melhor pizzaria da galáxia!",
};

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.scale__in__center}>
        <Image
          src="/wookie-logo.svg"
          alt="Wookie Pizza Logo"
          width={360}
          height={360}
          priority
        />
      </div>
      <Heading
        size="lg"
        color="#d69e2e"
        className={styles.tracking__in__expand__fwd}
        w="100%"
        textAlign="center"
      >
        Seja bem-vindo à melhor pizzaria da galáxia!
      </Heading>

      <Link href="/order" className={styles.scale__in__center}>
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
