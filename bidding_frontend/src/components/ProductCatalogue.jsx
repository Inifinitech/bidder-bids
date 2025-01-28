import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";



const ProductCatalogue = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products/");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          const errorData = await response.json();
          toast.error(errorData.error || "Something went wrong");
        }
      }
      catch (error) {
        console.error('Error', error)
        toast.error(error)
      } finally {
        setIsLoading(false)
      }
    };

  return ( 
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Catalogue</h1>
      {isLoading && (
          <div className="absolute inset-1 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-10">
          <div className="spinner border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p><span className="font-semibold">Description: </span>{product.description}</p>
            <p><span className="font-semibold">Starting Price: </span> ${product.starting_price}</p>
            <p><span className="font-semibold">Ends at: </span> {new Date(product.end_time).toLocaleString()}</p>
            <Link to={`/products/${product.id}`} className="text-blue-500 hover:underline mt-2 inline-block">Place a Bid</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalogue;