import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    navigate(`/search/${value}`);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center">
      <input
        className="form-control me-3   rounded-0 search"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange}
        
      />
    </form>
  );
};

export default Search;
