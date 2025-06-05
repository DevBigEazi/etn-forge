import { HardhatUserConfig, vars} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const ANKR_API_KEY = vars.get("ANKR_API_KEY");

const config: HardhatUserConfig = {
  solidity: "0.8.26",
  networks: {
    electroneum: {
      url: `https://rpc.ankr.com/electroneum/${ANKR_API_KEY}`,
      accounts: vars.has("PRIVATE_KEY") ? [vars.get("PRIVATE_KEY")] : [],
    },
    'electroneum-testnet': {
      url: 'https://rpc.ankr.com/electroneum_testnet',
      accounts: vars.has("PRIVATE_KEY") ? [vars.get("PRIVATE_KEY")] : [],
    },
  },
  etherscan: {
    apiKey: {
      electroneum: "empty",
    },
    customChains: [
      {
        network: "electroneum",
        chainId: 52014,
        urls: {
          apiURL: "https://blockexplorer.electroneum.com/api",
          browserURL: "https://blockexplorer.electroneum.com",
        },
      },
      {
        network: "electroneum-testnet",
        chainId: 5201420,
        urls: {
          apiURL: "https://testnet-blockexplorer.electroneum.com/api",
          browserURL: "https://testnet-blockexplorer.electroneum.com"
        }
      }
    ],
  },
};

export default config;

