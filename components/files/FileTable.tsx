"use client";

import { useFiles } from "@/hooks/useFiles";
import { Download, Copy, RefreshCw, FileIcon, Search } from "lucide-react";
import { toast } from "sonner";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";
import { getBlobUrl } from "@/lib/utils";

export function FileTable() {
  const { files, isLoading, refresh } = useFiles();
  const { account } = useWallet();
  const [search, setSearch] = useState("");

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <button
          onClick={() => refresh()}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-surface border border-white/5 rounded-xl hover:bg-white/5 transition-colors disabled:opacity-50 text-sm font-bold"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Status
        </button>
      </div>

      <div className="glass rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-4 text-sm font-medium text-muted">Name</th>
                <th className="p-4 text-sm font-medium text-muted">Status</th>
                <th className="p-4 text-sm font-medium text-muted">Size</th>
                <th className="p-4 text-sm font-medium text-muted">Expiry</th>
                <th className="p-4 text-sm font-medium text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted">
                    {isLoading ? "Loading files..." : "No files found."}
                  </td>
                </tr>
              ) : (
                filteredFiles.map((file, i) => {
                  const now = Date.now();
                  const totalLife = file.expiresAt - file.uploadedAt;
                  const remaining = file.expiresAt - now;
                  const percent = Math.max(0, Math.min(100, (remaining / totalLife) * 100));
                  
                  let colorClass = "bg-accent";
                  if (percent < 25) colorClass = "bg-red-500";
                  else if (percent < 50) colorClass = "bg-amber-500";

                  return (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center shrink-0">
                            <FileIcon className="w-4 h-4 text-accent" />
                          </div>
                          <span className="font-medium max-w-[150px] sm:max-w-xs truncate">{file.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {file.isWritten ? (
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold inline-block">
                            ✓ Written
                          </span>
                        ) : (
                          <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full font-bold animate-pulse inline-block">
                            ⏳ Confirming on Nodes
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-muted">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </td>
                      <td className="p-4">
                        <div className="w-24 h-2 bg-surface rounded-full overflow-hidden">
                          <div className={`h-full ${colorClass} transition-all`} style={{ width: `${percent}%` }} />
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleCopy(file.name, file.isWritten)} className="p-2 hover:bg-white/5 rounded-lg text-muted hover:text-white transition-colors" title="Copy URL">
                            <Copy className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDownload(file.name, file.isWritten)} className="p-2 hover:bg-white/5 rounded-lg text-muted hover:text-accent transition-colors" title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
