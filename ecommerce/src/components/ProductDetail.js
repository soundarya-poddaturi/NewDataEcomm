import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, delItem, delStorageItem } from "../reduxtoolkit/CartSlice";
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
  const imagePaths = [
    "/assets/images/category/cat-1.jpg",
    "/assets/images/category/cat-12.jpg",
    "/assets/images/category/cat-3.jpg",
    "/assets/images/category/cat-1.jpg",
    "/assets/images/category/cat-12.jpg",
    "/assets/images/category/cat-3.jpg",
    "/assets/images/category/cat-1.jpg",
    "/assets/images/category/cat-12.jpg",
    "/assets/images/category/cat-3.jpg",
    "/assets/images/category/cat-1.jpg",
    "/assets/images/category/cat-12.jpg",
    "/assets/images/category/cat-3.jpg",
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setProduct(response.data);
        console.log(response.data);
        setMainImage(response.data.image);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCart = () => {
    console.log("gdgd");
    if (!checkSize()) return;
    console.log("dgdgd");
    if (!auth.isAuthenticated) {
      addToGuestCart(product, quantity);
    }

    if (cartBtn === "Add to Cart") {
      dispatch(addItem({ product, quantity }));
      const userId = auth.user?.id;
      addToStorageCart(product, userId, quantity);
      setCartBtn("Move To Cart");
    } else {
      navigate("/cart");
    }
  };

  const handleWishlist = () => {
    console.log(product);
    const { id, title, price, image } = product;
    if (isAuthenticated) {
      dispatch(addItemToWishlist({ id, title, price, image }));
      addToStorageWishlist(product, userId);
    } else {
      addToGuestWishlist(product);
      dispatch(addItemToWishlist({ id, title, price, image }));
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  const checkSize = () => {
    if (selectedSize === "") {
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
    <div className="container my-5 py-3">
      <div className="row">
        {/* Main Image and Thumbnails */}
        <div className="col-md-6 d-flex flex-wrap">
          {/* Main Image */}
          <img
            className="img-thumbnail img-fluid border-0 mb-5"
            src={mainImage}
            alt={product.title}
            style={{
              width: "500px",
              height: "500px",
              backgroundSize: "cover",
              cursor: "pointer",
            }}
            onClick={() => handleMainImageChange(product.image)}
          />
          {/* Thumbnail Container */}
          <div
            className="thumbnail-container d-flex"
            style={{
              maxWidth: "500px",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <img
              className="img-thumbnail img-fluid border-0 mb-5"
              src={product.image}
              alt={product.title}
              style={{
                width: "100px",
                height: "100px",
                backgroundSize: "cover",
                cursor: "pointer",
              }}
              onClick={() => handleMainImageChange(product.image)}
            />
            {imagePaths.map((path, index) => (
              <img
                key={index}
                src={path}
                className="img-thumbnail thumbnail border-0"
                alt="Thumbnail"
                style={{
                  cursor: "pointer",
                  width: "100px",
                  height: "100px",
                  backgroundSize: "cover",
                }}
                onMouseOver={() => handleMainImageChange(path)}
              />
            ))}
          </div>
        </div>
        {/* Thumbnails and Product Information */}
        <div className="col-md-6">
          <div className="row">
            {/* Product Information */}
            <div className="col-md-12">
              <h2 className="my-3">{product.brand}</h2>
              <h3 className="display-6 fw-bold">{product.title}</h3>
              <div className="">
                {/* {Array.from({ length: product.rating.rate }).map((_, index) => (
                  <i key={index} className="fa fa-star me-2" aria-hidden="true"></i>
                ))} */}
                <span className="fw-bold  border-end p-1">
                  {product.rating.rate}{" "}
                  <i className="fa fa-star me-2" aria-hidden="true"></i>
                </span>
                <span className=" p-1">({product.rating.count} Ratings)</span>
              </div>
              {product.discount_percentage > 0 && (
                <div className="d-flex align-items-center p-2">
                  <small
                    className=" text-muted me-2 fs-5"
                    style={{ textDecoration: "line-through" }}
                  >
                    $
                    {(
                      product.price +
                      (product.price * product.discount_percentage) / 100
                    ).toFixed(1)}
                  </small>
                  <small className=" text-danger fw-bold fs-5">
                    ({product.discount_percentage}% off)
                  </small>
                </div>
              )}
              <hr />

              <h2 className="my-2 fw-semibold ">${product.price}</h2>

              <p className="text-capitalize lead">{product.description}</p>
              {/* Size Selection */}
              <albel>Size</albel>
              {product.subcategories && product.subcategories.sizes && (
                <div className="size-options">
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
                      />
                      {size}
                    </label>
                  ))}
                </div>
              )}
              {/* Quantity selection */}
              <div className="mb-2">
                <label htmlFor="quantity" className="form-label">
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

              {/* Stock Availability and Delivery Time */}

              <div className="mb-3">
                <p>
                  <strong>Delivery Time : </strong> {product.delivery_time}
                </p>
                {product.subcategories && (
                  <>
                    {product.subcategories.fabric_type &&
                    <p>
                      <strong>Fabric Type:</strong>
                      {product.subcategories.fabric_type}
                    </p>
}
                    {product.subcategories.fit &&<p>
                      <strong>Fit:</strong> {product.subcategories.fit}
                    </p>}
                  </>
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
      {showLoginModal && <Login closeModal={() => setShowLoginModal(false)} />}
    </div>
  );
};

export default ProductDetail;
