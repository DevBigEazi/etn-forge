import * as React from "react";
import { defineChain } from "thirdweb";
import {
  useActiveWalletChain,
  useSwitchActiveWalletChain,
  useActiveAccount,
} from "thirdweb/react";

const electroneum = defineChain(52014);
const electroneumTestnet = defineChain(5201420);

const supportedNetworks = [
  { chain: electroneum, name: "Electroneum", testnet: false },
  { chain: electroneumTestnet, name: "Electroneum Testnet", testnet: true },
];

const NetworkSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const [isSwitching, setIsSwitching] = React.useState(false);

  const currentNetwork = supportedNetworks.find(
    (n) => n.chain.id === activeChain?.id
  );

  const handleNetworkSwitch = async (chainDef: (typeof supportedNetworks)[number]) => {
    if (chainDef.chain.id === activeChain?.id) {
      setIsOpen(false);
      return;
    }
    try {
      setIsSwitching(true);
      await switchChain(chainDef.chain);
    } catch (err) {
      console.error("Failed to switch network:", err);
    } finally {
      setIsSwitching(false);
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".network-switcher")) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  if (!account) return null;

  return (
    <div className="network-switcher">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="network-switcher-button"
        disabled={isSwitching}
      >
        <div className="network-info">
          <div
            className={`network-indicator ${currentNetwork?.testnet ? "testnet" : "mainnet"}`}
          />
          <span className="network-name">
            {isSwitching ? "Switching..." : currentNetwork?.name || "Unknown Network"}
          </span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`dropdown-arrow ${isOpen ? "rotated" : ""}`}
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="network-dropdown">
          <div className="network-dropdown-header">
            <h4>Select Network</h4>
          </div>
          <div className="network-options">
            {supportedNetworks.map((network) => (
              <button
                key={network.chain.id}
                onClick={() => handleNetworkSwitch(network)}
                className={`network-option ${activeChain?.id === network.chain.id ? "active" : ""}`}
                disabled={isSwitching}
              >
                <div className="network-option-info">
                  <div
                    className={`network-indicator ${network.testnet ? "testnet" : "mainnet"}`}
                  />
                  <div className="network-details">
                    <span className="network-name">{network.name}</span>
                    <span className="network-type">
                      {network.testnet ? "Testnet" : "Mainnet"}
                    </span>
                  </div>
                </div>
                {activeChain?.id === network.chain.id && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkSwitcher;
