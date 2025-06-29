import { http, createConfig, fallback } from 'wagmi';
import { electroneum, electroneumTestnet } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';

declare module 'wagmi' {
    interface Register {
      config: typeof config
    }
}

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

export const supportedNetworks = [electroneum, electroneumTestnet] as const;

// Primary and fallback RPC URLs
const MAINNET_PRIMARY_RPC = 'https://rpc.ankr.com/electroneum';
const MAINNET_FALLBACK_RPC = 'https://rpc.electroneum.com';
const TESTNET_PRIMARY_RPC = 'https://rpc.ankr.com/electroneum_testnet';
const TESTNET_FALLBACK_RPC = 'https://rpc.ankr.com/electroneum_testnet';

export const config = createConfig({
  chains: supportedNetworks,
  connectors: [
    walletConnect({ projectId }),
  ],
  transports: {
    [electroneum.id]: fallback([
      http(MAINNET_PRIMARY_RPC),
      http(MAINNET_FALLBACK_RPC),
    ]),
    [electroneumTestnet.id]: fallback([
      http(TESTNET_PRIMARY_RPC),
      http(TESTNET_FALLBACK_RPC),
    ]),
  },
});