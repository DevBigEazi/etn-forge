import { useCallback, useMemo } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendAndConfirmTransaction } from "thirdweb/react";
import { useGetCounter } from "./useGetCount";

export const useCounterReset = () => {
  const { contract } = useGetCounter();
  
  const {
    mutate: sendAndConfirm,
    isPending,
    error,
    data: receipt,
  } = useSendAndConfirmTransaction();

  const isConfirmed = !!receipt;

  const reset = useCallback(() => {
    const transaction = prepareContractCall({
      contract,
      method: "function reset()",
      params: [],
    });
    sendAndConfirm(transaction);
  }, [contract, sendAndConfirm]);

  return useMemo(() => ({
    reset,
    isPending,
    isConfirming: false,
    isConfirmed,
    error,
    receipt,
  }), [reset, isPending, isConfirmed, error, receipt]);
};
