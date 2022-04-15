# Solana Example

Simple Solana program with frontend that let users increment counter, state is stored on-chain.

## Development

```sh
# in program/
$ make
$ solana-test-validator
$ solana program deploy -k program_keypair.json -u localhost dist/program.so

# in client/
$ npm run dev
```

## Resources

- https://solanacookbook.com
- https://docs.solana.com
