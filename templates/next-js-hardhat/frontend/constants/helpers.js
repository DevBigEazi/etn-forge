export const CONTRACTS = {
    mainnet: "0xB922dA0212c1945050c037270A60990924DBaefB",
    testnet: "0x41E6054BaD84Fb703D20503F06c9c030Ebd15898"
  };
  
  export const getContractAddress = (network) => CONTRACTS[network];
  
  export const shortenAddress = (address, length = 4) => {
      if (typeof address !== "string" || address.length <= 2 * length) {
          return address;
      }
      return `${address.slice(0, length)}...${address.slice(-length)}`;
  };
  
  // Helper function to properly interpret signed 256-bit integers
  export const parseSignedBigInt = (value) => {
      // Check if the number is negative (MSB is 1)
      const isNegative = value > BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
      
      if (isNegative) {
        // Convert to two's complement negative representation
        const negativeValue = value - BigInt("0x10000000000000000000000000000000000000000000000000000000000000000");
        return negativeValue.toString();
      }
      return value.toString();
  }