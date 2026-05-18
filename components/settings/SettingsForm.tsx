"use client";

import { useState, useEffect } from "react";
import { Key, Network, Wallet, ExternalLink } from "lucide-react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { toast } from "sonner";

export function SettingsForm() {
  const { account } = useWallet();
  const [shelbyKey, setShelbyKey] = useState("");
  const [aptosKey, setAptosKey] = useState("");

  useEffect(() => {
    setShelbyKey(localStorage.getItem("shelby_api_key") || "");
    setAptosKey(localStorage.getItem("aptos_api_key") || "");
  }, []);

  const handleSave = () => {
    localStorage.setItem("shelby_api_key", shelbyKey);
    localStorage.setItem("aptos_api_key", aptosKey);
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-3xl space-y-8">
      {/* API Keys */}
      <div className="bg-[#18181B]/80 backdrop-blur-xl p-8 rounded-3xl border border-pink-500/20 space-y-6 shadow-[0_0_20px_rgba(236,72,153,0.05)]">
        <h2 className="text-xl font-bold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          <Key className="w-5 h-5 text-pink-400" />
          API Configuration
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-pink-200/60 mb-2">Shelby API Key</label>
            <input
              type="password"
              value={shelbyKey}
              onChange={(e) => setShelbyKey(e.target.value)}
              placeholder="Leave blank to use default from env"
              className="w-full bg-[#09090B] border border-pink-500/20 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all font-mono text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-pink-200/60 mb-2">Aptos RPC Key</label>
            <input
              type="password"
              value={aptosKey}
              onChange={(e) => setAptosKey(e.target.value)}
              placeholder="Leave blank to use default from env"
              className="w-full bg-[#09090B] border border-pink-500/20 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all font-mono text-white"
            />
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(236,72,153,0.4)]"
          >
            Save Keys
          </button>
        </div>
      </div>

      {/* Network & Account */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#18181B]/80 backdrop-blur-xl p-6 rounded-2xl border border-pink-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
            <Network className="w-5 h-5 text-pink-400" />
            Network
          </h2>
          <div className="p-4 bg-[#09090B] rounded-xl border border-pink-500/10">
            <p className="text-sm text-pink-200/60 font-semibold">Current Network</p>
            <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Aptos Testnet</p>
          </div>
        </div>

        <div className="bg-[#18181B]/80 backdrop-blur-xl p-6 rounded-2xl border border-pink-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
            <Wallet className="w-5 h-5 text-purple-400" />
            Account
          </h2>
          <div className="p-4 bg-[#09090B] rounded-xl border border-pink-500/10">
            <p className="text-sm text-pink-200/60 font-semibold">Connected Address</p>
            <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 font-mono text-sm truncate">
              {account ? account.address.toString() : "Not connected"}
            </p>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-[#18181B]/80 backdrop-blur-xl p-6 rounded-2xl border border-pink-500/20 space-y-4 shadow-[0_0_20px_rgba(236,72,153,0.05)]">
        <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Resources</h2>
        <div className="flex flex-wrap gap-4">
          <a href="#" className="flex items-center gap-2 px-4 py-2 bg-[#09090B] hover:bg-pink-500/10 rounded-xl border border-pink-500/20 transition-all text-sm font-bold text-pink-200/60 hover:text-pink-100">
            <ExternalLink className="w-4 h-4 text-pink-400" />
            Aptos Faucet
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2 bg-[#09090B] hover:bg-pink-500/10 rounded-xl border border-pink-500/20 transition-all text-sm font-bold text-pink-200/60 hover:text-pink-100">
            <ExternalLink className="w-4 h-4 text-pink-400" />
            Shelby Discord
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2 bg-[#09090B] hover:bg-pink-500/10 rounded-xl border border-pink-500/20 transition-all text-sm font-bold text-pink-200/60 hover:text-pink-100">
            <ExternalLink className="w-4 h-4 text-pink-400" />
            Block Explorer
          </a>
        </div>
      </div>
    </div>
  );
}
