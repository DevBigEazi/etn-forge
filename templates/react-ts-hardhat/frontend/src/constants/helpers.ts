export const contractAddress = "0x476C8C48B01Be4e9CeD9760E0dD7bc4570B83B83";

export const shortenAddress = (address: string | any[], length = 4) => {
    return `${address.slice(0, length)}...${address.slice(-length)}`;
};