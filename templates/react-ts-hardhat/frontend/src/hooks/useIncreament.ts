import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import countAbi from "../constants/ABIs/counter.json";
import { contractAddress } from "../constants/helpers";

export const useCounterIncrement = () => {

  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const increment = () => {
    writeContract({
      address: contractAddress,
      abi: countAbi,
      functionName: "increment",
    });
  };

  return {
    increment,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};
