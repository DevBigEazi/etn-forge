// hooks/useCounterReset.ts
import { useWriteContract, useWaitForTransactionReceipt, useChainId } from "wagmi";
import countAbi from "../constants/ABIs/counter.json";
import { CONTRACTS } from "../constants/helpers";

export const useCounterReset = () => {
  const chainId = useChainId();
  const network = chainId === 52014 ? "mainnet" : "testnet"; 
  const contractAddress = CONTRACTS[network];

  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const reset = () => {
    writeContract({
      address: contractAddress,
      abi: countAbi,
      functionName: "reset",
    });
  };

  return {
    reset,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};