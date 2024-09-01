import {
  ActionGetResponse,
  createActionHeaders,
  ActionPostResponse,
  ActionPostRequest,
  createPostResponse,
} from "@solana/actions";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { PublicKey, Transaction, Connection } from "@solana/web3.js"; // Import Solana SDK

// Extend ActionPostRequest to include the walletAddress property
interface CustomActionPostRequest extends ActionPostRequest<string> {
  walletAddress: string;
}

// Create headers required for the API
const headers = createActionHeaders({
  chainId: "mainnet", // Network to use, like "mainnet" or "devnet"
  actionVersion: "2.2.1", // Version of the Solana Actions
});

// Handle GET request to show information about the action
export const GET = async (req: Request) => {
  const payload: ActionGetResponse = {
    title: "Mint Your Photo as an NFT",
    icon: "https://your-domain.com/path/to/icon.png", // URL to an icon for your action
    description: "Capture a moment and mint it as an NFT on the Solana blockchain.",
    label: "Mint Photo", // Button label
  };

  // Return response with the required headers
  return Response.json(payload, {
    headers,
  });
};

// Handle OPTIONS request to provide CORS headers
export const OPTIONS = GET;

// Handle POST request to perform the minting action
export const POST = async (req: Request) => {
  const body: CustomActionPostRequest = await req.json(); // Use the custom type

  const userWalletAddress = body.walletAddress; // Get user's wallet address from the request body

  // Create a Solana transaction to mint the NFT
  const connection = new Connection("https://api.mainnet-beta.solana.com"); // Adjust to your desired endpoint
  const transaction = new Transaction();

  // Add instructions to the transaction
  transaction.add(
    // Example instruction
  );

  // Add any other transaction logic here, such as fee payer
  // Ensure the transaction is properly configured for Solana blockchain

  const payload: ActionPostResponse = await createPostResponse({
    fields: {
      transaction: transaction, // Directly pass the Transaction object here
      message: "Your photo will be minted as an NFT!",
    },
  });

  return Response.json(payload, {
    headers,
  });
};
