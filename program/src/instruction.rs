use borsh::BorshDeserialize;
use solana_program::program_error::ProgramError;

pub enum Instruction {
    INCREMENT,
    DECREMENT,
}

#[derive(BorshDeserialize)]
struct Payload {
    instruction: u8,
}

impl Instruction {
    fn unpack(payload: &Payload) -> Result<Self, ProgramError> {
        match payload.instruction {
            0 => Ok(Self::INCREMENT),
            1 => Ok(Self::DECREMENT),
            _ => Err(ProgramError::InvalidInstructionData),
        }
    }
}

pub fn deserialize(instruction_data: &[u8]) -> Result<Instruction, ProgramError> {
    let payload = Payload::try_from_slice(instruction_data)?;

    Ok(Instruction::unpack(&payload)?)
}
