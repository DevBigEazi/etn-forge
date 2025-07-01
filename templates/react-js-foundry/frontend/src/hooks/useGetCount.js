import { useCallback, useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useBlockNumber, useReadContract, useChainId } from "wagmi";
import countAbi from "../constants/ABIs/counter.json";
import { CONTRACTS, parseSignedBigInt } from "../constants/helpers";

export const useGetCounter = () => {
  const queryClient = useQueryClient();
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

  // Memoize query key to prevent recreating it on every render
  const queryKey = useMemo(() => [
    "readContract",
    {
      address: contractAddress,
      functionName: "getCount",
      abi: countAbi,
    },
  ], [contractAddress]);

  // Memoize the invalidation callback
  const invalidateQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey });
    refetch();
  }, [queryClient, queryKey, refetch]);

  useEffect(() => {
    if (blockNumber) {
      invalidateQueries();
    }
  }, [blockNumber, invalidateQueries]);

  // Memoize count calculation to prevent unnecessary recalculations
  const count = useMemo(() => 
    typeof rawCount === "bigint" ? parseSignedBigInt(rawCount) : undefined,
    [rawCount]
  );

  // Memoize return object
  return useMemo(() => ({
    count,
    isLoading,
    error,
    refetch,
    network,
  }), [count, isLoading, error, refetch, network]);
};



