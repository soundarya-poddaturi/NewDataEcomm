import React, { useState, useEffect } from "react";
import Product from "./Product";
import { useParams } from "react-router-dom";
import { PriceFilter } from "./Filters";
import axios from "axios";
import CountDown from "./CountDown";
import { Button, Collapse } from "react-bootstrap";
import FilterCollapse from "./FilterCollapse"; // Import FilterCollapse
import MultiThumbSlider from "./ProductItem"; // Ensure correct import

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [apiUrl, setApiUrl] = useState(
    category === "all"
      ? "http://localhost:5000/products"
      : `http://localhost:5000/products/category/${category}`
  );

  const [filters, setFilters] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false); // Set to false initially
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [showDiscountFilter, setShowDiscountFilter] = useState(false);
  const [selectedMinPrice, setSelectedMinPrice] = useState(null);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [showBrandFilter, setShowBrandFilter] = useState(false);
  const [showFabricFilter, setShowFabricFilter] = useState(false);
  const [selectedFabricTypes, setSelectedFabricTypes] = useState([]);
  const [fabricTypes, setFabricTypes] = useState([]);
  const [showSizeFilter, setShowSizeFilter] = useState(false);
  const [minPrice, setMinPrice] = useState(0); // State to store dynamic min price
  const [maxPrice, setMaxPrice] = useState(10000);
  const handleSliderChange = (values) => {
    setSelectedMinPrice(values[0]);
    console.log(values[0]);
    console.log(values[1]);
    setSelectedMaxPrice(values[1]);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/category/${category}`)
      .then((response) => {
        const data = response.data;
        const uniqueBrands = [...new Set(data.map((item) => item.brand))];
        setBrands(uniqueBrands);
        const uniqueSizes = [
          ...new Set(
            data.flatMap(
              (item) => (item.subcategories && item.subcategories.sizes) || []
            )
          ),
        ];

        setSizes(uniqueSizes);
        const fabricTypes = [
          ...new Set(
            data
              .filter(
                (item) => item.subcategories && item.subcategories.fabric_type
              )
              .map((item) => item.subcategories.fabric_type)
          ),
        ];
        console.log(fabricTypes);
        setFabricTypes(fabricTypes);

        // Calculate min and max price from products
        const prices = data.map((item) => item.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [category]);

  const [discountRanges, setDiscountRanges] = useState([
    "0-10",
    "11-20",
    "21-30",
    "31-40",
    "41-50",
    "51-60",
  ]);
  const [selectedDiscountRanges, setSelectedDiscountRanges] = useState([]);

  const handleDiscountRangeChange = (range) => {
    const index = selectedDiscountRanges.indexOf(range);
    if (index === -1) {
      setSelectedDiscountRanges([...selectedDiscountRanges, range]);
    } else {
      const updatedRanges = [...selectedDiscountRanges];
      updatedRanges.splice(index, 1);
      setSelectedDiscountRanges(updatedRanges);
    }
  };

  const clearDiscountRangeFilter = () => {
    setSelectedDiscountRanges([]);
  };

  const handleMinPriceChange = (minPrice) => {
    setSelectedMinPrice(minPrice);
  };

  const handleMaxPriceChange = (maxPrice) => {
    setSelectedMaxPrice(maxPrice);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const clearRatingFilter = () => {
    setSelectedRating(null);
  };

  const toggleFilter = () => {
    setFilters(!filters);
  };

  const clearPriceFilter = () => {
    setSelectedMinPrice(null);
    setSelectedMaxPrice(null);
  };

  const updateApiUrl = (selectedCategory) => {
    setApiUrl(
      selectedCategory === "all"
        ? "http://localhost:5000/products"
        : `http://localhost:5000/products/category/${selectedCategory}`
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        const prices = data.map((item) => item.price);
        const newMinPrice = Math.min(...prices);
        const newMaxPrice = Math.max(...prices);
        setMinPrice(newMinPrice);
        setMaxPrice(newMaxPrice);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  useEffect(() => {
    setSelectedMinPrice(null);
    setSelectedMaxPrice(null);

    setSelectedRating(null);
    setSelectedBrands([]);
    setSelectedFabricTypes([]);
    setSelectedSizes([]);
    setSelectedDiscountRanges([]);
    setShowPriceFilter(false);
    setShowRatingFilter(false);
    setShowDiscountFilter(false);
    setShowBrandFilter(false);
    setShowFabricFilter(false);
    setShowSizeFilter(false);
    updateApiUrl(category);
  }, [category]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleBrandChange = (brand) => {
    const updatedSelectedBrands = [...selectedBrands];
    if (updatedSelectedBrands.includes(brand)) {
      const index = updatedSelectedBrands.indexOf(brand);
      updatedSelectedBrands.splice(index, 1);
    } else {
      updatedSelectedBrands.push(brand);
    }
    setSelectedBrands(updatedSelectedBrands);
  };

  const clearBrandFilter = () => {
    setSelectedBrands([]);
  };

  const handleFabricTypeChange = (fabricType) => {
    const updatedSelectedFabricTypes = [...selectedFabricTypes];
    if (updatedSelectedFabricTypes.includes(fabricType)) {
      const index = updatedSelectedFabricTypes.indexOf(fabricType);
      updatedSelectedFabricTypes.splice(index, 1);
    } else {
      updatedSelectedFabricTypes.push(fabricType);
    }
    setSelectedFabricTypes(updatedSelectedFabricTypes);
  };

  const clearFabricTypeFilter = () => {
    setSelectedFabricTypes([]);
  };

  const handleSizeChange = (size) => {
    const updatedSelectedSizes = [...selectedSizes];
    if (updatedSelectedSizes.includes(size)) {
      const index = updatedSelectedSizes.indexOf(size);
      updatedSelectedSizes.splice(index, 1);
    } else {
      updatedSelectedSizes.push(size);
    }
    setSelectedSizes(updatedSelectedSizes);
  };

  const clearSizeFilter = () => {
    setSelectedSizes([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <CountDown />
        {filters && (
          <div
            className={`col-lg-3 border-end ${!filters ? "col-sm-12" : ""} p-0`}
          >
            <div className="container">
              <div className="row">
                <div className="container mt-3 col-12 text-center mt-2">
                  <h1 className="mb-5">Filters</h1>
                  <hr />
                  <FilterCollapse
                    title="Brand"
                    items={brands}
                    selectedItems={selectedBrands}
                    onChange={handleBrandChange}
                    showFilter={showBrandFilter}
                    setShowFilter={setShowBrandFilter}
                    clearFilter={clearBrandFilter}
                  />
                  {fabricTypes.length > 0 && (
                    <>
                      <hr />
                      <FilterCollapse
                        title="Fabric"
                        items={fabricTypes}
                        selectedItems={selectedFabricTypes}
                        onChange={handleFabricTypeChange}
                        showFilter={showFabricFilter}
                        setShowFilter={setShowFabricFilter}
                        clearFilter={clearFabricTypeFilter}
                      />
                    </>
                  )}
                  {sizes.length > 0 && (
                    <>
                      <hr />
                      <FilterCollapse
                        title="Size"
                        items={sizes}
                        selectedItems={selectedSizes}
                        onChange={handleSizeChange}
                        showFilter={showSizeFilter}
                        setShowFilter={setShowSizeFilter}
                        clearFilter={clearSizeFilter}
                      />
                    </>
                  )}
                  <hr />
                  <div className="mb-3">
                    <div
                      className="d-flex align-items-center justify-content-around"
                      onClick={() => setShowPriceFilter(!showPriceFilter)}
                    >
                      <Button
                        aria-controls="PriceFilter"
                        aria-expanded={showPriceFilter}
                        variant="link"
                        className="p-0 mb-2 fw-semibold mb-1 p-0 text-black text-decoration-none me-4"
                      >
                        PRICE
                      </Button>
                      <span
                        className={`fa ${
                          showPriceFilter ? "fa-caret-up" : "fa-caret-down"
                        }`}
                      ></span>
                    </div>
                    
                    <Collapse in={showPriceFilter}>
                    <div id={`PriceFilter`} className="my-3">
                      <MultiThumbSlider
                        min={minPrice}
                        max={maxPrice}
                        step={1}
                        initialMinValue={
                          selectedMinPrice !== null
                            ? selectedMinPrice
                            : minPrice
                        }
                        initialMaxValue={
                          selectedMaxPrice !== null
                            ? selectedMaxPrice
                            : maxPrice
                        }
                        onChange={handleSliderChange}
                      />
                      </div>
                    </Collapse>
                  </div>

                  <hr />
                  <FilterCollapse
                    title="Rating"
                    items={[4, 3, 2, 1]}
                    selectedItems={selectedRating}
                    onChange={handleRatingChange}
                    showFilter={showRatingFilter}
                    setShowFilter={setShowRatingFilter}
                    clearFilter={clearRatingFilter}
                  />
                  <hr />
                  <FilterCollapse
                    title="Discount"
                    items={discountRanges}
                    selectedItems={selectedDiscountRanges}
                    onChange={handleDiscountRangeChange}
                    showFilter={showDiscountFilter}
                    setShowFilter={setShowDiscountFilter}
                    clearFilter={clearDiscountRangeFilter}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className={`col-lg-${filters ? "9" : "12"} ${
            !filters ? "col-sm-none" : ""
          }`}
        >
          <div className="container">
            <div className="row sticky-top justify-content-between">
              <div className="col-6">
                <button
                  onClick={toggleFilter}
                  className="border-0"
                  style={{
                    backgroundColor: "transparent",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <span className="fa fa-lg fa-filter fs-2 p-2"></span>
                </button>
              </div>
              <div className="col-4">
                <select
                  className="form-select form-select-xs border-dark rounded-0"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="">Sort By</option>
                  <option value="price">Low to High Price</option>
                  <option value="-price">High to low Price</option>
                  <option value="rating.rate">Customer Rating</option>
                </select>
              </div>
            </div>
          </div>
          <Product
            apiUrl={apiUrl}
            products={products}
            minPrice={selectedMinPrice || minPrice}
            maxPrice={selectedMaxPrice || maxPrice}
            rating={selectedRating}
            selectedDiscount={selectedDiscountRanges}
            selectedBrands={selectedBrands}
            selectedFabricTypes={selectedFabricTypes}
            selectedSizes={selectedSizes}
            sortBy={sortBy}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
