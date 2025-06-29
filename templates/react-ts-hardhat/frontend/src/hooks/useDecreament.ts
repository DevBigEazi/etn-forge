import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import countAbi from "../constants/ABIs/counter.json";
import { contractAddress } from "../constants/helpers";

export const useCounterDecrement = () => {
  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const decrement = () => {
    writeContract({
      address: contractAddress,
      abi: countAbi,
      functionName: "decrement",
    });
  };

  return {
    decrement,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};
