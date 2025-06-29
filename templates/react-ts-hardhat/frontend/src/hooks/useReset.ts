import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import countAbi from "../constants/ABIs/counter.json";
import { contractAddress } from "../constants/helpers";

export const useCounterReset = () => {
  
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
