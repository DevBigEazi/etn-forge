"use client";

import { type BaseError } from "wagmi";
import { useCounterDecrement } from "../hooks/useDecreament";
import { useGetCounter } from "../hooks/useGetCount";
import { useCounterIncrement } from "../hooks/useIncreament";
import { useCounterReset } from "../hooks/useReset";

export default function Count() {
  // Read hook
  const { count, isLoading, error, refetch } = useGetCounter();
  
  // Write hooks
  const {
    increment,
    isPending: isIncrementPending,
    isConfirming: isIncrementConfirming,
    isConfirmed: isIncrementConfirmed,
    error: incrementError
  } = useCounterIncrement();
  
  const {
    decrement,
    isPending: isDecrementPending,
    isConfirming: isDecrementConfirming,
    isConfirmed: isDecrementConfirmed,
    error: decrementError
  } = useCounterDecrement();
  
  const {
    reset,
    isPending: isResetPending,
    isConfirming: isResetConfirming,
    isConfirmed: isResetConfirmed,
    error: resetError
  } = useCounterReset();

  // Check if any transaction is pending
  const isAnyPending = isIncrementPending || isDecrementPending || isResetPending;
  const isAnyConfirming = isIncrementConfirming || isDecrementConfirming || isResetConfirming;

  // Handle loading state
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Smart Contract Counter
          </h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 dark:text-gray-400 mt-4">Loading counter...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Smart Contract Counter
          </h2>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
            <p className="text-red-800 dark:text-red-200 font-medium">Error loading counter</p>
            <p className="text-red-600 dark:text-red-400 text-sm mt-1">
              {(error as unknown as BaseError).shortMessage || (error as Error).message}
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Smart Contract Counter
        </h2>
        
        <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-6">
          {count !== undefined ? count.toString() : "No data"}
        </div>

        {/* Transaction status */}
        {isAnyPending && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              Waiting for wallet confirmation...
            </p>
          </div>
        )}
        
        {isAnyConfirming && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              Transaction confirming...
            </p>
          </div>
        )}
        
        {(isIncrementConfirmed || isDecrementConfirmed || isResetConfirmed) && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4">
            <p className="text-green-800 dark:text-green-200 text-sm">
              Transaction confirmed!
            </p>
          </div>
        )}

        {/* Error messages */}
        {incrementError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
            <p className="text-red-800 dark:text-red-200 text-sm">
              Increment Error: {(incrementError as BaseError).shortMessage || (incrementError as Error).message}
            </p>
          </div>
        )}
        
        {decrementError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
            <p className="text-red-800 dark:text-red-200 text-sm">
              Decrement Error: {(decrementError as BaseError).shortMessage || (decrementError as Error).message}
            </p>
          </div>
        )}
        
        {resetError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
            <p className="text-red-800 dark:text-red-200 text-sm">
              Reset Error: {(resetError as BaseError).shortMessage || (resetError as Error).message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={decrement}
            disabled={isDecrementPending || isDecrementConfirming}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            {isDecrementPending ? 'Confirming...' : isDecrementConfirming ? 'Processing...' : 'Decrement'}
          </button>
          
          <button
            onClick={reset}
            disabled={isResetPending || isResetConfirming}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            {isResetPending ? 'Confirming...' : isResetConfirming ? 'Processing...' : 'Reset'}
          </button>
          
          <button
            onClick={increment}
            disabled={isIncrementPending || isIncrementConfirming}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            {isIncrementPending ? 'Confirming...' : isIncrementConfirming ? 'Processing...' : 'Increment'}
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Connect your wallet and interact with the smart contract
        </div>
      </div>
    </div>
  );
}