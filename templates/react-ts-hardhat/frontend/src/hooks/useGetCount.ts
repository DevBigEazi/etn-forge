import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useBlockNumber, useReadContract } from "wagmi";
import countAbi from "../constants/ABIs/counter.json";
import { contractAddress } from "../constants/helpers";

export const useGetCounter = () => {
  const queryClient = useQueryClient();

  const {
    data: count,
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
  }, [blockNumber, queryClient, refetch]);

  return {
    count,
    isLoading,
    error,
    refetch,
  };
};
