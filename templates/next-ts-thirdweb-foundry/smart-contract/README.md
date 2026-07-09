# Foundry + thirdweb Smart Contract Development

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

This contract repository is pre-configured to build, test, and deploy smart contracts on the Electroneum Smart Chain using either Foundry tools or **thirdweb CLI**.

### thirdweb Deployment (Recommended)

thirdweb provides a secure, private-key-free contract deployment flow. Compiling and deploying is simple:

```shell
# Deploy your contract using thirdweb CLI
npx thirdweb deploy
```

This compiles your contracts and opens a web browser link to configure and deploy the contract directly onto the Electroneum Mainnet or Testnet through the thirdweb Dashboard.

---

### Foundry Tools Documentation

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Foundry Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Foundry Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

---

**Deployed Testnet Contract Address:** `0xc3bf59348B0359A407dfC0532f34F1eA3Ce92CCf`
