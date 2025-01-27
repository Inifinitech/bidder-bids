import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import ProductCatalogue from "./components/ProductCatalogue";
import PlaceBid from "./components/PlaceBid";
import Layout from "./components/Layout";
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<ProductCatalogue />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/products/:productId" element={<PlaceBid />} />
        </Route>
      </Routes>
      <Toaster position="top-right"/>
    </>
  );
};

export default App