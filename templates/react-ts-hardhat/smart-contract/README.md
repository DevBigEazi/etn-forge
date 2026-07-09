# Electroneum Smart Contract (Hardhat + TypeScript)

This directory contains the smart contract development workspace built with Hardhat and TypeScript, configured for the Electroneum Smart Chain.

## 🚀 Development Commands

Run these commands inside the `smart-contract/` directory:

- **`npx hardhat compile`**: Compile contracts
- **`npx hardhat test`**: Run contract unit tests
- **`npx hardhat node`**: Start a local Hardhat network node
- **`npx hardhat ignition deploy ./ignition/modules/Counter.ts --network electroneum-testnet`**: Deploy contract using Hardhat Ignition
- **`npx hardhat run scripts/Counter.s.ts --network electroneum-testnet`**: Deploy contract using scripts

## 📁 Folder Structure

- **`contracts/`**: Solidity contracts (includes `Counter.sol`).
- **`test/`**: Contract test files.
- **`scripts/`**: Traditional deploy scripts.
- **`ignition/`**: Hardhat Ignition deployment modules.

---

**Deployed Testnet Contract Address:** `0xc3bf59348B0359A407dfC0532f34F1eA3Ce92CCf`