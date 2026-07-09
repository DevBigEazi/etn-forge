import { useConnect} from 'wagmi'

export default function WalletOptions() {
  const { connectors, connect } = useConnect()
  
  return (
    <div className="wallet-options-grid">
      {connectors.map((connector) => (
        <button 
          key={connector.uid} 
          onClick={() => connect({ connector })}
          className="wallet-option-button"
        >
          <div className="wallet-icon">
            {connector.name.toLowerCase().includes('walletconnect') ? (
              <img 
                src="https://images.seeklogo.com/logo-png/43/1/walletconnect-logo-png_seeklogo-430923.png" 
                alt="WalletConnect logo" 
              />
            ) : connector.icon ? (
              <img 
                src={connector.icon} 
                alt={`${connector.name} logo`} 
              />
            ) : null}
          </div>
          <span>{connector.name}</span>
        </button>
      ))}
    </div>
  )
}
