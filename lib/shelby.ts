import { ShelbyClient } from "@shelby-protocol/sdk/browser";
import { Network } from "@aptos-labs/ts-sdk";

let clientInstance: ShelbyClient | null = null;

function getShelbyNetwork(): Network {
  const env = process.env.NEXT_PUBLIC_NETWORK?.toLowerCase();
  switch (env) {
    case "mainnet":
      return Network.MAINNET;
    case "shelbynet":
      return Network.SHELBYNET;
    case "testnet":
    default:
      return Network.TESTNET;
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
