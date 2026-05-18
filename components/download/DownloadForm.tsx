"use client";

import { useState } from "react";
import { Download, Copy, Code } from "lucide-react";
import { toast } from "sonner";
import { getBlobUrl } from "@/lib/utils";

export function DownloadForm() {
  const [address, setAddress] = useState("");
  const [blobName, setBlobName] = useState("");

  const url = address && blobName 
    ? getBlobUrl(address, blobName)
    : "";

  const handleCopy = () => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard!");
  };

  const handleDownload = () => {
    if (!url) return;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-[#18181B]/80 backdrop-blur-xl p-8 rounded-3xl border border-pink-500/20 space-y-6 shadow-[0_0_20px_rgba(236,72,153,0.05)]">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-pink-200/60 mb-2">Account Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x..."
              className="w-full bg-[#09090B] border border-pink-500/20 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all font-mono text-sm text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-pink-200/60 mb-2">Blob Name</label>
            <input
              type="text"
              value={blobName}
              onChange={(e) => setBlobName(e.target.value)}
              placeholder="my-file.png"
              className="w-full bg-[#09090B] border border-pink-500/20 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all text-white"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-pink-500/20 space-y-4">
          <label className="block text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Direct URL</label>
          <div className="bg-[#09090B] rounded-xl p-4 border border-pink-500/20 flex items-center justify-between gap-4">
            <code className="text-sm text-cyan-400 break-all font-mono">
              {url || "Enter details to generate URL"}
            </code>
            <button 
              onClick={handleCopy}
              disabled={!url}
              className="p-2 hover:bg-pink-500/10 rounded-lg text-pink-200/50 hover:text-pink-100 transition-colors disabled:opacity-50 shrink-0"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={!url}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(236,72,153,0.4)]"
        >
          <Download className="w-5 h-5" />
          Download File
        </button>
      </div>

      <div className="bg-[#18181B]/80 backdrop-blur-xl p-6 rounded-2xl border border-pink-500/20 shadow-[0_0_20px_rgba(236,72,153,0.05)]">
        <h3 className="text-sm font-bold flex items-center gap-2 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
          <Code className="w-4 h-4 text-cyan-400" />
          SDK Download Snippet
        </h3>
        <pre className="bg-[#09090B] p-4 rounded-xl text-sm font-mono text-white/80 overflow-x-auto border border-pink-500/10">
{`import { ShelbyClient } from "@shelby-protocol/sdk/browser";
import { Network } from "@aptos-labs/ts-sdk";

const client = new ShelbyClient({ network: Network.SHELBYNET });

const blobData = await client.rpc.getBlob({
  account: "${address || "ACCOUNT_ADDRESS"}",
  blobName: "${blobName || "BLOB_NAME"}",
});`}
        </pre>
      </div>
    </div>
  );
}
