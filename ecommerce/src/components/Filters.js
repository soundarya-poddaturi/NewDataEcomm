  import React, { useState,useEffect } from "react";
  import axios from "axios";
  import { Collapse, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

  // import DataCategories from "./DataCategories";

  export const CategoryFilter = ({ updateApiUrl }) => {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
  
    useEffect(() => {
      // Fetch categories from the Express API
      axios.get("http://localhost:5000/categories")
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          console.error("Error fetching categories:", error);
        });
    }, []);

    const handleCategoryChange = (category) => {
      setSelectedCategory(category);
      updateApiUrl(category);
    };

    const clearCategory = () => {
      setSelectedCategory(null);
      updateApiUrl("all"); // Assuming "all" represents all categories
    };

    return (
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-around " onClick={() => setOpen(!open)}>
          <Button
            
            aria-controls="categoryFilter"
            aria-expanded={open}
            variant="link"
            className="p-0 mb-2 fw-semibold mb-1 p-0 text-black text-decoration-none "
          >
            CATEGORIES
          </Button>
          <span className={`fa ${open ? "fa-caret-up" : "fa-caret-down"} `}></span>
        </div>
        <Collapse in={open}>
          <div id="categoryFilter" className="my-3">
            {categories.map((category, index) => (
              <div key={index} className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  id={category}
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                />
                <label className="form-check-label text-capitalize" htmlFor={category}>
                  {category}
                </label>
              </div>
            ))}
            <Button variant="link" onClick={clearCategory} className="text-body-emphasis  p-1 rounded-0  btn-sm mt-2">
              Clear Category
            </Button>
          </div>
        
        </Collapse>
        <hr/>
      </div>
    );
  };

  export const PriceFilter = ({
    showPriceFilter,
    setShowPriceFilter,
    selectedMinPrice,
    selectedMaxPrice,
    handleMinPriceChange,
    handleMaxPriceChange,
    clearPriceFilter // Function to clear price filters
  }) => {
    const [open, setOpen] = useState(false);
  
    return (
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-around " onClick={() => {
            setOpen(!open);
            setShowPriceFilter(!showPriceFilter);
          }}>
          <Button
            aria-controls="priceFilter"
            aria-expanded={open}
            variant="link"
            className="p-0 mb-2 fw-semibold mb-1 p-0 text-black text-decoration-none me-4"
          >
            PRICE
          </Button>
          <span className={`fa ${open ? "fa-caret-up" : "fa-caret-down"}`}></span>
        </div>
        <Collapse in={open}>
          <div id="priceFilter ">
            <div className="input-group my-3 mb-4">
              <input
                type="number"
                className="form-control rounded-0 "
                placeholder="Min"
                value={selectedMinPrice || ""}
                onChange={(e) => handleMinPriceChange(parseInt(e.target.value))}
              />
              <span className="input-group-text">to</span>
              <input
                type="number"
                className="form-control rounded-0 "
                placeholder="Max"
                value={selectedMaxPrice || ""}
                onChange={(e) => handleMaxPriceChange(parseInt(e.target.value))}
              />
            </div>
            <Button variant="link" className="text-body-emphasis  p-1 rounded-0  btn-sm  " onClick={clearPriceFilter}>
              Clear Price
            </Button>
          </div>
        </Collapse>
      </div>
    );
  };
  
  // export default PriceFilter;






  // export default RatingFilter;
  export const DiscountFilter = ({
    showDiscountFilter,
    setShowDiscountFilter,
    handleDiscountChange,
    clearDiscountFilter,
    selectedDiscount
  }) => {
    const [discountRanges] = useState([
      { label: "0%  -  20%", value: "0-20" },
      { label: "21%  -  40%", value: "21-40" },
      { label: "41%  -  60%", value: "41-60" },
      { label: "61%  -  80%", value: "61-80" }
    ]);
  
    const handleRadioChange = (e) => {
      handleDiscountChange(e.target.value);
    };
  
    return (
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-around" onClick={() => setShowDiscountFilter(!showDiscountFilter)}>
          <Button
            aria-controls="discountFilter"
            aria-expanded={showDiscountFilter}
            variant="link"
            className="p-0 mb-2 fw-semibold mb-1 p-0 text-black text-decoration-none me-4"
          >
            DISCOUNT
          </Button>
          <span className={`fa ${showDiscountFilter ? "fa-caret-up" : "fa-caret-down"}`}></span>
        </div>
  
        <Collapse in={showDiscountFilter}>
          <div id="discountFilter" className="my-3">
            {discountRanges.map((range, index) => (
              <div key={index} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value={range.value}
                  id={`discount${index}`}
                  checked={selectedDiscount === range.value}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor={`discount${index}`}>
                  {range.label}
                </label>
              </div>
            ))}
            <Button variant="link" className="text-body-emphasis p-1 rounded-0 btn-sm mt-2" onClick={clearDiscountFilter}>
              Clear Discount
            </Button>
          </div>
        </Collapse>
      </div>
    );
  };
  
  export const BrandFilter = ({ showBrandFilter, setShowBrandFilter, handleBrandChange, clearBrandFilter, brands, selectedBrands }) => {
    const [open, setOpen] = useState(false);
  
    const handleCheckboxChange = (brand) => {
      const updatedBrands = selectedBrands.includes(brand)
        ? selectedBrands.filter((selectedBrand) => selectedBrand !== brand)
        : [...selectedBrands, brand];
      handleBrandChange(updatedBrands);
    };
  
    return (
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-around" onClick={() => setShowBrandFilter(!showBrandFilter)}>
          <Button
            aria-controls="brandFilter"
            aria-expanded={open}
            variant="link"
            className="p-0 mb-2 fw-semibold mb-1 p-0 text-black text-decoration-none me-4"
          >
            BRAND
          </Button>
          <span className={`fa ${showBrandFilter ? "fa-caret-up" : "fa-caret-down"}`}></span>
        </div>
  
        <Collapse in={showBrandFilter}>
          <div id="brandFilter" className="my-3">
            {brands.map((brand, index) => (
              <div key={index} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`brand${index}`}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleCheckboxChange(brand)}
                />
                <label className="form-check-label" htmlFor={`brand${index}`}>
                  {brand}
                </label>
              </div>
            ))}
            <Button variant="link" className="text-body-emphasis p-1 rounded-0 btn-sm mt-2" onClick={clearBrandFilter}>
              Clear Brand
            </Button>
          </div>
        </Collapse>
      </div>
    );
  };
  