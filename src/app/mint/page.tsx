"use client";

import { useState } from "react";
import { useWallet } from '@solana/wallet-adapter-react';

export default function MintPhotoPage() {
  const { publicKey, connect } = useWallet(); // Get user's wallet public key
  const [photo, setPhoto] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

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
      await connect(); // Prompt user to connect wallet if not already connected
    }

    try {
      // Make an API call to mint the photo
      const response = await fetch("/api/actions/mint-photo", {
        method: "POST",
        body: JSON.stringify({ walletAddress: publicKey.toString() }),
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
