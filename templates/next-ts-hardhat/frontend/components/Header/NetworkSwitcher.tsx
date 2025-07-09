"use client";

import { supportedNetworks } from '@/config';
import * as React from 'react';
import { useAccount, useSwitchChain, useChainId } from 'wagmi';

const NetworkSwitcher = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isConnected } = useAccount();
  const { switchChain, isPending } = useSwitchChain();
  const chainId = useChainId();

  const currentNetwork = supportedNetworks.find(network => network.id === chainId);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleNetworkSwitch = (networkId: number) => {
    if (networkId !== chainId) {
      // Type assertion to fix type error: switchChain expects a specific union type
      switchChain({ chainId: networkId as Parameters<typeof switchChain>[0]['chainId'] });
    }
    closeDropdown();
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.network-switcher')) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  if (!isConnected) {
    return null;
  }

  return (
    <div className="relative network-switcher">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        disabled={isPending}
      >
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${currentNetwork?.testnet ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {currentNetwork?.name || 'Unknown Network'}
          </span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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
        <div className="absolute top-full mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Select Network
            </h4>
          </div>
          <div className="p-2">
            {supportedNetworks.map((network) => (
              <button
                key={network.id}
                onClick={() => handleNetworkSwitch(network.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                  chainId === network.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
                disabled={isPending}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${network.testnet ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {network.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {network.testnet ? 'Testnet' : 'Mainnet'}
                    </div>
                  </div>
                </div>
                {chainId === network.id && (
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-blue-600 dark:text-blue-400"
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