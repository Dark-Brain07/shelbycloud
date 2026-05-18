"use client";

import { motion } from "framer-motion";
import { Database, HardDrive, Coins, ArrowUpRight, Download, Copy, FileIcon } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";
import { useFiles } from "@/hooks/useFiles";
import { aptosClient } from "@/lib/aptos";
import { SHELBYUSD_FA_METADATA_ADDRESS } from "@shelby-protocol/sdk/browser";
import { getBlobUrl } from "@/lib/utils";
import { toast } from "sonner";

export default function DashboardPage() {
  const { account, connected } = useWallet();
  const { files, isLoading } = useFiles();
  const [balance, setBalance] = useState("0.00");
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);

  useEffect(() => {
    if (!account) return;
    const accountAddress = account.address.toString();
    async function fetchBalance() {
      try {
        setIsBalanceLoading(true);
        let bal = 0;
        try {
          bal = await aptosClient.getBalance({
            accountAddress,
            asset: SHELBYUSD_FA_METADATA_ADDRESS
          });
        } catch (e) {
          console.log("FA balance failed, trying coin fallback", e);
          bal = await aptosClient.getAccountCoinAmount({
            accountAddress,
            coinType: "0x249f5c642a63885ff88a5113b3ba0079840af5a1357706f8c7f3bfc5dd12511f::shelby_usd::ShelbyUSD"
          });
        }
        
        const formattedBal = (Number(bal) / 100000000).toFixed(2);
        setBalance(formattedBal);
      } catch (err) {
        console.error("Failed to fetch balance", err);
      } finally {
        setIsBalanceLoading(false);
      }
    }
    fetchBalance();
  }, [account]);

  const totalSize = files.reduce((acc, f) => acc + f.size, 0);
  let storageUsed = "0 B";
  if (totalSize > 0) {
    if (totalSize < 1024) storageUsed = `${totalSize} B`;
    else if (totalSize < 1024 * 1024) storageUsed = `${(totalSize / 1024).toFixed(2)} KB`;
    else if (totalSize < 1024 * 1024 * 1024) storageUsed = `${(totalSize / (1024 * 1024)).toFixed(2)} MB`;
    else storageUsed = `${(totalSize / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }

  const stats = [
    { 
      label: "Total Blobs", 
      value: isLoading ? "..." : files.length.toString(), 
      icon: Database, 
      iconBg: "from-pink-500 to-purple-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]",
      valColor: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
    },
    { 
      label: "Storage Used", 
      value: isLoading ? "..." : storageUsed, 
      icon: HardDrive, 
      iconBg: "from-purple-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]",
      valColor: "text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
    },
    { 
      label: "ShelbyUSD Balance", 
      value: isBalanceLoading ? "..." : `$${balance}`, 
      icon: Coins, 
      iconBg: "from-yellow-500 to-orange-500 text-white shadow-[0_0_15px_rgba(234,179,8,0.3)]",
      valColor: "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-emerald-400"
    },
  ];

  const handleCopy = (name: string, isWritten: boolean) => {
    if (!account) return;
    if (!isWritten) {
      toast.info("⏳ This blob is currently being verified and written on-chain by storage providers. Please wait a minute before downloading!");
      return;
    }
    const url = getBlobUrl(account.address.toString(), name);
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard!");
  };

  const handleDownload = (name: string, isWritten: boolean) => {
    if (!account) return;
    if (!isWritten) {
      toast.info("⏳ This blob is currently being verified and written on-chain by storage providers. Please wait a minute before downloading!");
      return;
    }
    const url = getBlobUrl(account.address.toString(), name);
    window.open(url, "_blank");
  };

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
        <div className="glass p-8 rounded-2xl text-center max-w-md w-full">
          <Database className="w-12 h-12 text-muted mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Connect Wallet</h2>
          <p className="text-muted mb-6">Please connect your Aptos wallet to view your dashboard.</p>
        </div>
      </div>
    );
  }

  const recentFiles = files.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]">Overview</h1>
          <p className="text-pink-200/60 mt-1 font-medium">Manage your decentralized storage.</p>
        </div>
        <Link 
          href="/dashboard/upload"
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(236,72,153,0.4)]"
        >
          Upload File
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#18181B]/80 backdrop-blur-xl p-6 rounded-2xl flex items-center gap-4 border border-pink-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all"
          >
            <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.iconBg}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-pink-200/60 font-semibold">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.valColor}`}>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#18181B]/80 backdrop-blur-xl rounded-2xl border border-pink-500/20 overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.05)]">
        <div className="p-6 border-b border-pink-500/20 flex items-center justify-between">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Recent Uploads</h2>
          {files.length > 5 && (
            <Link href="/dashboard/files" className="text-sm text-cyan-400 hover:underline font-bold">
              View all ({files.length})
            </Link>
          )}
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-12 text-pink-200/50 font-medium">
              <Database className="w-8 h-8 mx-auto mb-3 opacity-50 text-pink-400 animate-spin" />
              <p>Loading recent uploads...</p>
            </div>
          ) : recentFiles.length === 0 ? (
            <div className="text-center py-12 text-pink-200/50 font-medium">
              <Database className="w-8 h-8 mx-auto mb-3 opacity-50 text-pink-400 animate-pulse" />
              <p>No recent uploads found.</p>
              <Link href="/dashboard/upload" className="text-cyan-400 hover:underline mt-2 inline-block font-bold">
                Upload your first file
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentFiles.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#09090B] rounded-xl border border-pink-500/10 hover:border-cyan-400/30 transition-all">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0">
                      <FileIcon className="w-5 h-5 text-pink-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-white truncate">{file.name}</p>
                        {file.isWritten ? (
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold shrink-0">
                            ✓ Written
                          </span>
                        ) : (
                          <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold animate-pulse shrink-0">
                            ⏳ Confirming on Nodes
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-pink-200/60 mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => handleCopy(file.name, file.isWritten)} className="p-2 hover:bg-white/5 rounded-lg text-pink-200/60 hover:text-white transition-colors" title="Copy URL">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDownload(file.name, file.isWritten)} className="p-2 hover:bg-white/5 rounded-lg text-pink-200/60 hover:text-cyan-400 transition-colors" title="Download">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
