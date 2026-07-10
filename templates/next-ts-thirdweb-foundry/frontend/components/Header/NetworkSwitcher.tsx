"use client";

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

  const handleNetworkSwitch = async (
    chainDef: (typeof supportedNetworks)[number]
  ) => {
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
        className="network-switcher-btn"
        disabled={isSwitching}
      >
        <span
          className={`network-dot ${currentNetwork?.testnet ? "testnet" : "mainnet"}`}
        />
        <span className="network-label">
          {isSwitching
            ? "Switching..."
            : currentNetwork?.name || "Unknown Network"}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
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
          <div className="network-dropdown-header">Select Network</div>
          {supportedNetworks.map((network) => (
            <button
              key={network.chain.id}
              onClick={() => handleNetworkSwitch(network)}
              className={`network-option ${activeChain?.id === network.chain.id ? "active" : ""}`}
              disabled={isSwitching}
            >
              <span
                className={`network-dot ${network.testnet ? "testnet" : "mainnet"}`}
              />
              <span className="network-option-label">
                <span className="network-option-name">{network.name}</span>
                <span className="network-option-type">
                  {network.testnet ? "Testnet" : "Mainnet"}
                </span>
              </span>
              {activeChain?.id === network.chain.id && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginLeft: "auto", color: "#8B5CF6" }}
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
      )}

      <style>{`
        .network-switcher {
          position: relative;
          display: inline-block;
        }
        .network-switcher-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background: #fff;
          color: #111827;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .dark .network-switcher-btn {
          background: #1f2937;
          border-color: #374151;
          color: #f9fafb;
        }
        .network-switcher-btn:hover:not(:disabled) {
          background: #f3f4f6;
        }
        .dark .network-switcher-btn:hover:not(:disabled) {
          background: #374151;
        }
        .network-switcher-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .network-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
        }
        .network-dot.mainnet { background: #10b981; }
        .network-dot.testnet { background: #f59e0b; }
        .network-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 200px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          z-index: 50;
          overflow: hidden;
        }
        .dark .network-dropdown {
          background: #1f2937;
          border-color: #374151;
        }
        .network-dropdown-header {
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #e5e7eb;
        }
        .dark .network-dropdown-header {
          color: #9ca3af;
          border-color: #374151;
        }
        .network-option {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 14px;
          border: none;
          border-radius: 0;
          background: transparent;
          color: #111827;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .dark .network-option {
          color: #f9fafb;
        }
        .network-option:hover:not(:disabled) {
          background: #f3f4f6;
        }
        .dark .network-option:hover:not(:disabled) {
          background: #374151;
        }
        .network-option.active {
          background: #ede9fe;
        }
        .dark .network-option.active {
          background: #312e81;
        }
        .network-option:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .network-option-label {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .network-option-name {
          font-weight: 500;
        }
        .network-option-type {
          font-size: 11px;
          color: #6b7280;
        }
        .dark .network-option-type {
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default NetworkSwitcher;
