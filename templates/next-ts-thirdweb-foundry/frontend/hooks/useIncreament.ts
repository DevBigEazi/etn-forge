import { useCallback, useMemo } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendAndConfirmTransaction } from "thirdweb/react";
import { useGetCounter } from "./useGetCount";

export const useCounterIncrement = () => {
  const { contract } = useGetCounter();
  
  const {
    mutate: sendAndConfirm,
    isPending,
    error,
    data: receipt,
  } = useSendAndConfirmTransaction();

  const isConfirmed = !!receipt;

  const increment = useCallback(() => {
    const transaction = prepareContractCall({
      contract,
      method: "function increment()",
      params: [],
    });
    sendAndConfirm(transaction);
  }, [contract, sendAndConfirm]);

  return useMemo(() => ({
    increment,
    isPending,
    isConfirming: false, // thirdweb combines sending & confirming, so isPending represents the process
    isConfirmed,
    error,
    receipt,
  }), [increment, isPending, isConfirmed, error, receipt]);
};
