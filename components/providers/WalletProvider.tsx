"use client";

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <AptosWalletAdapterProvider autoConnect={true}>
      {children}
      <Toaster theme="dark" position="bottom-right" />
    </AptosWalletAdapterProvider>
  );
}
