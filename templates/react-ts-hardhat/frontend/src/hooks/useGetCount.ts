import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useBlockNumber, useReadContract, useChainId } from "wagmi";
import countAbi from "../constants/ABIs/counter.json";
import { CONTRACTS, parseSignedBigInt } from "../constants/helpers";

export const useGetCounter = () => {
  const queryClient = useQueryClient();
  const chainId = useChainId();

  // Determine network type based on chain ID
  const network = chainId === 52014 ? "mainnet" : "testnet"; // Adjust chain IDs as needed
  const contractAddress = CONTRACTS[network];

  const {
    data: rawCount,
    refetch,
    isLoading,
    error,
  } = useReadContract({
    abi: countAbi,
    address: contractAddress,
    functionName: "getCount",
  });

  const { data: blockNumber } = useBlockNumber({ watch: true });

  useEffect(() => {
    if (blockNumber) {
      queryClient.invalidateQueries({
        queryKey: [
          "readContract",
          {
            address: contractAddress,
            functionName: "getCount",
            abi: countAbi,
          },
        ],
      });
      refetch();
    }
  }, [blockNumber, queryClient, refetch, contractAddress]);

  // Properly handle negative numbers
  const count = typeof rawCount === "bigint" ? parseSignedBigInt(rawCount) : undefined;

  return {
    count,
    isLoading,
    error,
    refetch,
    network, // Optional: return network info if needed
  };
};