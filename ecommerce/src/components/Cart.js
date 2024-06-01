import { useSelector, useDispatch } from "react-redux";
import { delItem, updateQuantity, updateSize } from "../reduxtoolkit/CartSlice";
import { NavLink } from "react-router-dom";
import "./style.css";
import { addItemToWishlist } from "../reduxtoolkit/WishlistSlice";
import { useState } from "react";
import Login from "./Login";
import {
  deleteStorageCartItem,
  addToStorageWishlist,
  updateStorageItemQuantity,
  updateStorageItemSize,
} from "./StorageFunction";
import Cartdetails from "./Cartdetails";
import {
  addToGuestWishlist,
  deleteGuestCartItem,
  updateGuestCartItemQuantity,
  updateGuestCartItemSize,
} from "./GuestStorageFunctions";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const auth = useSelector((state) => state.auth);
  const userId = auth.user?.id;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const baseURL = "http://localhost:5000";
  const dispatch = useDispatch();

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleClose = (itemId) => {
    console.log("deleting....");
    dispatch(delItem(itemId));
    deleteStorageCartItem("cartItems", userId, itemId);
    if (!isAuthenticated) {
      deleteGuestCartItem(itemId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    updateStorageItemQuantity("cartItems", userId, itemId, newQuantity);
    if (!isAuthenticated) {
      updateGuestCartItemQuantity(itemId, newQuantity);
    }
  };

  const handleSizeChange = (itemId, newSize) => {
    dispatch(updateSize({ id: itemId, size: newSize }));
    updateStorageItemSize("cartItems", userId, itemId, newSize);
    if (!isAuthenticated) {
      updateGuestCartItemSize(itemId, newSize);
    }
  };

  const handleAddToWishlist = (item, itemId, item1) => {
    const { id, title, price, image } = item[0];
    if (isAuthenticated) {
      dispatch(addItemToWishlist({ id, title, price, image }));
      dispatch(delItem(itemId));
      deleteStorageCartItem("cartItems", userId, itemId);
      addToStorageWishlist(item1, userId);
    } else {
      addToGuestWishlist(item1);
      dispatch(addItemToWishlist(item1));
      deleteGuestCartItem(itemId);
      dispatch(delItem(itemId));
    }
  };

  const cartItems = items.map((cartItem) => (
    <div className="px-3 mb-2 mt-5 rounded-3" key={cartItem.id}>
      <div className="container py-4 card2">
        <div className="row">
          <div className="col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
            {/* Image column */}
            <NavLink
              to={`/products/${cartItem.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={`${baseURL}${cartItem.image[0]}`}
                alt={cartItem.title}
                className="img-fluid"
                style={{ height: "220px", backgroundSize: "cover" }}
              />
            </NavLink>
          </div>
          <div className="col-md-5 col-sm-12  centering">
            {/* Item details column */}
            <h3>{cartItem.brand}</h3>
            <p className="">{cartItem.title}</p>
            <div className="mt-3">
              <p className="lead">${cartItem.price}</p>
              <p className="lead fw-bold">
                SubTotal: ${cartItem.price * cartItem.quantity}
              </p>
            </div>
          </div>
          <div className="col-md-3 col-sm-12 d-flex flex-column align-items-center justify-content-evenly">
            {/* Remove and quantity adjustment column */}
            <div className="d-flex align-items-center justify-content-center mb-3">
              <div className="d-flex align-items-center justify-content-center">
              {cartItem.subcategories.sizes &&
                <select
                  className="form-select mb-3"
                  value={cartItem.selectedSize || cartItem.subcategories.sizes[0]}
                  onChange={(e) => handleSizeChange(cartItem.id, e.target.value)}
                >
                  <option value="">Select Size</option>
                  {cartItem.subcategories.sizes.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>}

                <div
                  className="btn btn-items btn-items-decrease"
                  onClick={() =>
                    handleQuantityChange(cartItem.id, cartItem.quantity - 1)
                  }
                >
                  -
                </div>
                <input
                  className="form-control text-center input-items w-50 border-dark rounded-0"
                  type="text"
                  value={cartItem.quantity}
                  readOnly
                />
                <div
                  className="btn btn-items btn-items-increase"
                  onClick={() =>
                    handleQuantityChange(cartItem.id, cartItem.quantity + 1)
                  }
                >
                  +
                </div>
              </div>
            </div>
            <button
              className="btn btn-danger rounded-0 mx-auto"
              onClick={() => handleClose(cartItem.id)}
            >
              Remove from bag
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  const emptyCart = (
    <div className="container py-4 my-auto">
      <div className="row justify-content-center d-flex">
        <div className="col-md-6 text-center mb-3">
          <img
            src="assets/logo/empty-cart-1.png"
            alt="Empty Cart"
            className="img-fluid"
          />
          <h3 className="text-danger mb-3">Your Cart is Empty</h3>
          <p className="lead mb-3">
            Add some items to your cart to get started
          </p>
          <button className="btn btn-danger rounded-0 ">
            <NavLink className="text-decoration-none text-white" to="/">
              Continue Shopping
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  );

  const checkoutButton = (
    <div className="container">
      <div className="row">
        <NavLink
          to="/checkout"
          className="btn btn-dark mb-5 w-50 rounded-0 mx-auto"
        >
          Proceed To checkout
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      {items.length === 0 ? emptyCart : cartItems}
      {items.length > 0 && (
        <div>
          {showLoginModal && <Login closeModal={handleCloseLoginModal} />}
          <div className="my-5 rounded-3 py-5">
            <div className="d-flex justify-content-center align-items-center flex-column">
              <div>
                <h4 className="text-center py-4">Price Details</h4>
              </div>
              <div>
                <Cartdetails items={items} />
              </div>
              <div>
                {isAuthenticated ? (
                  <div
                    className="d-flex align-items-center my-2"
                    onClick={scrollToTop}
                  >
                    <NavLink
                      to="/checkout"
                      className="btn btn-danger mb-5 rounded-0 mx-auto"
                    >
                      Proceed To checkout
                    </NavLink>
                  </div>
                ) : (
                  <div className="d-flex align-items-center my-2">
                    <button
                      className="btn btn-danger mb-5 rounded-0 mx-auto"
                      onClick={handleShowLoginModal}
                    >
                      Login to Proceed
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
