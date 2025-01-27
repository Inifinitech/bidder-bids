import React, { useState } from "react";
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const [product, setProduct] = useState({ name: "", description: "", starting_price: "", end_time: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    <span>Loading...</span>
  }
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true)
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        })
          if (response.ok) {
            setMessage("Product added successfully")
            toast.success("Product added succesdfully")
            setProduct({name: "", description: "", starting_price: "", end_time: ""})

            setTimeout(() => {
              setMessage("")
            }, 2000)
            
        }        
      } catch (error) {
        setMessage(`${error}`)
        toast.error(error)
        console.error(error)
      } finally {
          setIsLoading(false)
      }
    }



  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-10">
          <div className="spinner border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 w-96">
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} className="border p-2 w-full rounded" required/>
        <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} className="border p-2 w-full rounded" required></textarea>
        <input type="number" name="starting_price" placeholder="Starting Price" value={product.starting_price} onChange={handleChange} className="border p-2 w-full rounded" required/>
        <input type="datetime-local" name="end_time" value={product.end_time} onChange={handleChange} className="border p-2 w-full rounded" required/>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Submit</button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default AdminDashboard;