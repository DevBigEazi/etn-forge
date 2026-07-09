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
    isConfirmed: isIncrementConfirmed,
    error: incrementError 
  } = useCounterIncrement();
  
  const { 
    decrement, 
    isPending: isDecrementPending, 
    isConfirmed: isDecrementConfirmed,
    error: decrementError 
  } = useCounterDecrement();
  
  const { 
    reset, 
    isPending: isResetPending, 
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
          {error.message}
        </p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  // Check if any transaction is pending
  const isAnyPending = isIncrementPending || isDecrementPending || isResetPending;

  return (
    <section className="count">
      <h3>Current count</h3>
      <div className="total-count">
        {count !== undefined ? count.toString() : "No data"}
      </div>
      
      {/* Transaction status */}
      {isAnyPending && <p>Confirming transaction in wallet & waiting for receipt...</p>}
      {(isIncrementConfirmed || isDecrementConfirmed || isResetConfirmed) && (
        <p style={{ color: 'green' }}>Transaction confirmed!</p>
      )}
      
      {/* Error messages */}
      {incrementError && (
        <p style={{ color: 'red' }}>
          Increment Error: {incrementError.message}
        </p>
      )}
      {decrementError && (
        <p style={{ color: 'red' }}>
          Decrement Error: {decrementError.message}
        </p>
      )}
      {resetError && (
        <p style={{ color: 'red' }}>
          Reset Error: {resetError.message}
        </p>
      )}

      <div className="control-buttons">
        <button 
          className="increment-btn" 
          onClick={increment}
          disabled={isIncrementPending}
        >
          {isIncrementPending ? 'Processing...' : 'Increment'}
        </button>
        
        <button 
          className="decrement-btn" 
          onClick={decrement}
          disabled={isDecrementPending}
        >
          {isDecrementPending ? 'Processing...' : 'Decrement'}
        </button>
        
        <button 
          className="reset-btn" 
          onClick={reset}
          disabled={isResetPending}
        >
          {isResetPending ? 'Processing...' : 'Reset'}
        </button>
      </div>
    </section>
  );
};

export default Count;