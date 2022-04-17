import {
    clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { deserialize } from "borsh";
import { Counter, CounterSchema } from "./schema";

const SEED = "counter";
const PROGRAM_ID = new PublicKey(
  "8PTS2473xFhTwppTtr6gnRjozX9WGgM6tvkTrih6kY5J"
);
const connection = new Connection(clusterApiUrl("devnet"));

export async function initializeAccount(pubKey) {
  const counterKey = await PublicKey.createWithSeed(pubKey, SEED, PROGRAM_ID);
  let account = await connection.getAccountInfo(counterKey);

  if (!account) {
    const transaction = new Transaction({
      feePayer: pubKey,
      recentBlockhash: (await connection.getLatestBlockhash("finalized"))
        .blockhash,
    });

    const instruction = SystemProgram.createAccountWithSeed({
      basePubkey: pubKey,
      fromPubkey: pubKey,
      lamports: LAMPORTS_PER_SOL * 0.00091872,
      programId: PROGRAM_ID,
      seed: SEED,
      space: 4,
      newAccountPubkey: counterKey,
    });

    transaction.add(instruction);
    const { signature } = await window.solana.signAndSendTransaction(
      transaction
    );
    await connection.confirmTransaction(signature);
    account = await connection.getAccountInfo(counterKey);
  }

  return [account, counterKey];
}

export async function getCounter(pubKey) {
  const { data } = await connection.getAccountInfo(pubKey);
  return deserialize(CounterSchema, Counter, data);
}

export async function sendTransaction(instruction, pubKey) {
  const transaction = new Transaction({
    feePayer: window.solana.publicKey,
    recentBlockhash: (await connection.getLatestBlockhash("finalized"))
      .blockhash,
  });

  transaction.add(
    new TransactionInstruction({
      keys: [{ pubkey: pubKey, isSigner: false, isWritable: true }],
      programId: PROGRAM_ID,
      data: instruction,
    })
  );

  const { signature } = await window.solana.signAndSendTransaction(transaction);
  await connection.confirmTransaction(signature);
}
