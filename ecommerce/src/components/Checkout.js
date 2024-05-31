import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteStorageCartItem ,storeOrderLocally} from "./StorageFunction";
import { clearCart } from "../reduxtoolkit/CartSlice";
import Cartdetails from "./Cartdetails";
import { applyPromoCode, clearPromoCode } from "../reduxtoolkit/deliverySlice";
const Checkout = () => {
  const location = useLocation();
  const checkoutItems = location.state?.checkoutItem;
  const [promoCode, setPromoCode] = useState("");
  const deliveryFee = useSelector((state) => state.delivery.deliveryFee);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [userAddress, setUserAddress] = useState(null);
  const userId = useSelector((state) => state.auth.user?.id);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [promoCodeValid, setPromoCodeValid] = useState(true); // State variable to track promo code validity
  const promoCodes = useSelector((state) => state.delivery.promoCodes); // Get promo codes from Redux store

  let items = [];
  if (checkoutItems) {
    items = checkoutItems;
  } else {
    items = cartItems;
  }
  const handlePromoCodeApply = () => {
    if (promoCode) {
      dispatch(applyPromoCode(promoCode)); // Dispatch promo code value
      setPromoCodeValid(true); // Reset promo code validity
    } else {
      setPromoCodeValid(false); // Set promo code as invalid if it's empty
    }
  };

  const handleClearPromoCode = () => {
    dispatch(clearPromoCode()); // Dispatch action to clear the promo code
    setPromoCode("")
  };

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        if (userId) {
          const response = await fetch(`http://localhost:5000/users/${userId}`);

          const userData = await response.json();
          setUserAddress(userData.address);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isAuthenticated) {
      fetchUserAddress();
    }
  }, [isAuthenticated, userId]);
  const handleCheckout = (e) => {
    e.preventDefault();
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const calculatedDeliveryFee = subtotal < 100 ? deliveryFee : 0;
  let total = subtotal + calculatedDeliveryFee;
  
  // Apply promo code discount if applicable
  if (promoCode && promoCodes[promoCode]) {
    const discountPercentage = promoCodes[promoCode];
    const promoCodeDiscount = (subtotal * discountPercentage) / 100;
    total -= promoCodeDiscount; // Deduct promo code discount from total
  }
 
    console.log(checkoutItems);
    if (checkoutItems === undefined) {
      dispatch(clearCart());
      deleteStorageCartItem();
      cartItems.forEach((item) => {
        deleteStorageCartItem("cartItems", userId, item.id); 
      });
    }
    console.log(promoCode);
    storeOrderLocally(userId, items, total, promoCode, calculatedDeliveryFee, subtotal, promoCodes);

    console.log("dine")
    dispatch(clearPromoCode());
    setPromoCode("");

    navigate("/confirmation");
  };

  return (
    <>
     <div className="container">
     <div className="row g-5 my-4 mx-4 flex-md-row flex-column-reverse">
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Billing address</h4>
          {isAuthenticated && userAddress && (
            <div>
              <p>
                Address: {userAddress.street}, {userAddress.suite},{" "}
                {userAddress.city}, {userAddress.zipcode}
              </p>
            </div>
          )}
          {!isAuthenticated && (
            <form
              className="needs-validation"
              onSubmit={(e) => {
                handleCheckout(e);
              }}
              noValidate
            >
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    value=""
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    value=""
                    required
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="address2" className="form-label">
                    Address 2 <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder="Apartment or suite"
                  />
                </div>

                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <select className="form-select" id="country" required>
                    <option value="">Choose...</option>
                    <option>United States</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <select className="form-select" id="state" required>
                    <option value="">Choose...</option>
                    <option>California</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>
            </form>
          )}

          {/* Payment section */}
          <h4 className="mb-3">Payment</h4>
          <form
            className="needs-validation"
            onSubmit={(e) => {
              handleCheckout(e);
            }}
            noValidate
          >
            <div className="my-3">
              <div className="form-check">
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  className="form-check-input"
                  checked
                  required
                />
                <label className="form-check-label" htmlFor="credit">
                  Credit card
                </label>
              </div>
              <div className="form-check">
                <input
                  id="debit"
                  name="paymentMethod"
                  type="radio"
                  className="form-check-input"
                  required
                />
                <label className="form-check-label" htmlFor="debit">
                  Debit card
                </label>
              </div>
              <div className="form-check">
                <input
                  id="paypal"
                  name="paymentMethod"
                  type="radio"
                  className="form-check-input"
                  required
                />
                <label className="form-check-label" htmlFor="paypal">
                  PayPal
                </label>
              </div>
            </div>
            <div className="row gy-3 my-4 ">
              <div className="col-md-6">
                <label htmlFor="cc-name" className="form-label">
                  Name on card
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-name"
                  placeholder=""
                  required
                />
                <small className="text-muted">
                  Full name as displayed on card
                </small>
                <div className="invalid-feedback">
                  Name on card is required.
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="cc-number" className="form-label">
                  Credit card number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-number"
                  placeholder=""
                  required
                />
                <div className="invalid-feedback">
                  Credit card number is required.
                </div>
              </div>
              <div className="col-md-3">
                <label htmlFor="cc-expiration" className="form-label">
                  Expiration
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-expiration"
                  placeholder=""
                  required
                />
                <div className="invalid-feedback">
                  Expiration date required.
                </div>
              </div>
              <div className="col-md-3">
                <label htmlFor="cc-cvv" className="form-label">
                  CVV
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-cvv"
                  placeholder=""
                  required
                />
                <div className="invalid-feedback">Security code required.</div>
              </div>
            </div>
            {/* <hr className="my-4" /> */}
            <button  className=" btn btn-fa btn-danger border-0 rounded-0" type="submit">
              Continue to checkout
            </button>
          </form>
        </div>

        <div className="col-md-5 col-lg-4 order-md-last">
          <div className="mb-4">
            <form className="card p-1">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)} // Update promo code state
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePromoCodeApply}
                >
                  Redeem
                </button>
                {promoCode && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleClearPromoCode}
                  >
                    Clear
                  </button>
                )}
                
              </div>
            </form>
            {!promoCodeValid && (
                  <p className="text-muted">
                    Please enter a valid promo code
                  </p>
                )}
          </div>
          <Cartdetails items={items} />
        </div>
      </div>
      </div>
    </>
  );
};

export default Checkout;

