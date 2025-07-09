"use client";

import { useConnect } from 'wagmi';

export default function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <div className="grid grid-cols-1 gap-3">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          className="flex items-center space-x-3 w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
            {connector.name.toLowerCase().includes('walletconnect') ? (
              <img
                src="https://images.seeklogo.com/logo-png/43/1/walletconnect-logo-png_seeklogo-430923.png"
                alt="WalletConnect logo"
                className="w-8 h-8 rounded-lg"
              />
            ) : connector.icon ? (
              <img
                src={connector.icon}
                alt={`${connector.name} logo`}
                className="w-8 h-8 rounded-lg"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                  {connector.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {connector.name}
          </span>
        </button>
      ))}
    </div>
  );
}