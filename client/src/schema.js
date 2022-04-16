class Instruction {
  instruction;

  constructor({ instruction }) {
    this.instruction = instruction;
  }
}

const InstructionSchema = new Map([
  [
    Instruction,
    {
      kind: "struct",
      fields: [["instruction", "u8"]],
    },
  ],
]);

class Counter {
  counter;

  constructor({ counter }) {
    this.counter = counter;
  }
}

const CounterSchema = new Map([
  [
    Counter,
    {
      kind: "struct",
      fields: [["counter", "u32"]],
    },
  ],
]);

export { Instruction, InstructionSchema, Counter, CounterSchema };
