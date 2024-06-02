import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
const OrderDetails = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.user?.id);
  const [orders, setOrders] = useState([]);
  const [userAddress, setUserAddress] = useState({});
  const [productDetails, setProductDetails] = useState([]);
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";
  useEffect(() => {
    if (isAuthenticated && userId) {
      axios
        .get(`http://localhost:5000/orders/${userId}`)

        .then((response) => {
          const fetchedOrders = response.data;
          console.log(fetchedOrders);
          const storedOrders = JSON.parse(localStorage.getItem("orders")) || {};
          const userStoredOrders = storedOrders[userId] || [];
          console.log(userStoredOrders);
          const mergedOrders = [
            ...userStoredOrders.reverse(),
            ...fetchedOrders,
          ];
          setOrders(mergedOrders);
        })
        .catch((error) => {
          console.error("Error fetching order details:", error);
        });

      axios
        .get(`http://localhost:5000/users/${userId}`)
        .then((response) => {
          console.log(response.data.address);
          setUserAddress(response.data.address);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [isAuthenticated, userId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const details = await Promise.all(
        orders
          .flatMap((order) =>
            order.products.map((product) => product.productId)
          )
          .map((productId) => {
            console.log(productId); // Log the product ID

            return axios
              .get(`http://localhost:5000/products/${productId}`)
              .then((response) => response.data)
              .catch((error) => {
                console.error(
                  `Error fetching product details for product ID ${productId}:`,
                  error
                );
                return null;
              });
          })
      );
      setProductDetails(details);
    };

    if (orders.length > 0) {
      fetchProductDetails();
    }
  }, [orders]);

  if (orders.length === 0) {
    return <div>You haven't made any orders yet.</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="mx-lg-4 my-5 card2 border-0 border-none">
      {orders.map((order, orderIndex) => (
        <div
          key={orderIndex}
          className="border-none card card-sm mb-3   rounded-0"
        >
          <div className="card-body border-none rounded-0  ">
            <div className=" card-sm bg-body-tertiary  ">
              <div className="card-body  p-0 rounded-0 border-none">
                <div className="row p-3  ">
                  <div className="col-6 col-lg-3">
                    <h6 className="heading-xxxs  text-primary">Order No:</h6>
                    <p className="mb-lg-0 fs-sm ">{order.id}</p>
                  </div>
                  <div className="col-6 col-lg-3">
                    <h6 className="heading-xxxs text-primary">Shipped date:</h6>
                    <p className="mb-lg-0 fs-sm ">{formatDate(order.date)}</p>
                  </div>
                  <div className="col-12 col-lg-6">
                    <h6 className="heading-xxxs text-primary">
                      Shipping Address:
                    </h6>
                    <p className="mb-lg-0 fs-sm text-capitalize">
                      {order.address ? (
                        <>
                          {order.address.addressValue},{" "}
                          {order.address.countryValue},{" "}
                          {order.address.stateValue}, {order.address.zipValue}
                        </>
                      ) : (
                        <>
                          {userAddress.street}, {userAddress.city},{" "}
                          {userAddress.number}, {userAddress.zipcode}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer bg-body">
            <h6 className="mb-5 text-primary ">
              Order Items ({order.products.length})
            </h6>

            <ul className="list-group list-group-lg list-group-flush-y list-group-flush-x border-none rounded-0 ">
              {order.products.map((product, productIndex) => {
                const productDetail = productDetails.find(
                  (detail) => detail.id === product.productId
                );
                const subtotal = productDetail
                  ? productDetail.price * product.quantity
                  : 0;
                return (
                  <li
                    key={productIndex}
                    className="list-group-item border-0 p-0"
                  >
                    <div className="row align-items-center">
                      <div className="col-4 col-md-3 col-xl-2">
                        {productDetail && (
                          <img
                            src={`${baseURL}${productDetail.image[0]}`}
                            alt={`Product ${product.productId}`}
                            className="img-fluid w-100"
                          />
                        )}
                      </div>

                      <div className="col-8 col-md-9 col-xl-10 border-none rounded-0">
                        <div style={{ maxWidth: "100%" }}>
                          <p className="fs-sm mb-0">
                            {productDetail && (
                              <span className="text-muted d-block">
                                {productDetail.brand}
                              </span>
                            )}
                            <NavLink
                              to={`products/${product.productId}`}
                              className="text-body fw-bold text-truncate d-block"
                              style={{
                                display: "inline-block",
                                maxWidth: "100%",
                              }}
                            >
                              {productDetail && productDetail.title}
                            </NavLink>
                          </p>
                          <p className="fs-sm text-muted">
                            Quantity: {product.quantity}
                            <br />
                            Price: $
                            {productDetail && productDetail.price.toFixed(2)}
                            <br />
                            Subtotal: ${subtotal.toFixed(2)}
                            <br />
                            {product.selectedSize && (
                              <>
                                <span>Size: {product.selectedSize}</span>
                                <br />
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </li>
                );
              })}
            </ul>
            <div className=" bg-body-tertiary p-2 ">
              <h6 className="mb-4 text-danger">Amount </h6>
              <div className="row">
                <div className="col-6">
                  <p className="text-danger">Total:</p>
                </div>
                <div className="col-6 text-end fw-semibold ">
                  <p>
                    $
                    {order.products
                      .reduce((total, product) => {
                        const productDetail = productDetails.find(
                          (detail) => detail.id === product.productId
                        );
                        return (
                          total +
                          (productDetail
                            ? productDetail.price * product.quantity
                            : 0)
                        );
                      }, 0)
                      .toFixed(2)}
                  </p>
                </div>
              </div>
              {/* Render total amount paid separately */}
              {/* Render coupon used separately */}
              {order.promoCode && (
                <div className="row">
                  <div className="col-6">
                    <p className="text-danger">
                      Coupon Used :{" "}
                      <small className="text-success ">{order.promoCode}</small>
                    </p>
                  </div>
                  <div className="col-6 text-end fw-semibold ">
                    <p className="text-success">
                      -{order.promoCodeDiscountPercentage}%
                    </p>
                  </div>
                </div>
              )}
              {order.calculatedDeliveryFee >= 0 && (
                <div className="row">
                  <div className="col-6">
                    <p className="text-danger">Delivery fee:</p>
                  </div>
                  <div className="col-6 text-end fw-semibold text-primary  ">
                    <p>+${order.calculatedDeliveryFee}</p>
                  </div>
                </div>
              )}
              {order.totalAmount && (
                <div className="row">
                  <div className="col-6">
                    <p className="text-danger">Total Amount Paid:</p>
                  </div>
                  <div className="col-6 text-end fw-semibold ">
                    <p>${order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
