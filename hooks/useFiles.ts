import { useState, useEffect, useCallback } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { getShelbyClient } from "@/lib/shelby";
import { toast } from "sonner";

export interface BlobMeta {
  /** Display name (just the filename, e.g. "photo.png") */
  name: string;
  /** Full blob name from SDK (e.g. "@address/photo.png") */
  fullName: string;
  size: number;
  uploadedAt: number;
  expiresAt: number;
}

export function useFiles() {
  const { account } = useWallet();
  const [files, setFiles] = useState<BlobMeta[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFiles = useCallback(async () => {
    if (!account) return;
    
    try {
      setIsLoading(true);
      const client = getShelbyClient();
      if (!client) throw new Error("Client not initialized");

      const rawBlobs = await client.coordination.getAccountBlobs({ account: account.address });
      
      const formatted: BlobMeta[] = rawBlobs.map((b: any) => ({
        // blobNameSuffix is just the filename part (e.g. "photo.png")
        name: b.blobNameSuffix || b.name || "Unknown",
        // Full blob name includes the @address prefix
        fullName: b.name || "",
        size: b.size || 0,
        uploadedAt: b.creationMicros ? b.creationMicros / 1000 : Date.now(),
        expiresAt: b.expirationMicros ? b.expirationMicros / 1000 : Date.now() + 1000 * 60 * 60 * 24 * 30,
      }));

      setFiles(formatted);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load files");
    } finally {
      setIsLoading(false);
    }
  }, [account]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return { files, isLoading, refresh: fetchFiles };
}
