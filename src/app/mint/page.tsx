"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react"; // Import Solana wallet adapter hook

export default function MintPhotoPage() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const { publicKey } = useWallet(); // Get public key from the wallet

  // Handle photo selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  // Handle minting photo action
  const handleMintPhoto = async () => {
    if (!photo) {
      setStatus("Please select a photo to mint.");
      return;
    }

    if (!publicKey) {
      setStatus("Please connect your wallet.");
      return;
    }

    try {
      // Make an API call to mint the photo
      const response = await fetch("/api/actions/mint-photo", {
        method: "POST",
        body: JSON.stringify({ walletAddress: publicKey.toString() }), // Use the publicKey safely
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      setStatus(result.message || "Photo minted successfully!");
    } catch (error) {
      setStatus("Error minting photo.");
    }
  };

  return (
    <div>
      <h1>Mint Your Photo as an NFT</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleMintPhoto}>Mint Photo</button>
      {status && <p>{status}</p>}
    </div>
  );
}
