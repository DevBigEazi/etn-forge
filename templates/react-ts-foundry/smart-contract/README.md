# Electroneum Smart Contract (Foundry)

This directory contains the smart contract development workspace built with Foundry, configured for the Electroneum Smart Chain.

## 🚀 Development Commands

Run these commands inside the `smart-contract/` directory:

- **`forge build`**: Compile contracts
- **`forge test`**: Run contract unit tests
- **`forge fmt`**: Format contract files
- **`forge snapshot`**: Generate gas snapshots
- **`anvil`**: Start a local Ethereum network node
- **`forge script script/Counter.s.sol:CounterScript --rpc-url <rpc_url> --private-key <private_key> --broadcast`**: Deploy contract

## 📁 Folder Structure

- **`src/`**: Solidity contracts (includes `Counter.sol`).
- **`test/`**: Contract test files.
- **`script/`**: Forge deploy scripts.
- **`lib/`**: Submodule libraries (like `forge-std`).

---

**Deployed Testnet Contract Address:** `0xc3bf59348B0359A407dfC0532f34F1eA3Ce92CCf`
