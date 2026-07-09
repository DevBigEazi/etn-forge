# Electroneum DApp Monorepo (Next.js + TS + thirdweb + Foundry)

Welcome to your Electroneum DApp monorepo! This project is pre-configured with a Next.js TypeScript frontend and a thirdweb + Foundry smart contract development environment.

## 📁 Project Structure

- **`frontend/`**: Web application (Next.js + TS + thirdweb SDK v5 + Tailwind CSS v4)
- **`smart-contract/`**: Foundry workspace for contract development and thirdweb CLI deployment

## 🚀 Workspace Commands

Run these commands from the root directory:

- **`npm run dev`**: Start the frontend development server
- **`npm run build`**: Build the frontend for production
- **`npm run start`**: Start the production server for the frontend
- **`npm run compile`**: Compile smart contracts (Forge build)
- **`npm run test`**: Run smart contract tests (Forge test)

## ⚙️ Prerequisites

Before you start, ensure you have:
1. **Node.js** (v18 or higher)
2. **Foundry** (ensure `forge`, `cast`, and `anvil` are installed)
3. **Ankr API Key** (set in your environment variables for RPC access)
4. **thirdweb Client ID** (obtain from thirdweb.com/dashboard)
