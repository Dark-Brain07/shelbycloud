import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { toast } from "sonner";
import { aptosClient } from "@/lib/aptos";
import { getShelbyClient } from "@/lib/shelby";
import { 
  createDefaultErasureCodingProvider, 
  generateCommitments, 
  ShelbyBlobClient, 
  expectedTotalChunksets 
} from "@shelby-protocol/sdk/browser";

export function useUpload() {
  const { account, signAndSubmitTransaction } = useWallet();
  const [step, setStep] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File) => {
    if (!account) {
      toast.error("Please connect your wallet first.");
      return;
    }

    try {
      setIsUploading(true);
      setStep(1);
      
      // Step 1: Encode the file
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const provider = await createDefaultErasureCodingProvider();
      const commitments = await generateCommitments(provider, fileBuffer);
      toast.success("Step 1: File Encoded ✓");

      // Step 2: Register blob on-chain
      setStep(2);
      toast.info("Step 2: Submitting registration transaction...");
      
      const payload = ShelbyBlobClient.createRegisterBlobPayload({
        account: account.address,
        blobName: file.name,
        blobMerkleRoot: commitments.blob_merkle_root,
        numChunksets: expectedTotalChunksets(commitments.raw_data_size),
        expirationMicros: (Date.now() + 1000 * 60 * 60 * 24 * 30) * 1000,
        blobSize: commitments.raw_data_size,
        encoding: 0,
      });

      console.log("Register payload:", JSON.stringify(payload, null, 2));

      const tx = await signAndSubmitTransaction({ data: payload });
      console.log("Transaction submitted, hash:", tx.hash);
      toast.info(`Tx submitted: ${tx.hash.slice(0, 10)}... Waiting for confirmation...`);

      // Wait for the transaction to be confirmed — this MUST succeed before Step 3
      const confirmedTx = await aptosClient.waitForTransaction({ 
        transactionHash: tx.hash,
        options: { timeoutSecs: 60, checkSuccess: true },
      });
      console.log("Transaction confirmed:", confirmedTx);
      toast.success("Step 2: Blob Registered on Aptos ✓");

      // Step 3: Upload blob data to Shelby RPC nodes
      setStep(3);
      toast.info("Step 3: Uploading blob data to Shelby nodes (waiting for indexer sync)...");
      
      const shelbyClient = getShelbyClient();
      if (!shelbyClient) throw new Error("Shelby client not initialized");

      // Give the Shelby RPC indexers 3 seconds to sync the on-chain registration event
      await new Promise(r => setTimeout(r, 3000));

      const blobData = new Uint8Array(await file.arrayBuffer());
      let uploadSuccess = false;
      let lastError: any = null;

      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          if (attempt > 1) {
            toast.info(`Retrying upload to Shelby nodes (attempt ${attempt}/3)...`);
          }
          await shelbyClient.rpc.putBlob({
            account: account.address,
            blobName: file.name,
            blobData,
          });
          uploadSuccess = true;
          break;
        } catch (e: any) {
          console.warn(`putBlob attempt ${attempt} failed:`, e);
          lastError = e;
          // Wait 3 seconds before retrying to allow indexer to catch up
          await new Promise(r => setTimeout(r, 3000));
        }
      }

      if (!uploadSuccess) {
        throw lastError || new Error("Failed to upload blob data to Shelby nodes after 3 attempts.");
      }

      toast.success("Step 3: Blob Uploaded to Shelby Nodes ✓");
      
      setStep(4); // complete
      toast.success("Upload complete! 🎉");
      
    } catch (err: any) {
      console.error("Upload error:", err);
      toast.error(`Upload failed: ${err.message || "Unknown error"}`);
      setStep(0);
    } finally {
      setIsUploading(false);
    }
  };

  const reset = () => {
    setStep(0);
    setIsUploading(false);
  };

  return { uploadFile, step, isUploading, reset };
}
