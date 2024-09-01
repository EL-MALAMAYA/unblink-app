import {
  ActionGetResponse,
  createActionHeaders,
  ActionPostResponse,
  ActionPostRequest,
  createPostResponse,
} from "@solana/actions";
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

// Create headers required for the API
const headers = createActionHeaders({
  chainId: "mainnet", // or "devnet" for testing
  actionVersion: "2.2.1", 
});

export const GET = async (req: Request) => {
  const payload: ActionGetResponse = {
    title: "Mint Your Photo as an NFT",
    icon: 'https://your-domain.com/path/to/icon.png',
    description: "Capture a moment and mint it as an NFT on the Solana blockchain.",
    label: "Mint Photo",
  };

  return Response.json(payload, {
    headers,
  });
}

// Handle OPTIONS request
export const OPTIONS = GET;

// Handle POST request to perform the minting action
export const POST = async (req: Request) => {
  const body: ActionPostRequest = await req.json();
  const userWalletAddress = body.walletAddress; // Get user's wallet address from the request body

  // Create a Solana transaction to mint the NFT
  const transaction = new Transaction().add(
    // Example transaction to mint NFT
    SystemProgram.transfer({
      fromPubkey: new PublicKey(userWalletAddress), // User's wallet address
      toPubkey: new PublicKey(userWalletAddress), // Sending back to the user's wallet address
      lamports: 10000000, // Example amount for minting (1 SOL = 1,000,000,000 lamports)
    })
  );

  const payload: ActionPostResponse = await createPostResponse({
    fields: {
      transaction: transaction.serialize().toString('base64'), // Convert transaction to base64 for Solana
      message: "Your photo is being minted as an NFT!",
    },
  });

  return Response.json(payload, {
    headers,
  });
};
