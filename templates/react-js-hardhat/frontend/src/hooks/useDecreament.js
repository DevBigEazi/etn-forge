import { useCallback, useMemo } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useChainId } from "wagmi";
import countAbi from "../constants/ABIs/counter.json";
import { CONTRACTS } from "../constants/helpers";

export const useCounterDecrement = () => {
  const chainId = useChainId();
  
  // Memoize network calculation to prevent unnecessary recalculations
  const network = useMemo(() => 
    chainId === 52014 ? "mainnet" : "testnet", 
    [chainId]
  );
  
  // Memoize contract address to prevent unnecessary recalculations
  const contractAddress = useMemo(() => 
    CONTRACTS[network], 
    [network]
  );

  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Memoize the decrement function to prevent unnecessary re-renders
  const decrement = useCallback(() => {
    writeContract({
      address: contractAddress,
      abi: countAbi,
      functionName: "decrement",
    });
  }, [writeContract, contractAddress]);

  // Memoize return object to prevent unnecessary re-renders
  return useMemo(() => ({
    decrement,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  }), [decrement, isPending, isConfirming, isConfirmed, error, hash]);
};