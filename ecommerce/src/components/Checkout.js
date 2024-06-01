import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteStorageCartItem, storeOrderLocally } from "./StorageFunction";
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
  const [promoCodeValid, setPromoCodeValid] = useState(true);
  const promoCodes = useSelector((state) => state.delivery.promoCodes);

  let items = [];
  if (checkoutItems) {
    items = checkoutItems;
  } else {
    items = cartItems;
  }

  const handlePromoCodeApply = () => {
    if (promoCode) {
      dispatch(applyPromoCode(promoCode));
      setPromoCodeValid(true);
    } else {
      setPromoCodeValid(false);
    }
  };

  const handleClearPromoCode = () => {
    dispatch(clearPromoCode());
    setPromoCode("");
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

  const [formErrors, setFormErrors] = useState({});

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.get("firstName"))
      errors.firstName = "First name is required.";
    if (!formData.get("lastName")) errors.lastName = "Last name is required.";
    if (!formData.get("address")) errors.address = "Address is required.";
    if (!formData.get("country")) errors.country = "Country is required.";
    if (!formData.get("state")) errors.state = "State is required.";
    if (!formData.get("zip")) errors.zip = "Zip code is required.";
    if (!formData.get("ccName")) errors.ccName = "Name on card is required.";
    if (!formData.get("ccNumber"))
      errors.ccNumber = "Credit card number is required.";
    else if (!/^[0-9]{12}$/.test(formData.get("ccNumber")))
      errors.ccNumber = "Credit card number should be 12 digits.";
    if (!formData.get("ccExpiration"))
      errors.ccExpiration = "Expiration date is required.";
    else if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(formData.get("ccExpiration")))
      errors.ccExpiration = "Expiration date should be in MM/YYYY format.";
    if (!formData.get("ccCvv")) errors.ccCvv = "CVV is required.";
    else if (!/^[0-9]{3}$/.test(formData.get("ccCvv")))
      errors.ccCvv = "CVV should be 3 digits.";
    return errors;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const firstErrorElement = document.querySelector(".is-invalid");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const calculatedDeliveryFee = subtotal < 100 ? deliveryFee : 0;
    let total = subtotal + calculatedDeliveryFee;

    if (promoCode && promoCodes[promoCode]) {
      const discountPercentage = promoCodes[promoCode];
      const promoCodeDiscount = (subtotal * discountPercentage) / 100;
      total -= promoCodeDiscount;
    }

    if (checkoutItems === undefined) {
      dispatch(clearCart());
      deleteStorageCartItem();
      cartItems.forEach((item) => {
        deleteStorageCartItem("cartItems", userId, item.id);
      });
    }

    storeOrderLocally(
      userId,
      items,
      total,
      promoCode,
      calculatedDeliveryFee,
      subtotal,
      promoCode
    );

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
                onSubmit={handleCheckout}
                noValidate
              >
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.firstName ? "is-invalid" : ""
                      }`}
                      id="firstName"
                      name="firstName"
                      placeholder=""
                      required
                    />
                    <div className="invalid-feedback">
                      {formErrors.firstName}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.lastName ? "is-invalid" : ""
                      }`}
                      id="lastName"
                      name="lastName"
                      placeholder=""
                      required
                    />
                    <div className="invalid-feedback">
                      {formErrors.lastName}
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        formErrors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
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
                      className={`form-control ${
                        formErrors.address ? "is-invalid" : ""
                      }`}
                      id="address"
                      name="address"
                      placeholder="1234 Main St"
                      required
                    />
                    <div className="invalid-feedback">{formErrors.address}</div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="address2" className="form-label">
                      Address 2 <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address2"
                      name="address2"
                      placeholder="Apartment or suite"
                    />
                  </div>

                  <div className="col-md-5">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <select
                      className={`form-select ${
                        formErrors.country ? "is-invalid" : ""
                      }`}
                      id="country"
                      name="country"
                      required
                    >
                      <option value="">Choose...</option>
                      <option>United States</option>
                    </select>
                    <div className="invalid-feedback">{formErrors.country}</div>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <select
                      className={`form-select ${
                        formErrors.state ? "is-invalid" : ""
                      }`}
                      id="state"
                      name="state"
                      required
                    >
                      <option value="">Choose...</option>
                      <option>California</option>
                    </select>
                    <div className="invalid-feedback">{formErrors.state}</div>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="zip" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.zip ? "is-invalid" : ""
                      }`}
                      id="zip"
                      name="zip"
                      placeholder=""
                      required
                    />
                    <div className="invalid-feedback">{formErrors.zip}</div>
                  </div>
                </div>
              </form>
            )}
            {/* Payment section */}
            {!isAuthenticated && (
              <>
                <h4 className="my-4">Payment</h4>
                <form
                  className="needs-validation"
                  onSubmit={handleCheckout}
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
                  <div className="row gy-3 my-4">
                    <div className="col-md-6">
                      <label htmlFor="cc-name" className="form-label">
                        Name on card
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          formErrors.ccName ? "is-invalid" : ""
                        }`}
                        id="cc-name"
                        name="ccName"
                        placeholder=""
                        required
                      />
                      <div className="invalid-feedback">
                        {formErrors.ccName}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="cc-number" className="form-label">
                        Credit card number
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          formErrors.ccNumber ? "is-invalid" : ""
                        }`}
                        id="cc-number"
                        name="ccNumber"
                        placeholder=""
                        required
                      />
                      <div className="invalid-feedback">
                        {formErrors.ccNumber}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="cc-expiration" className="form-label">
                        Expiration
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          formErrors.ccExpiration ? "is-invalid" : ""
                        }`}
                        id="cc-expiration"
                        name="ccExpiration"
                        placeholder="MM/YYYY"
                        required
                      />
                      <div className="invalid-feedback">
                        {formErrors.ccExpiration}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="cc-cvv" className="form-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          formErrors.ccCvv ? "is-invalid" : ""
                        }`}
                        id="cc-cvv"
                        name="ccCvv"
                        placeholder=""
                        required
                      />
                      <div className="invalid-feedback">{formErrors.ccCvv}</div>
                    </div>
                  </div>
                </form>
              </>
            )}
            {/* Conditional rendering based on authentication */}
            {isAuthenticated && (
              <form
                className="needs-validation"
                onSubmit={handleCheckout}
                noValidate
              >
                {/* Payment form */}
                <h4 className="my-4">Payment</h4>
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
                <div className="row gy-3 my-4">
                  <div className="col-md-6">
                    <label htmlFor="cc-name" className="form-label">
                      Name on card
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.ccName ? "is-invalid" : ""
                      }`}
                      id="cc-name"
                      name="ccName"
                      placeholder=""
                      required
                    />
                    <div className="invalid-feedback">{formErrors.ccName}</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="cc-number" className="form-label">
                      Credit card number
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.ccNumber ? "is-invalid" : ""
                      }`}
                      id="cc-number"
                      name="ccNumber"
                      placeholder=""
                      required
                    />
                    <div className="invalid-feedback">
                      {formErrors.ccNumber}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="cc-expiration" className="form-label">
                      Expiration
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.ccExpiration ? "is-invalid" : ""
                      }`}
                      id="cc-expiration"
                      name="ccExpiration"
                      placeholder="MM/YYYY"
                      required
                    />
                    <div className="invalid-feedback">
                      {formErrors.ccExpiration}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="cc-cvv" className="form-label">
                      CVV
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.ccCvv ? "is-invalid" : ""
                      }`}
                      id="cc-cvv"
                      name="ccCvv"
                      placeholder=""
                      required
                    />
                    <div className="invalid-feedback">{formErrors.ccCvv}</div>
                  </div>
                </div>
              </form>
            )}
            <button
              className="btn btn-fa btn-danger border-0 rounded-0"
              type="submit"
            >
              Continue to checkout
            </button>
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
                    onChange={(e) => setPromoCode(e.target.value)}
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
                <p className="text-muted">Please enter a valid promo code</p>
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
