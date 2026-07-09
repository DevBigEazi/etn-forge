import { useCallback, useMemo } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendAndConfirmTransaction } from "thirdweb/react";
import { useGetCounter } from "./useGetCount";

export const useCounterDecrement = () => {
  const { contract } = useGetCounter();
  
  const {
    mutate: sendAndConfirm,
    isPending,
    error,
    data: receipt,
  } = useSendAndConfirmTransaction();

  const isConfirmed = !!receipt;

  const decrement = useCallback(() => {
    const transaction = prepareContractCall({
      contract,
      method: "function decrement()",
      params: [],
    });
    sendAndConfirm(transaction);
  }, [contract, sendAndConfirm]);

  return useMemo(() => ({
    decrement,
    isPending,
    isConfirming: false,
    isConfirmed,
    error,
    receipt,
  }), [decrement, isPending, isConfirmed, error, receipt]);
};
