# Solana Example

Simple Solana program with frontend that let users increment counter, state is stored on-chain.

## Development

```sh
# in program/
$ make
$ solana-test-validator
# In new terminal
$ solana program deploy -u localhost dist/program.so

# in client/
$ npm run dev
```

## Resources

- https://solanacookbook.com
- https://docs.solana.com
