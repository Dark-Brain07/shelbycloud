# Shelby Protocol Testnet UI

A stunning, Next.js 14 based decentralized storage web application for the Shelby Protocol on the Aptos network.

## Prerequisites

- Node.js 18+
- Aptos wallet extension (e.g., Petra, Pontem)
- ShelbyUSD (request from the Shelby Discord)

## Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Copy the environment template:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`
Edit `.env.local` to add your API keys. You can get an Aptos API key from https://developers.aptoslabs.com.

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

## Features

- **Dreamy UI**: Incredible glassmorphism dark theme.
- **3-Step Upload**: Encode file -> Register on-chain -> Upload chunks.
- **Direct Download**: Fetch via account address and blob name.

## URL Format for Direct Downloads

\`https://api.testnet.shelby.xyz/shelby/v1/blobs/{address}/{blobName}\`
