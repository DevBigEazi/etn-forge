
import { useCallback, useMemo } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useChainId } from "wagmi";
import countAbi from "../constants/ABIs/counter.json";
import { CONTRACTS } from "../constants/helpers";

export const useCounterReset = () => {
  const chainId = useChainId();
  
  // Memoize network calculation
  const network = useMemo(() => 
    chainId === 52014 ? "mainnet" : "testnet", 
    [chainId]
  );
  
  // Memoize contract address
  const contractAddress = useMemo(() => 
    CONTRACTS[network], 
    [network]
  );

  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Memoize the reset function
  const reset = useCallback(() => {
    writeContract({
      address: contractAddress,
      abi: countAbi,
      functionName: "reset",
    });
  }, [writeContract, contractAddress]);

  // Memoize return object
  return useMemo(() => ({
    reset,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  }), [reset, isPending, isConfirming, isConfirmed, error, hash]);
};