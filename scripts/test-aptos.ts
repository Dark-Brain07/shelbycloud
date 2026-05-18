import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const aptosConfig = new AptosConfig({ network: Network.SHELBYNET });
const aptos = new Aptos(aptosConfig);

async function main() {
  try {
    const methods = Object.keys(aptos);
    console.log("Methods on aptos client:", methods.filter(m => m.toLowerCase().includes("balance")));
    
    // Check if getBalance or similar exists on aptos or aptos.getAccountCoinAmount
    console.log("getBalance exists?", !!aptos.getBalance);
    console.log("getAccountCoinAmount exists?", !!aptos.getAccountCoinAmount);
  } catch (e) { console.error(e); }
}
main();
