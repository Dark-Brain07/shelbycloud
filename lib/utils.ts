const NETWORK_TO_RPC_BASE: Record<string, string> = {
  testnet: "https://api.testnet.shelby.xyz/shelby",
  shelbynet: "https://api.shelbynet.shelby.xyz/shelby",
};

export function getShelbyRpcBase(): string {
  const network = process.env.NEXT_PUBLIC_NETWORK?.toLowerCase() || "testnet";
  return NETWORK_TO_RPC_BASE[network] || NETWORK_TO_RPC_BASE.testnet;
}

/**
 * Build a download URL for a blob.
 * @param address - The 0x account address
 * @param fileName - Just the filename (e.g. "photo.png"), NOT the full @address/filename path
 */
export function getBlobUrl(address: string, fileName: string): string {
  return `${getShelbyRpcBase()}/v1/blobs/${address}/${fileName}`;
}
