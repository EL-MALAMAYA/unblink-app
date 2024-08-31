import {
  ActionGetResponse,
  createActionHeaders,
  ActionPostResponse,
  ActionPostRequest,
  createPostResponse
} from "@solana/actions";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { PublicKey, Transaction, Connection } from "@solana/web3.js"; // Import Solana SDK

const headers = createActionHeaders({
  chainId: "mainnet", 
  actionVersion: "2.2.1",
});

// Handle GET request to show information about the action
export const GET = async (req: Request) => {
  const payload: ActionGetResponse = {
    title: "Mint Your Photo as an NFT",
    icon: 'https://your-domain.com/path/to/icon.png',
    description: "Capture a moment and mint it as an NFT on the Solana blockchain.",
    label: "Mint Photo",
  };

  return new Response(JSON.stringify(payload), { headers });
};

// Handle OPTIONS request to provide CORS headers
export const OPTIONS = GET;

// Handle POST request to upload photo and mint it as an NFT
export const POST = async (req: any) => {
  const form = new formidable.IncomingForm();
  
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return new Response(JSON.stringify({ error: "Error parsing the uploaded photo." }), { status: 500 });
    }

    const photo = files.photo;

    if (!photo) {
      return new Response(JSON.stringify({ error: "No photo provided." }), { status: 400 });
    }

    // Save photo locally or to cloud storage
    const photoPath = path.join(process.cwd(), 'uploads', photo.originalFilename);
    fs.copyFileSync(photo.filepath, photoPath);

    // Your logic to create a Solana transaction and use the photo URL
    const transaction = "base64-encoded-transaction"; // Replace this with actual logic to create transaction

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: "Your photo will be minted as an NFT!",
      },
    });

    return new Response(JSON.stringify(payload), { headers });
  });
};
