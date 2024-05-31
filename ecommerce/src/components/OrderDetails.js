import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const OrderDetails = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.user?.id);
  const [orders, setOrders] = useState([]);
  const [userAddress, setUserAddress] = useState({});
  const [productDetails, setProductDetails] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    if (isAuthenticated && userId) {
      axios
      .get(`http://localhost:5000/orders/${userId}`)

        .then((response) => {
          const fetchedOrders = response.data;
          console.log(fetchedOrders);
          const storedOrders = JSON.parse(localStorage.getItem("orders")) || {};
          const userStoredOrders = storedOrders[userId] || [];
          const mergedOrders = [...userStoredOrders.reverse(), ...fetchedOrders];
          setOrders(mergedOrders);
        })
        .catch((error) => {
          console.error("Error fetching order details:", error);
        });
    
      axios
        .get(`http://localhost:5000/users/${userId}`)
        .then((response) => {
          console.log(response.data.address)
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
        orders.flatMap((order) =>
          order.products.map((product) => product.productId)
        ).map((productId) => {
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
    <div className="mx-5 my-5 card2 border-0 border-none">
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
                    <p className="mb-lg-0 fs-sm ">
                      {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="col-12 col-lg-6">
                    <h6 className="heading-xxxs text-primary">
                      Shipping Address:
                    </h6>
                    <p className="mb-lg-0 fs-sm  text-capitalize ">
                      {userAddress.street}, {userAddress.city},{" "}
                      {userAddress.number}, {userAddress.zipcode}
                    </p>
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer bg-body">
            <h6 className="mb-5 text-primary ">Order Items ({order.products.length})</h6>

            <ul className="list-group list-group-lg list-group-flush-y list-group-flush-x border-none rounded-0 ">
              {order.products.map((product, productIndex) => {
                const productDetail = productDetails.find(
                  (detail) => detail.id === product.productId
                );
                const subtotal = productDetail
                  ? productDetail.price * product.quantity
                  : 0;
                return (
                  <li key={productIndex} className="list-group-item border-0">
                    <div className="row align-items-center">
                      <div className="col-4 col-md-3 col-xl-2">
                        {productDetail && (
                          <img
                            src={productDetail.image}
                            alt={`Product ${product.productId}`}
                            className="img-fluid"
                          />
                        )}
                      </div>
                      <div className="col border-none rounded-0">
                        <p className="mb-4 fs-sm ">
                        <a
                          className="text-body fw-bold"
                          href={`products/${product.productId}`}
                          onClick={(e) => {
                            // Prevent the default link behavior
                            e.preventDefault();
                            // Manually navigate to the product page while preserving authentication state
                            navigate(`products/${product.productId}`);
                          }}
                        >
                          {productDetail && productDetail.title}
                          </a>
                          <br />
                          <span className="text-muted">
                            Quantity: {product.quantity}
                          </span>
                          <br />
                          <span className="text-muted">
                            Price: $
                            {productDetail && productDetail.price.toFixed(2)}
                          </span>
                          <br />
                          <span className="text-muted text-dark">
                            Subtotal: ${subtotal.toFixed(2)}
                          </span>
                        </p>
                        <div className="fs-sm text-muted">
                          {/* Add product details like size, color */}
                        </div>
                      </div>
                     
                    </div>
                    <hr/>
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
                    <p className="text-danger">Coupon Used : <small className="text-success ">{order.promoCode}</small></p>
                    
                  </div>
                  <div className="col-6 text-end fw-semibold ">
                    <p className="text-success">-{order.promoCodeDiscountPercentage}%</p>
                  </div>
                </div>
              )}
              {order.calculatedDeliveryFee>=0 && (
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
