import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CartBtn from "./CartBtn";
import Login from "./Login";
import Wishlist from "./WishList";
import Search from "./Search";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./style.css"
const Header = () => {
 
  const [showLoginModal, setShowLoginModal] = useState(false);
  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]); 
  const [formatCat, setFormattedCategories] = useState([]); 
  const navbarCollapseRef = useRef(null);
  const togglerBtnRef = useRef(null);
  useEffect(() => {
  
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories');
        const data = await response.json();

      console.log(data);
        
        setCategories(data);

       
      
      } catch (error) {
        console.error('Error fetching categories:', error);
      }     
    };

    fetchCategories();
  }, []);
  const [showToggler, setShowToggler] = useState(false);
  const handleNavLinkClick = () => {
    if (window.innerWidth <= 768) {
      navbarCollapseRef.current.classList.remove('show');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setShowToggler(window.innerWidth <= 768);
    };
  
   
  
    window.addEventListener('resize', handleResize);
    handleResize();
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav className="card2 navbar navbar-expand-lg navbar-light bg-light mb-4 fixed-top py-3">
        <div className="container-fluid py-2">
          <div className="d-flex mb-1">
          <div className={showToggler ? "me-5" : ""}>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              ref={togglerBtnRef}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            </div>
            <div className=" ">
              <NavLink className="navbar-brand fw-bold" to="/" onClick={() => {scrollToTop();handleNavLinkClick();}}>
                SHOP NEST
              </NavLink>
            </div>
          </div>
          <div className="collapse navbar-collapse justify-content-center ms-5" id="navbarSupportedContent"   ref={navbarCollapseRef}>
            <ul className="navbar-nav mb-2 mb-lg-0 justify-content-center  fs-5">
              {/* <li className="nav-item ms-2">
                <NavLink className="nav-link under" aria-current="page" to="/" onClick={scrollToTop}>
                  Home
                </NavLink>
              </li> */}
              {/* <li className="nav-item ms-lg-3">
                <NavLink className="nav-link under" to={`/products/category/all`} onClick={() => {scrollToTop();handleNavLinkClick();}}>
                  All
                </NavLink>
              </li> */}
              {categories.map((category, index) => (
                <li className="nav-item ms-lg-3" key={index}>
                  <NavLink className="nav-link under text-capitalize " to={`/products/category/${category}`}onClick={() => {scrollToTop();handleNavLinkClick();}}>
                    {category}
                  </NavLink>
                </li>
              ))}
              {/* <li className="nav-item ms-2">
                <NavLink className="nav-link under" to="/categories" onClick={scrollToTop}>
                  Categories
                </NavLink>
              </li> */}
            </ul>
          </div>
          <div className="d-flex align-items-center justify-content-between ">
            <div>
            <Search handleSearch={handleSearch} />
            </div>
              <div>
            <>
              <NavLink className="" to="/profile" onClick={() => {scrollToTop();handleNavLinkClick();}}>
                <span className="fa fa-user me-2 fa-lg"></span>
              </NavLink>
            </>
            <button type="button" className="btn border-0 icon-small" onClick={()=>{openLoginModal();handleNavLinkClick()}}>
              <span className="fa fa-sign-in fa-lg me-2 icon-small"></span>
            </button>
            <CartBtn className="icon-small" />
              <Wishlist className="icon-small" />
            </div>
          </div>
        </div>
      </nav>
      {showLoginModal && <Login closeModal={closeLoginModal} />}
    </>
  );
};

export default Header;
