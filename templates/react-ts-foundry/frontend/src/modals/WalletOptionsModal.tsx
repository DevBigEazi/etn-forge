import * as React from "react";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import WalletOptions from "../components/Header/WalletOptions";
import NetworkSwitcher from "../components/Header/NetworkSwitcher";
import { shortenAddress } from "../constants/helpers";

const WalletOptionsModal: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModalOnOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setIsOpen(false);
  };

  if (isConnected) {
    return (
      <div className="account-info-container">
        <NetworkSwitcher />

        <button onClick={handleDisconnect} className="disconnect-button">
          Disconnect
        </button>

        <div className="account-info">
          {ensAvatar ? (
            <img alt="ENS Avatar" src={ensAvatar} className="ens-avatar" />
          ) : (
            <div className="avatar-placeholder">
              {address?.slice(2, 4).toUpperCase()}
            </div>
          )}
          <div className="account-details">
            <div className="account-name">
              {ensName || shortenAddress(address as `0x${string}`)}
            </div>
            <div className="account-status">
              <span className="status-indicator"></span>
              Connected
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wallet-options-container">
      <button onClick={toggleModal} className="wallet-connect-button">
        <span>Connect Wallet</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="wallet-modal-overlay" onClick={closeModalOnOverlay}>
          <div className="wallet-modal">
            <div className="wallet-modal-header">
              <h3>Connect a wallet</h3>
              <button onClick={toggleModal} className="modal-close-button">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="wallet-modal-content">
              <p className="wallet-modal-description">
                By connecting a wallet, you agree to our Terms of Service and
                Privacy Policy.
              </p>
              <WalletOptions />
              <div className="wallet-help-section">
                <p>New to Ethereum wallets?</p>
                <a
                  href="https://ethereum.org/en/wallets/"
                  className="learn-more-link"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletOptionsModal;
