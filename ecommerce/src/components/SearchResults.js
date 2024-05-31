import React from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";

const SearchResults = () => {
    const { query } = useParams();
    const searchQuery = query ? query : ""; // Null check
    

  return (
    <div>
      <h4 className="px-5 mt-5">Search Results for "{query}"</h4>
      {/* Render the Product component with the search query */}
      <Product apiUrl="http://localhost:5000/products" searchQuery={searchQuery} />
    </div>
  );
};

export default SearchResults;
