import { useState } from "react";
import {
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { getCounter, initializeAccount, sendTransaction } from "./lib";
import { Instruction, InstructionSchema } from "./schema";
import { serialize } from "borsh";

function App() {
  const [counter, setCounter] = useState(0);
  const [account, setAccount] = useState(null);
  const [trasacting, setTransacting] = useState(false);

  const connect = async () => {
    if (window.solana && window.solana.isPhantom) {
      const { publicKey } = await window.solana.connect();

      const [_, pubKey] = await initializeAccount(publicKey);
      getCounter(pubKey).then((c) => setCounter(c.counter));
      setAccount(pubKey);
    }
  };

  const increment = async () => {
    const instruction = new Instruction({
      instruction: 0,
    });
    const buffer = serialize(InstructionSchema, instruction);
    setTransacting(true);
    await sendTransaction(buffer, account).finally(() => setTransacting(false));

    setCounter((counter) => counter + 1);
  };

  const decrement = async () => {
    const instruction = new Instruction({
      instruction: 1,
    });
    const buffer = serialize(InstructionSchema, instruction);
    setTransacting(true);
    await sendTransaction(buffer, account).finally(() => setTransacting(false));

    setCounter((counter) => counter - 1);
  };

  return (
    <Container centerContent p={5}>
      <Text fontSize="sm" color="gray">
        Solana DApp
      </Text>
      <Heading>Counter</Heading>

      <Center flexDirection="column" m={5}>
        <Text fontSize="sm" color="gray">
          Counter
        </Text>
        <Text fontSize="6xl">{counter}</Text>
      </Center>

      <HStack gap={5}>
        <Button
          isLoading={trasacting}
          isDisabled={!account}
          onClick={increment}
          colorScheme="teal"
        >
          Increment
        </Button>
        <Button
          isLoading={trasacting}
          isDisabled={counter <= 0 || !account}
          onClick={decrement}
        >
          Decrement
        </Button>
        <Button hidden={account} colorScheme="purple" onClick={connect}>
          Connect with Phantom
        </Button>
      </HStack>

      <Center hidden={!account} flexDirection="column" m={5}>
        <Text fontSize="sm" color="gray">
          Address
        </Text>
        <Text fontSize="xl" isTruncated maxW="20ch">
          {account?.toString()}
        </Text>
      </Center>
    </Container>
  );
}

export default App;
