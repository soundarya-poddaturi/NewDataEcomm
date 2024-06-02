import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import LoggedInInfo from "./LoggedInInfo";
import Login from "./Login";
import OrderDetails from "./OrderDetails";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const orderDetailsRef = useRef(null);
  const handleLoginClick = () => {
    setShowLoginModal(true);
  };
  const closeModal = () => {
    setShowLoginModal(false);
  };
  const scrollToOrderDetails = () => {
    orderDetailsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <LoggedInInfo message={"Want to SignOut ??"} />
      

      <div className="row ">
       
      {!isAuthenticated && (
          <div className="center-page">
            <div>
              <div className="mb-3 my-5">
                <h2>Take advantage of exclusive benefits</h2>
                <img
                  src="assets/logo/login-icon.png"
                  alt="login-icon"
                  className="img-fluid my-3"
                />
                <h1>Sign in to see your order details</h1>
                <h3 className="fw-bold my-3">
                  To access account and manage orders
                </h3>
              </div>
              <button
                className="btn btn-danger rounded-0"
                onClick={handleLoginClick}
              >
                Login
              </button>
            </div>
          </div>
        )}
        {/* </div> */}

        
          {isAuthenticated && (
            <div className="justify-content-center col-lg-8 col-sm-12 " ref={orderDetailsRef}>
              <OrderDetails />
            </div>
          )}
        {user && (
        <div className="col-lg-4 col-sm-12">
          <div className="d-flex justify-content-center ">
            {" "}
            {/* Center the button */}
            {/* <button
              className="btn text-decoration-underline"
              onClick={() =>
                orderDetailsRef.current &&
                orderDetailsRef.current.scrollIntoView({ behavior: "smooth" })
              }
            >
              Order Details <span className="fa fa-arrow-down"></span>
            </button> */}
          </div>
          <div className="container  rounded-3 py-5">
            <div
              className="container bg-body-light text-gray card2"
              style={{ maxWidth: "600px" }}
            >
              <h4 className="text-center py-4 ">Profile Details</h4>
              <div className="d-flex flex-row bd-highlight justify-content-between mb-1 px-5 py-3 bg-light border-dark text-capitalize">
                <div className="p-2 bd-highlight">Username</div>
                <div className="p-2 bd-highlight">{user.username}</div>
              </div>
              <div className="d-flex flex-row bd-highlight justify-content-between mb-1 px-5 py-3 bg-light border-dark text-capitalize">
                <div className="p-2 bd-highlight">Email</div>
                <div className="p-2 bd-highlight">{user.email}</div>
              </div>
              <div className="d-flex flex-row bd-highlight justify-content-between mb-1 px-5 py-3 bg-light border-dark text-capitalize">
                <div className="p-2 bd-highlight">Name</div>
                <div className="p-2 bd-highlight">
                  {user.name.firstname} {user.name.lastname}
                </div>
              </div>
              <div className="d-flex flex-row bd-highlight justify-content-between mb-1 px-5 py-3 bg-light border-dark text-capitalize">
                <div className="p-2 bd-highlight">Phone</div>
                <div className="p-2 bd-highlight">{user.phone}</div>
              </div>
              <div className="d-flex flex-row bd-highlight justify-content-between mb-1 px-5 py-3 bg-light border-dark text-capitalize">
                <div className="p-2 bd-highlight">Street</div>
                <div className="p-2 bd-highlight">{user.address.street}</div>
              </div>
              <div className="d-flex flex-row bd-highlight justify-content-between mb-1 px-5 py-3 bg-light border-dark text-capitalize">
                <div className="p-2 bd-highlight">City</div>
                <div className="p-2 bd-highlight">{user.address.city}</div>
              </div>
              <div className="d-flex flex-row bd-highlight justify-content-between mb-4 px-5 py-3 bg-light border-dark text-capitalize">
                <div className="p-2 bd-highlight">Zipcode</div>
                <div className="p-2 bd-highlight">{user.address.zipcode}</div>
              </div>
            </div>
          </div>
        </div>
      )}

       
      </div>
      {showLoginModal && <Login closeModal={closeModal} />}
    </>
  );
};

export default Profile;
