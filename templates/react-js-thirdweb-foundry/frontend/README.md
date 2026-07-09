## Electroneum DApp Frontend (React + Vite)

This is the frontend of your Electroneum DApp, built with **React 19**, **Vite**, and **thirdweb SDK v5**.

### Environment Setup

Before starting, create a `.env` file in the root of the `frontend/` directory (or use your project root `.env`):

```env
# Required for thirdweb client initialization (get it from thirdweb.com/dashboard)
VITE_THIRDWEB_CLIENT_ID=your_thirdweb_client_id_here
```

### Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

### Folder Structure

- `src/`: Source files containing components, hooks, and views.
- `src/components/`: UI components (including the header with thirdweb `ConnectButton` and the `Count` dashboard).
- `src/hooks/`: Custom thirdweb React hooks for contract interaction.
- `src/lib/`: thirdweb client configuration.
- `src/constants/`: ABI files and deployed contract addresses.
