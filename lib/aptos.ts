import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

function getNetwork(): Network {
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

const network = getNetwork();
const apiKey = (typeof window !== "undefined" ? localStorage.getItem("aptos_api_key") : null) || process.env.NEXT_PUBLIC_SHELBY_API_KEY || "";

const aptosConfig = new AptosConfig({ 
  network,
  clientConfig: {
    API_KEY: apiKey,
  },
});

export const aptosClient = new Aptos(aptosConfig);
