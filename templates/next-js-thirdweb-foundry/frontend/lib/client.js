import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "1234567890abcdef1234567890abcdef";

export const client = createThirdwebClient({
  clientId: clientId,
});
