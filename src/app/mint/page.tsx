"use client";

import { useState } from "react";

export default function MintPhotoPage() {
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
      setStatus("Please take or select a photo to mint.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("photo", photo);

      // Make an API call to mint the photo
      const response = await fetch("/api/actions/mint-photo", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.error) {
        setStatus(`Error: ${result.error}`);
      } else {
        setStatus(result.message || "Photo minted successfully!");
      }
    } catch (error) {
      setStatus("Error minting photo.");
    }
  };

  return (
    <div>
      <h1>Mint Your Photo as an NFT</h1>
      <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
      <button onClick={handleMintPhoto}>Mint Photo</button>
      {status && <p>{status}</p>}
    </div>
  );
}
