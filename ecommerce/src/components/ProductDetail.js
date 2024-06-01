import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../reduxtoolkit/CartSlice";
import { addItemToWishlist } from "../reduxtoolkit/WishlistSlice";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

import { addToStorageCart, addToStorageWishlist } from "./StorageFunction";
import { addToGuestCart, addToGuestWishlist } from "./GuestStorageFunctions";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [cartBtn, setCartBtn] = useState("Add to Cart");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const userId = auth.user?.id;
  const baseURL = "http://localhost:5000";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setProduct(response.data);
        console.log(response.data);
        setMainImage(`${baseURL}${response.data.image[0]}`);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCart = () => {
    if (!checkSize()) return;
    if (!auth.isAuthenticated) {
      addToGuestCart({ ...product, selectedSize, quantity });
    }

    if (cartBtn === "Add to Cart") {
      dispatch(addItem({ product: { ...product, selectedSize }, quantity }));
      const userId = auth.user?.id;
      addToStorageCart({ ...product, selectedSize }, userId, quantity);
      setCartBtn("Move To Cart");
    } else {
      navigate("/cart");
    }
  };

  const handleWishlist = () => {
    console.log(product);
    const { id, title, price, image, rating, brand } = product;
    if (isAuthenticated) {
      dispatch(addItemToWishlist({ id, title, price, image, rating, brand }));
      addToStorageWishlist(product, userId);
    } else {
      addToGuestWishlist(product);
      dispatch(addItemToWishlist({ id, title, price, image, rating, brand }));
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const checkSize = () => {
    if (
      product.subcategories &&
      product.subcategories.sizes &&
      product.subcategories.sizes.length > 0 &&
      selectedSize === ""
    ) {
      const sizeContainer = document.querySelector(".size-options");
      sizeContainer.scrollIntoView({ behavior: "smooth", block: "center" });
      const sizeWarning = document.createElement("p");
      sizeWarning.textContent = "Please choose a size";
      sizeWarning.style.color = "red";
      sizeContainer.parentNode.insertBefore(
        sizeWarning,
        sizeContainer.nextSibling
      );
      setTimeout(() => {
        sizeWarning.remove();
      }, 3000);

      return false;
    }
    return true;
  };

  const handleBuyNow = () => {
    if (!checkSize()) return;
    if (isAuthenticated) {
      const checkoutItem = [{ ...product, quantity }];
      console.log(checkoutItem);
      navigate("/checkout", { state: { checkoutItem } });
    } else {
      setShowLoginModal(true); // Open the login modal
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleMainImageChange = (image) => {
    setMainImage(image);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="back">
      <div className="container my-5 py-3">
        <div className="row">
          {/* Main Image and Thumbnails */}
          <div className="col-md-6 d-flex flex-wrap align-content-lg-start">
            {/* Main Image */}
            <img
              className="img-thumbnail img-fluid border-0 mb-5"
              src={mainImage}
              alt={product.title}
              style={{
                width: "800px",
                height: "600px",
                backgroundSize: "cover",
                cursor: "pointer",
                // backgroundColor:"gray"
              }}
              onClick={() =>
                handleMainImageChange(`${baseURL}${product.image[0]}`)
              }
            />
            {/* Thumbnail Container */}
            {product.image.length > 1 && (
              <div
                className="thumbnail-container d-flex"
                style={{
                  maxWidth: "500px",
                  overflowX: "auto",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {product.image.map((img, index) => (
                  <img
                    key={index}
                    src={`${baseURL}${img}`}
                    className="img-thumbnail thumbnail border-0"
                    alt="Thumbnail"
                    style={{
                      cursor: "pointer",
                      width: "100px",
                      height: "100px",
                      backgroundSize: "cover",
                    }}
                    onMouseOver={() =>
                      handleMainImageChange(`${baseURL}${img}`)
                    }
                  />
                ))}
              </div>
            )}
          </div>
          {/* Thumbnails and Product Information */}
          <div className="col-md-6">
            <div className="row">
              {/* Product Information */}
              <div className="col-md-12">
                <p className="my-1 font">{product.brand}</p>
                <p className=" fw-semibold fs-4 m-0" >{product.title}</p>
                <div className="d-flex align-items-baseline justify-content-between">
                  <div>
                  <span className="fw-bold  border-end p-1">
                    {product.rating.rate}{" "}
                    <i className="fa fa-star me-2" aria-hidden="true"></i>
                  </span>
                 
                  <span className=" p-1">({product.rating.count} Ratings)</span>
                  </div>
                  {product.discount_percentage > 0 && (
                    <div className="d-flex  p-2">
                      <small
                        className=" text-muted me-2 "
                        style={{ textDecoration: "line-through" }}
                      >
                        $
                        {(
                          product.price +
                          (product.price * product.discount_percentage) / 100
                        ).toFixed(1)}
                      </small>
                      <small className=" text-danger fw-bold ">
                        ({product.discount_percentage}% off)
                      </small>
                    </div>
                  )}
                </div>

                <hr className="mt-0 mb-1" />

                <h3 className="my-2 fw-semibold ">${product.price}</h3>

                {/* Size Selection */}
                {product.subcategories &&
                  product.subcategories.sizes &&
                  product.subcategories.sizes.length > 0 && (
                    <>
                      <label className="text-muted">Size</label>
                      <div  className="size-options" role="radiogroup" aria-labelledby="size">
                        {product.subcategories.sizes.map((size, index) => (
                          <label
                            key={index}
                            className={`size-option ${
                              selectedSize === size ? "selected" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              value={size}
                              checked={selectedSize === size}
                              onChange={() => handleSizeChange(size)}
                              className="d-none"
                              aria-checked={selectedSize === size ? "true" : "false"}
                            />
                            {size}
                          </label>
                        ))}
                      </div>
                    </>
                  )}
                {/* Quantity selection */}
                <div className="mb-2">
                  <label htmlFor="quantity" className="form-label text-muted mb-0">
                    Quantity
                  </label>
                  <select
                    className="form-select mb-2 border-2"
                    style={{ width: "25%" }}
                    value={quantity}
                    onChange={handleQuantityChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <p className="fs-6 lead">{product.description}</p>

                {/* Stock Availability and Delivery Time */}
                <div className="mb-3">
                  <p>
                    <strong>Delivery Time: </strong> {product.delivery_time}
                  </p>
                  {product.subcategories &&
                    Object.keys(product.subcategories).length > 0 && (
                      <div className="card">
                        <div className="card-header">
                          <strong>Product Details</strong>
                        </div>
                        <ul className="list-group list-group-flush">
                          {Object.entries(product.subcategories)
                            .filter(([key]) => key !== "sizes") // Filter out 'sizes' key
                            .map(([key, value], index) => (
                              <li className="list-group-item" key={index}>
                                <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                                {value}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                </div>

                {/* Add to Cart Button */}
                <div className="d-flex flex-column">
                  <div className="d-flex flex-start my-4">
                    <button
                      className="btn btn-dark rounded-0 me-3 w-25"
                      onClick={handleWishlist}
                    >
                      Wishlist
                    </button>
                    <button
                      className="btn btn-dark rounded-0 w-25"
                      onClick={handleCart}
                    >
                      {cartBtn}
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn btn-warning rounded-0 "
                      style={{ width: "53%" }}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showLoginModal && (
          <Login closeModal={() => setShowLoginModal(false)} />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
