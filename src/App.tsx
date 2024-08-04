import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListingPage from "./components/views/product-listing-page";
import ProductDetailsPage from "./components/views/product-details-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/details/:categoryID/:productID" element={<ProductDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
