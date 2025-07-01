import * as React from 'react'
import { useAccount, useSwitchChain, useChainId } from 'wagmi'
import { supportedNetworks } from '../../config/config'

const NetworkSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { isConnected } = useAccount()
  const { switchChain, isPending } = useSwitchChain()
  const chainId = useChainId()

  const currentNetwork = supportedNetworks.find(network => network.id === chainId)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  const handleNetworkSwitch = (networkId: typeof supportedNetworks[number]['id']) => {
    if (networkId !== chainId) {
      // Type assertion to satisfy wagmi's switchChain type requirement
      switchChain({ chainId: networkId as Parameters<typeof switchChain>[0]['chainId'] })
    }
    closeDropdown()
  }

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.network-switcher')) {
        closeDropdown()
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  if (!isConnected) {
    return null
  }

  return (
    <div className="network-switcher">
      <button
        onClick={toggleDropdown}
        className="network-switcher-button"
        disabled={isPending}
      >
        <div className="network-info">
          <div className={`network-indicator ${currentNetwork?.testnet ? 'testnet' : 'mainnet'}`}></div>
          <span className="network-name">
            {currentNetwork?.name || 'Unknown Network'}
          </span>
        </div>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`dropdown-arrow ${isOpen ? 'rotated' : ''}`}
        >
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className="network-dropdown">
          <div className="network-dropdown-header">
            <h4>Select Network</h4>
          </div>
          <div className="network-options">
            {supportedNetworks.map((network) => (
              <button
                key={network.id}
                onClick={() => handleNetworkSwitch(network.id)}
                className={`network-option ${chainId === network.id ? 'active' : ''}`}
                disabled={isPending}
              >
                <div className="network-option-info">
                  <div className={`network-indicator ${network.testnet ? 'testnet' : 'mainnet'}`}></div>
                  <div className="network-details">
                    <span className="network-name">{network.name}</span>
                    <span className="network-type">
                      {network.testnet ? 'Testnet' : 'Mainnet'}
                    </span>
                  </div>
                </div>
                {chainId === network.id && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NetworkSwitcher