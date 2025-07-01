import WalletOptionsModal from '../../modals/WalletOptionsModal'

const Header = () => {
    return (
      <div className="header-wrapper">
        <div className="header-container">
          <h2>Electroneum Dapp Starter Template</h2>
          <WalletOptionsModal/>
        </div>
      </div>
    )
  }

export default Header