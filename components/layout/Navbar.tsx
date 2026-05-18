"use client";

import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="h-16 border-b border-pink-500/10 bg-[#18181B]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img src="/shelby_cloud_logo.png" className="w-9 h-9 rounded-xl shadow-[0_0_12px_rgba(236,72,153,0.5)] border border-pink-500/20 object-cover" alt="Shelby Cloud Logo" />
          <span className="font-black text-2xl tracking-tight hidden sm:block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]">Shelby Cloud</span>
        </Link>
        <div className="px-3 py-1 rounded-full bg-[#09090B] border border-pink-500/20 text-xs font-bold text-pink-300 flex items-center gap-2 shadow-[0_0_8px_rgba(236,72,153,0.1)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Testnet
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <WalletSelector />
      </div>
    </nav>
  );
}
