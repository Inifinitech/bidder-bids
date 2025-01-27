import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import ProductCatalogue from "./components/ProductCatalogue";
import PlaceBid from "./components/PlaceBid";
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <nav className="p-4 bg-gray-800 text-white">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/admin">Admin Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductCatalogue />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/products/:productId" element={<PlaceBid />} />
      </Routes>
      <Toaster position="top-right"/>
    </>
  );
};

export default App