import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@chakra-ui/react";
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

      <Link href="/order">
        <Button
          leftIcon={<PiPizzaBold size={20} />}
          backgroundColor="#96b613"
          _hover={{ backgroundColor: "#96b613b3" }}
          color="#231f20"
          size="lg"
          p={3}
        >
          Começar
        </Button>
      </Link>
    </main>
  );
}
