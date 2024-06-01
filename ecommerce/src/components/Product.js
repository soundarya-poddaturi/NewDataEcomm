import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../reduxtoolkit/CartSlice";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../reduxtoolkit/WishlistSlice";
import Login from "./Login";
import "./style.css";
// import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Toaster, toast } from "sonner";
import {
  addToStorageCart,
  deleteStorageWishlistItem,
  addToStorageWishlist,
} from "./StorageFunction";
import {
  addToGuestCart,
  addToGuestWishlist,
  deleteGuestWishlistItem,
} from "./GuestStorageFunctions";
import { FaStar } from "react-icons/fa";

const Product = ({
  apiUrl,
  searchQuery = "",
  minPrice,
  maxPrice,
  rating,
  sortBy,
  selectedDiscount,
  selectedBrands,
  selectedFabricTypes,
  selectedSizes,
  selectedTypes
}) => {
  // console.log(minPrice+" "+maxPrice);
  const location = useLocation();
  const selectedOffer = location.state && location.state.offer;
  // console.log(selectedOffer);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const baseURL = 'http://localhost:5000';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [apiUrl, searchQuery]);

  // Filter products based on criteria (minPrice, maxPrice, and rating)
  useEffect(() => {
    const applyFiltersAndSort = () => {
      console.log(selectedSizes);
      console.log(selectedBrands);
      console.log(selectedFabricTypes);
      console.log(selectedTypes);
      let filtered;
      if (products && products.length > 0) {
        // Check if products array is defined and not empty
        filtered = [...products]; // Copy products array to filtered
      } else {
        return; // Exit early if products array is empty or undefined
      }
      // Create a copy of products array to avoid mutating the original array

      // Apply sorting
      if (sortBy === "price") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === "-price") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortBy === "rating.rate") {
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
      }
      if (selectedOffer !== null && selectedOffer !== undefined) {
        filtered = filtered.filter((product) => {
          const discountPercentage = product.discount_percentage;
          return discountPercentage >= selectedOffer;
        });
      }

      // Apply filtering
      if (searchQuery.trim() !== "") {
        filtered = filtered.filter(
          (product) =>
            (product.title &&
              product.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) ||
            (product.description &&
              product.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
        );
      }

      if (minPrice !== null && minPrice !== undefined) {
        // console.log("in min");
        filtered = filtered.filter((product) => product.price >= minPrice);
        // console.log(filtered);
      }

      if (maxPrice !== null && maxPrice !== undefined) {
        filtered = filtered.filter((product) => product.price <= maxPrice);
      }

      if (rating !== null && rating !== undefined) {
        filtered = filtered.filter((product) => product.rating.rate >= rating);
      }

      // Apply size filtering
      if (selectedSizes !== undefined) {
        if (selectedSizes.length > 0) {
          filtered = filtered.filter((product) =>
            selectedSizes.some(
              (size) =>
                product.subcategories &&
                product.subcategories.sizes &&
                product.subcategories.sizes.includes(size)
            )
          );
        }
      }

      // Apply brand filtering
      if (selectedBrands !== undefined && selectedBrands != null) {
        if (selectedBrands.length > 0) {
          filtered = filtered.filter((product) =>
            selectedBrands.includes(product.brand)
          );
        }
      }
      console.log(selectedTypes);
      if (selectedTypes !== undefined ){
        if(selectedTypes.length > 0) {
        filtered = filtered.filter((product) => selectedTypes.includes(product.subcategories.type));
      }}
  
      // Apply fabric type filtering
      if (selectedFabricTypes !== undefined) {
        if (selectedFabricTypes != null && selectedFabricTypes.length > 0) {
          filtered = filtered.filter((product) =>
            selectedFabricTypes.includes(
              product.subcategories && product.subcategories.fabric_type
            )
          );
        }
      }
      if (selectedDiscount !== undefined) {
        if (selectedDiscount.length > 0) {
          filtered = filtered.filter((product) => {
            const discountPercentage = product.discount_percentage;
            return selectedDiscount.some((range) => {
              const [minDiscount, maxDiscount] = range.split("-").map(Number);
              return (
                discountPercentage >= minDiscount &&
                discountPercentage <= maxDiscount
              );
            });
          });
        }
      }
      setCurrentPage(1);
      setFilteredProducts(filtered);
    };

    applyFiltersAndSort();
  }, [
    products,
    searchQuery,
    minPrice,
    maxPrice,
    rating,
    sortBy,
    selectedDiscount,
    selectedOffer,
    selectedSizes,
    selectedBrands,
    selectedFabricTypes,
    selectedTypes,
  ]);

  //   useEffect(() => {
  //     // Apply filtering based on offer
  //     if (selectedOffer !== null && selectedOffer !== undefined) {
  //         setFilteredProducts(filteredProducts => {
  //             const filtered = filteredProducts.filter((product) => {
  //                 const discountPercentage = product.discount_percentage;
  //                 return discountPercentage >= selectedOffer;
  //             });
  //             console.log("Filtered products:", filtered); // Debug message
  //             return filtered;
  //         });
  //     }
  // }, [selectedOffer]);

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); // Select auth state
  const [showLoginModal, setShowLoginModal] = useState(false); // State variable to control the visibility of the login modal
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = auth.user?.id;

  // const handleAddToCart = (product) => {
  //   if (auth.isAuthenticated) {
  //     addToStorageCart(product, userId, 1);
  //     dispatch(addItem({ product, quantity: 1 }));
      
  //   } else {
  //     addToGuestCart(product, 1);
  //     dispatch(addItem({ product, quantity: 1 }));
  //   }
  // };
  const handleAddToCart = (product) => {
    let defaultSize = "";
  
    // Check if the product requires size selection and set a default size if available
    if (product.subcategories && product.subcategories.sizes && product.subcategories.sizes.length > 0) {
      defaultSize = product.subcategories.sizes[0]; // Assuming the first size as the default
    }
  
    const cartProduct = { ...product, selectedSize: defaultSize };
  
    if (auth.isAuthenticated) {
      addToStorageCart(cartProduct, userId, 1);
      dispatch(addItem({ product: cartProduct, quantity: 1 }));
    } else {
      addToGuestCart(cartProduct, 1);
      dispatch(addItem({ product: cartProduct, quantity: 1 }));
    }
  };
  

  const handleAddToWishlist = (item) => {
    if (isAuthenticated) {
      dispatch(addItemToWishlist(item));
      addToStorageWishlist(item, userId);
    } else {
      addToGuestWishlist(item);
      dispatch(addItemToWishlist(item));
    }
  };
  const handleRemoveFromWishlist = (itemId) => {
    if (isAuthenticated) {
      dispatch(removeItemFromWishlist(itemId));
      deleteStorageWishlistItem("WishList", userId, itemId);
    } else {
      deleteGuestWishlistItem(itemId);
      dispatch(removeItemFromWishlist(itemId));
    }
  };
  const cardItem = (item) => {
    const bfrPrice = item.discount_percentage
      ? item.price + (item.price * item.discount_percentage) / 100
      : null; // Set bfrPrice to null if there's no discount

    const isInWishlist = wishlistItems.some(
      (wishlistItem) => wishlistItem.id === item.id
    );
    const isItemInLocalStorageWishlist = JSON.parse(
      localStorage.getItem("GuestWishListItems") || "[]"
    ).some((wishlistItem) => wishlistItem.id === item.id);
    const heartIconClassName =
      isInWishlist || isItemInLocalStorageWishlist
        ? "fa-heart text-danger"
        : "fa-heart-o";

    const handleHeartIconClick = () => {
      if (isInWishlist || isItemInLocalStorageWishlist) {
        handleRemoveFromWishlist(item.id);
      } else {
        handleAddToWishlist(item);
      }
    };

    return (
      <div
        className="card1 my-2 p-0 "
        key={item.id}
        style={{ width: "18rem", height: "24rem" }}
      >
        <div className="text-decoration-none text-dark">
          {item.discount_percentage > 0 && (
            <div
              className="position-absolute px-2 py-1 bg-danger text-white rounded-start rounded-5  "
              style={{ zIndex: "100" }}
            >
              {item.discount_percentage}% OFF
            </div>
          )}

          <div className=" my-2 ">
            <Link
              to={`/products/${item.id}`}
              className="d-flex justify-content-center align-items-center"
              style={{ height: "200px" }}
            >
              <img
                src={`${baseURL}${item.image[0]}`} 
                className="card-img-top "
                alt={item.title}
                style={{
                  backgroundSize: "cover",
                  width: "230px",
                  height: "200px",
                }}
              />
            </Link>

            <div className="card-body  py-3 px-3">
              <div className="d-flex card-title justify-content-between align-items-baseline py-0" style={{ height: '30px' }}>
                <div>
                  <p className="fw-semibold fs-5 overflow-hidden text-truncate">
                    {item.brand}
                  </p>
                </div>
                <div>
                  <p className="overflow-hidden ">
                    ({item.rating.rate}) <FaStar />
                  </p>
                </div>
              </div>
              <p className="card-title overflow-hidden text-truncate">
                {item.title}
              </p>
              <div className="d-flex align-items-center ">
                {item.discount_percentage > 0 && (
                  <span
                    className="lead mt-2   text-danger  me-2 fs-6 "
                    style={{ textDecoration: "line-through" }}
                  >
                    $
                    {(
                      item.price +
                      (item.price * item.discount_percentage) / 100
                    ).toFixed(1)}
                  </span>
                )}
                <span className="lead mt-2 fw-bold">${item.price}</span>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center p-0 justify-content-center logos">
            <NavLink
              to="#"
              className="nav-link inner p-2"
              onClick={() => handleAddToCart(item)}
            >
              <span className="fa fa-shopping-cart"></span>
            </NavLink>
            <NavLink to={`/products/${item.id}`} className="nav-link inner p-2">
              <span className="fa fa-search-plus"></span>
            </NavLink>
            <NavLink
              to="#"
              className="nav-link inner p-2"
              onClick={handleHeartIconClick}
            >
              <span className={`fa ${heartIconClassName}`}></span>
            </NavLink>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Render the products */}
      <div className="container  mt-3">
        <div className="">
          {" "}
          <div className="bg-white px-3 py-2  font-monospace ">
            Showing{" "}
            <strong className="text-danger">
              {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, filteredProducts.length)}
            </strong>{" "}
            of{" "}
            <strong className="text-danger">{filteredProducts.length}</strong>{" "}
            products
          </div>
        </div>
      </div>

      <div className="container ">
        {currentItems.length > 0 ? (
          <div className="row justify-content-start">
            {currentItems.map((item) => (
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-10"
                key={item.id}
              >
                {cardItem(item, isAuthenticated, wishlistItems)}
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center mb-5 ">
            <p className="text-center mb-3 text-danger">No results found.</p>
            <img
              src={require("../ImagesO/image.png")}
              className="img-fluid m-5 "
              alt="No results"
            />
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProducts.length > itemsPerPage && (
        <div className="container mt-4 border-none">
          <ul className="pagination justify-content-center" id="page-numbers">
            {Array.from({
              length: Math.ceil(filteredProducts.length / itemsPerPage),
            }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                  style={{
                    backgroundColor:
                      currentPage === index + 1 ? "black" : "white",
                    color: currentPage === index + 1 ? "white" : "black",
                  }}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Render the Login component */}
      {showLoginModal && <Login closeModal={() => setShowLoginModal(false)} />}
    </div>
  );
};

export default Product;
