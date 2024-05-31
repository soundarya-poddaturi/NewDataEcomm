// LoggedInInfo.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../reduxtoolkit/authSlice";
import { clearCart } from '../reduxtoolkit/CartSlice';
import { clearWishlist } from '../reduxtoolkit/WishlistSlice';

const LoggedInInfo = ({ message }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.auth.user?.id);


  const handleLogout = () => {
    console.log(loggedInUserId);
    dispatch(logout({ userId: loggedInUserId }));
    dispatch(clearCart())
    dispatch(clearWishlist());
  };
  

  return (
    isAuthenticated && (
      <div className="alert alert-info text-center py-3 my-5 mx-2  " role="alert">
        {message}
        <button className="btn btn-danger ms-2" onClick={handleLogout}>Logout</button>
      </div>
    )
  );
};

export default LoggedInInfo;
