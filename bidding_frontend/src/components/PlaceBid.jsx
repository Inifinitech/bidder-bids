import React, { useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const PlaceBid = () => {
  const { productId } = useParams();
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    <span>Loading...</span>
  }

  const handleBid = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}/bid/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: bidAmount }),
      });
      if (response.ok) {
        const data = await response.json();
        setMessage(response.ok ? "Bid placed successfully!" : "Error: " + JSON.stringify(data));
      }
    } catch (error) {
        toast.error(error)
        setMessage(`${error}`)
        console.error("Error", error)
    } finally {
      setIsLoading(false)
    }

  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Place a Bid</h1>
      <form onSubmit={handleBid} className="space-y-4">
        <input type="number" placeholder="Bid Amount" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} className="border p-2 w-full rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Bid</button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default PlaceBid;