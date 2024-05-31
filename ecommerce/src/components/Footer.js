import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import './style.css';

const Footer = () => {
  const categories = useSelector((state) => state.categories);

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <footer className="bg-dark bg-cover  footer">
      <div className="py-5 border-bottom border-1">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-3">
              <h4 className="mb-6 text-white text-capitalize ">Shop Nest.</h4>
            </div>
            <div className="col-6 col-sm">
              <h6 className="heading-xxs mb-4 text-white">Shop</h6>
              <ul className="list-unstyled mb-0">
                <li>
                  <NavLink
                    to="/"
                    className="text-white text-decoration-none text-capitalize"
                    onClick={scrollToTop}
                  >
                    Home
                  </NavLink>
                </li>
                {categories.map((category, index) => (
                  <li key={index}>
                    <NavLink
                      to={`/products/category/${category}`}
                      className="text-white text-decoration-none text-capitalize"
                      activeClassName="text-white" // Remove underline when active
                      onClick={scrollToTop}
                    >
                      {category}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-6 col-sm">
              <h6 className="heading-xxs mb-4 text-white">Company</h6>
              <ul className="list-unstyled mb-0">
                <li>
                  <NavLink
                    to="/about"
                    className="text-white text-decoration-none text-capitalize"
                    onClick={scrollToTop}
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <a
                    className="text-white text-decoration-none text-capitalize"
                    href="#!"
                    onClick={scrollToTop}
                  >
                    Terms &amp; Conditions
                  </a>
                </li>
                <li>
                  <a
                    className="text-white text-decoration-none text-capitalize"
                    href="#!"
                    onClick={scrollToTop}
                  >
                    Privacy &amp; Cookie policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm">
              <h6 className="heading-xxs mb-4 text-white">Contact</h6>
              <ul className="list-unstyled mb-0">
                <li>
                  <NavLink
                    to="/contact"
                    className="text-white text-decoration-none text-capitalize"
                    onClick={scrollToTop}
                  >
                    Contact us
                  </NavLink>
                </li>
                <li>
                  <a
                    className="text-white text-decoration-none text-capitalize"
                    href="tel:1-202-555-0106"
                    onClick={scrollToTop}
                  >
                    1-202-555-0106
                  </a>
                </li>
                <li>
                  <a
                    className="text-white text-decoration-none text-capitalize"
                    href="mailto:help@shopper.com"
                    onClick={scrollToTop}
                  >
                    help@shopNest.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="text-center text-light">© Shop Nest, Inc</p>
            </div>
            <div className="col-auto ">
              <img
                className="footer-payment px-2 py-1"
                src="./assets/logo/mastercard.svg"
                alt="..."
              />
              <img
                className="footer-payment px-2 py-1"
                src="../assets/logo/visa.svg"
                alt="..."
              />
              <img
                className="footer-payment px-2 py-1"
                src="../assets/logo/amex.svg"
                alt="..."
              />
              <img
                className="footer-payment px-2 py-1"
                src="../assets/logo/paypal.svg"
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
