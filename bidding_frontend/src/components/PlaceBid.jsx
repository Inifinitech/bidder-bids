import React, { useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const PlaceBid = () => {
  const { productId } = useParams();
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const handleBid = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}/bid/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: bidAmount, product: productId }),
      });
      if (response.ok) {
        setBidAmount(" ")
        toast.success("Bid placed successfully!")
        setMessage("Bid placed successfully!");
        setTimeout(() => {
          setMessage(" ")
        }, 2000)
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Something went wrong");
        setTimeout(() => {
          setMessage(" ")
        }, 2000)
        toast.error(errorData.error || "Something went wrong");
      }
    } catch (error) {
        toast.error(error.message)
        setMessage(`${error.message}`)
        console.error("Error", error)
    } finally {
      setBidAmount(" ")
      setIsLoading(false)
    }

  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Place a Bid</h1>
      {isLoading && (
        <div className="absolute inset-1 bg-opacity-100 backdrop-blur-sm flex justify-center items-center z-10">
        <div className="spinner border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}
      <form onSubmit={handleBid} className="space-y-4">
        <input type="number" placeholder="Bid Amount" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} className="border p-2 w-full rounded" required/>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Bid</button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default PlaceBid;