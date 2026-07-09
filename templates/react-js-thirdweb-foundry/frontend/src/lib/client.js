import { createThirdwebClient } from "thirdweb";

const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID || "1234567890abcdef1234567890abcdef";

export const client = createThirdwebClient({
  clientId: clientId,
});
