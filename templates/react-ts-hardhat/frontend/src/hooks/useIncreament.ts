import { useWriteContract, useWaitForTransactionReceipt, useChainId } from "wagmi";
import countAbi from "../constants/ABIs/counter.json";
import { CONTRACTS } from "../constants/helpers";

export const useCounterIncrement = () => {
  const chainId = useChainId();
  const network = chainId ===  52014 ? "mainnet" : "testnet"; 
  const contractAddress = CONTRACTS[network];

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