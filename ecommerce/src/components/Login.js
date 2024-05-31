import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../reduxtoolkit/authSlice.js";
import { addToCart,clearCart, delStorageItem } from "../reduxtoolkit/CartSlice.js";
import LoggedInInfo from "./LoggedInInfo.js";
import { clearWishlist ,addItemsToWishlist, removeItemFromWishlist} from "../reduxtoolkit/WishlistSlice.js";

import { addToStorageCart, addToStorageWishlist } from "./StorageFunction.js";
const Login = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loggedInUsername = useSelector((state) => state.auth.user?.username);

  const [showModal, setShowModal] = useState(true);

  const handleToggleSignup = () => {
    setShowSignupForm(!showSignupForm);
  };



  const handleLogin = async (user, dispatch) => {
    console.log("fetch for prev cart items");
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      const cartData = JSON.parse(storedCartItems);
      const userCartItems = cartData[user.id] || [];
      dispatch(addToCart(userCartItems));
    }
  console.log("fetching prev wishlistitems")
    const storedWishList=localStorage.getItem("WishListItems")
    if(storedWishList){
      // console.log("there are a few prev wishlist items ")
      const listData = JSON.parse(storedWishList);
      const userWishlistItems = listData[user.id] || [];
      dispatch(addItemsToWishlist(userWishlistItems));
      
      };
      console.log("add non auth to auth");
      const storedNonAuthCartItems=localStorage.getItem("guestCartItems")
      if (storedNonAuthCartItems) {
        const guestCartData = JSON.parse(storedNonAuthCartItems);
        console.log(guestCartData)
        if (Array.isArray(guestCartData) && guestCartData.length > 0) {
          dispatch(addToCart(guestCartData));
          guestCartData.forEach((item) => {
            console.log(item)
            addToStorageCart(item, user.id, item.quantity);
          });
          localStorage.removeItem("guestCartItems");
        } else {
          console.error("Guest cart data is empty or not an array.");
        }
      }
      
        const storedAuthWishList=localStorage.getItem("GuestWishListItems")
        if(storedAuthWishList){
          console.log("moving  from auth to non auth wishlist ")
          const listData = JSON.parse(storedAuthWishList);
          dispatch(addItemsToWishlist(listData));
          if (Array.isArray(listData) && listData.length > 0) {
          
            listData.forEach((item) => {
              console.log(item)
              addToStorageWishlist(item, user.id);
            });
            localStorage.removeItem("GuestWishListItems");
          } else {
            console.error("Guest cart data is empty or not an array.");
          }
        }

          



    };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch("http://localhost:5000/users");
    // const response =await fetch("../../components/user.js")
    const users = await response.json();
  
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    // console.log(Users)
    // const user=Users.find(
    //   (user) => user.email === email && user.password === password
    // );
    
    if (user) {
      setUserId(user.id)
      dispatch(login(user));
      dispatch(clearCart(user.id));
      dispatch(clearWishlist())


      console.log(user.id)
      handleLogin(user, dispatch); // Pass dispatch as a parameter
      setShowAlert(true);
      setShowError(false);
    } else {
      setShowError(true);
      setShowAlert(false);
    }
  };

  return (
    <>
      {/* Login Modal */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`} // Add 'show' class to show the modal
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: showModal ? "block" : "none" }} // Show or hide the modal based on 'showModal' state
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {showSignupForm ? "Register" : "Login"}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeModal} // Call 'closeModal' function when the close button is clicked
              ></button>
            </div>
            <div className="modal-body">
              {/* Error message for incorrect credentials */}
              {showError && (
                <div className="alert alert-danger" role="alert">
                  Incorrect credentials entered.
                </div>
              )}

              {/* Alert message for successful login */}
              {showAlert && (
                <div className="alert alert-success" role="alert">
                  Welcome, {loggedInUsername}! You have successfully logged in.
                </div>
              )}
              {(!showAlert && isAuthenticated )&&(
                <LoggedInInfo message={`Hello, ${username}, you are already logged in.`}/>
              )}


              {/* Display a welcome message if user is already logged in */}
             

              {/* Display login form if user is not logged in */}
              {!isAuthenticated && (
                <>
                  {showSignupForm ? (
                    <form>
                      <div className="mb-3">
                        <label htmlFor="exampleInput" className="form-label">Username</label>
                        <input type="text" className="form-control" id="exampleInput" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                      </div>
                     
                      <button type="submit" className="btn btn-outline-dark w-100 mt-5">Register</button>
                    </form>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text">
                          We'll never share your email with anyone else.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-outline-dark w-100 mt-5"
                      >
                        Submit
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleToggleSignup}
              >
                {showSignupForm ? "Back to Login" : "Register"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
