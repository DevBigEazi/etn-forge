# Electroneum DApp Frontend (React + Vite)

This is the frontend of your Electroneum DApp, built with **React 19**, **Vite**, and **Wagmi/Viem**.

## ⚙️ Environment Setup

Before starting, create a `.env` file in the root of the `frontend/` directory (or use your project root `.env`):

```env
# Required for connecting to the Electroneum RPC via Ankr
VITE_ANKR_API_KEY=your_ankr_api_key_here
```

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## 📁 Folder Structure

- **`src/`**: Source files containing components, hooks, and views.
- **`src/components/`**: Pre-built UI components including wallet connect button.
- **`src/hooks/`**: Custom hooks for smart contract read/write interactions.
- **`src/constants/`**: Contract ABI and deployed addresses.
