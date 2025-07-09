"use client";

import * as React from "react";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import WalletOptions from "@/components/Header/WalletOptions";
import NetworkSwitcher from "@/components/Header/NetworkSwitcher";
import { shortenAddress } from "@/constants/helpers";

const WalletOptionsModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModalOnOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setIsOpen(false);
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-3">
        <NetworkSwitcher />
        
        <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
          {ensAvatar ? (
            <img 
              alt="ENS Avatar" 
              src={ensAvatar} 
              className="w-6 h-6 rounded-full"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              {address?.slice(2, 4).toUpperCase()}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {ensName || (address ? shortenAddress(address) : '')}
            </span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Connected</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleDisconnect}
          className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleModal}
        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        <span>Connect Wallet</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModalOnOverlay}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Connect a wallet
              </h3>
              <button
                onClick={toggleModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-500 dark:text-gray-400"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                By connecting a wallet, you agree to our Terms of Service and
                Privacy Policy.
              </p>
              
              <WalletOptions />
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  New to Ethereum wallets?
                </p>
                <a
                  href="https://ethereum.org/en/wallets/"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletOptionsModal;