# Electroneum DApp Frontend (Next.js)

This is the frontend of your Electroneum DApp, built with **Next.js 16**, **React 19**, and **Wagmi/Viem**.

## ⚙️ Environment Setup

Before starting, create a `.env` file in the root of the `frontend/` directory (or use your project root `.env`):

```env
# Required for connecting to the Electroneum RPC via Ankr
NEXT_PUBLIC_ANKR_API_KEY=your_ankr_api_key_here
```

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Folder Structure

- **`app/`**: Next.js App Router pages and layouts.
- **`components/`**: Pre-built UI components including wallet connect button.
- **`hooks/`**: Custom hooks for smart contract read/write interactions.
- **`constants/`**: Contract ABI and deployed addresses.
