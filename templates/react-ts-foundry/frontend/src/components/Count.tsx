import { type BaseError } from "wagmi";
import { 
  useCounterDecrement
} from "../hooks/useDecreament";
import { useGetCounter } from "../hooks/useGetCount";
import { useCounterIncrement } from "../hooks/useIncreament";
import { useCounterReset } from "../hooks/useReset";

const Count = () => {
  // Read hook
  const { count, isLoading, error, refetch } = useGetCounter();
  
  // Write hooks
  const { 
    increment, 
    isPending: isIncrementPending, 
    isConfirming: isIncrementConfirming,
    isConfirmed: isIncrementConfirmed,
    error: incrementError 
  } = useCounterIncrement();
  
  const { 
    decrement, 
    isPending: isDecrementPending, 
    isConfirming: isDecrementConfirming,
    isConfirmed: isDecrementConfirmed,
    error: decrementError 
  } = useCounterDecrement();
  
  const { 
    reset, 
    isPending: isResetPending, 
    isConfirming: isResetConfirming,
    isConfirmed: isResetConfirmed,
    error: resetError 
  } = useCounterReset();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="count">
        <h3>Current count</h3>
        <h4>Loading...</h4>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="count">
        <h3>Current count</h3>
        <p className="total-count">Error loading count</p>
        <p style={{ color: 'red' }}>
          {(error).shortMessage || error.message}
        </p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  // Check if any transaction is pending
  const isAnyPending = isIncrementPending || isDecrementPending || isResetPending;
  const isAnyConfirming = isIncrementConfirming || isDecrementConfirming || isResetConfirming;

  return (
    <section className="count">
      <h3>Current count</h3>
      <p className="total-count">
        <p className="total-count">
  {count !== undefined ? count : "No data"}
</p>
      </p>
      
      {/* Transaction status */}
      {isAnyPending && <p>Waiting for wallet confirmation...</p>}
      {isAnyConfirming && <p>Transaction confirming...</p>}
      {(isIncrementConfirmed || isDecrementConfirmed || isResetConfirmed) && (
        <p style={{ color: 'green' }}>Transaction confirmed!</p>
      )}
      
      {/* Error messages */}
      {incrementError && (
        <p style={{ color: 'red' }}>
          Increment Error: {(incrementError as BaseError).shortMessage || incrementError.message}
        </p>
      )}
      {decrementError && (
        <p style={{ color: 'red' }}>
          Decrement Error: {(decrementError as BaseError).shortMessage || decrementError.message}
        </p>
      )}
      {resetError && (
        <p style={{ color: 'red' }}>
          Reset Error: {(resetError as BaseError).shortMessage || resetError.message}
        </p>
      )}

      <div className="control-buttons">
        <button 
          className="increment-btn" 
          onClick={increment}
          disabled={isIncrementPending || isIncrementConfirming}
        >
          {isIncrementPending ? 'Confirming...' : isIncrementConfirming ? 'Processing...' : 'Increment'}
        </button>
        
        <button 
          className="decrement-btn" 
          onClick={decrement}
          disabled={isDecrementPending || isDecrementConfirming}
        >
          {isDecrementPending ? 'Confirming...' : isDecrementConfirming ? 'Processing...' : 'Decrement'}
        </button>
        
        <button 
          className="reset-btn" 
          onClick={reset}
          disabled={isResetPending || isResetConfirming}
        >
          {isResetPending ? 'Confirming...' : isResetConfirming ? 'Processing...' : 'Reset'}
        </button>
      </div>
    </section>
  );
};

export default Count;