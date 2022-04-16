use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::next_account_info, account_info::AccountInfo, entrypoint::ProgramResult, msg,
    program_error::ProgramError, pubkey::Pubkey,
};

use crate::instruction::{deserialize, Instruction};
use crate::state::counter::Counter;

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_info_iter = &mut accounts.iter();
    let counter_account = next_account_info(accounts_info_iter)?;

    if counter_account.owner != program_id {
        msg!("Account is not an owner");
        return Err(ProgramError::InvalidAccountData);
    }

    let mut counter = Counter::try_from_slice(&counter_account.data.borrow())?;

    match deserialize(instruction_data)? {
        Instruction::INCREMENT => {
            counter.inc();
        }
        Instruction::DECREMENT => {
            counter.dec();
        }
    }

    counter.serialize(&mut *counter_account.data.borrow_mut())?;

    Ok(())
}
