"use client";

import { ThirdwebProvider } from "thirdweb/react";

export function Providers({ children }) {
  return (
    <ThirdwebProvider>
      {children}
    </ThirdwebProvider>
  );
}
