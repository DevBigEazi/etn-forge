import { ConnectButton } from "thirdweb/react";
import { client } from "../../lib/client";
import { defineChain } from "thirdweb";
import NetworkSwitcher from "./NetworkSwitcher";

const electroneum = defineChain(52014);
const electroneumTestnet = defineChain(5201420);

const Header = () => {
    return (
      <div className="header-wrapper">
        <div className="header-container">
          <h2>Electroneum Dapp Starter Template</h2>
          <div className="header-actions">
            <NetworkSwitcher />
            <ConnectButton 
              client={client} 
              chains={[electroneum, electroneumTestnet]} 
            />
          </div>
        </div>
      </div>
    )
  }

export default Header
