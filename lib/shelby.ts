import { ShelbyClient, Network as ShelbyNetwork } from "@shelby-protocol/sdk/browser";

let clientInstance: ShelbyClient | null = null;

function getShelbyNetwork(): ShelbyNetwork {
  const env = process.env.NEXT_PUBLIC_NETWORK?.toLowerCase();
  switch (env) {
    case "shelbynet":
      return ShelbyNetwork.SHELBYNET;
    case "testnet":
    default:
      return ShelbyNetwork.TESTNET;
  }
}

export function getShelbyClient() {
  if (typeof window === "undefined") return null;
  
  if (!clientInstance) {
    const apiKey = localStorage.getItem("shelby_api_key") || process.env.NEXT_PUBLIC_SHELBY_API_KEY || "";
    
    clientInstance = new ShelbyClient({
      network: getShelbyNetwork(),
      apiKey,
    });
  }
  
  return clientInstance;
}
