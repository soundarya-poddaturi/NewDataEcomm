import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function HomeCat() {
  const navigate = useNavigate();

  const handleRedirectToSearch = (searchTerm) => {
    scrollToTop();
    navigate(`/search/${searchTerm}`);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
          {/* Preheading */}
          <h6 className="heading-xxs mb-3 text-gray-400 mt-5">New Collection</h6>

          {/* Heading */}
          <h2 className="mb-4">Best Picks 2024</h2>

          {/* Subheading */}
          <p className="mb-4 text-gray-500">
            Appear, dry there darkness they're seas, dry waters thing fly midst.
            Beast, above fly brought Very green.
          </p>
        </div>
      </div>

      <div className="row">
        {/* Card 1 */}
        <div className="col-12 col-md-5 col-lg-4 d-flex flex-column">
          <div
            className="card1 text-white position-relative"
            style={{
              minHeight: "370px",
              backgroundImage: "url(" + require("../ImagesO/product-1.jpg") + ")",
              backgroundSize: "cover",
            }}
            onClick={() => handleRedirectToSearch("sleeve")}
            role="button"
            aria-label="Shop for Sleeve Sensation"
            tabIndex="0"
          >
            <div className="card-bg">
              <div
                className="card-bg-img bg-cover"
                style={{
                  backgroundImage: "url(" + require("../ImagesO/product-1.jpg") + ")",
                }}
              ></div>
            </div>
            <div
              className="card-body my-auto text-center position-absolute w-100"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              <h4 className="mb-0 fw-bold">Sleeve Sensation</h4>
              <button className="btn stretched-link px-0 text-reset" onClick={scrollToTop}>
                Shop Now <i className="fa fa-long-arrow-right fa-white ms-2"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-12 col-md-7 col-lg-8 d-flex flex-column">
          <div
            className="card1 text-body position-relative img-fluid"
            style={{
              minHeight: "370px",
              backgroundImage: "url(" + require("../ImagesO/cotton-2.jpg") + ")",
              backgroundSize: "cover",
            }}
            onClick={() => handleRedirectToSearch("cotton")}
            role="button"
            aria-label="Shop for Cotton Collection"
            tabIndex="0"
          >
            <div className="card-bg">
              <div
                className="card-bg-img bg-cover"
                style={{
                  backgroundImage: "url(" + require("../ImagesO/cotton-2.jpg") + ")",
                }}
              ></div>
            </div>
            <div
              className="card-body my-auto px-md-10 text-center text-md-start position-absolute w-100 p-lg-5"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              <div className="card-circle card-circle-lg card-circle-end">
                <strong>save</strong>
                <span className="fs-4 fw-bold">30%</span>
              </div>
              <h4 className="mb-0 fw-bold fw-medium">Cotton Collection</h4>
              <button className="btn stretched-link px-0 text-reset" onClick={scrollToTop}>
                Shop Now <i className="fa fa-long-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-12 col-md-7 col-lg-8 d-flex flex-column mt-4">
          <div
            className="card1 mb-md-0 text-body position-relative"
            style={{
              minHeight: "370px",
              backgroundImage: "url(" + require("../ImagesO/winter.jpg") + ")",
              backgroundSize: "cover",
              objectFit: "cover",
            }}
            onClick={() => handleRedirectToSearch("winter")}
            role="button"
            aria-label="Shop for Winter Collection"
            tabIndex="0"
          >
            <div className="card-bg">
              <div
                className="card-bg-img bg-cover"
                style={{
                  backgroundImage: "url(" + require("../ImagesO/winter.jpg") + ")",
                  objectFit: "cover",
                }}
              ></div>
            </div>
            <div
              className="card-body my-auto px-md-10 text-center text-md-start position-absolute w-100 p-lg-5"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              <h4 className="mb-0 fw-bold">Winter Collection</h4>
              <button className="btn stretched-link px-0 text-reset" onClick={scrollToTop}>
                Shop Now <i className="fa fa-long-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col-12 col-md-5 col-lg-4 d-flex flex-column mt-4">
          <div
            className="card1 text-white position-relative img-fluid"
            style={{
              minHeight: "370px",
              backgroundImage: "url(" + require("../ImagesO/j1.jpg") + ")",
              backgroundSize: "cover",
            }}
            onClick={() => handleRedirectToSearch("jacket")}
            role="button"
            aria-label="Shop for Jackets"
            tabIndex="0"
          >
            <div className="card-bg">
              <div
                className="card-bg-img bg-cover im"
                style={{
                  backgroundImage: "url(" + require("../ImagesO/j1.jpg") + ")",
                }}
              ></div>
            </div>
            <div
              className="card-body my-auto text-center position-absolute w-100"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              <h4 className="mb-0 fw-bold">Jackets</h4>
              <button className="btn stretched-link px-0 text-reset" onClick={scrollToTop}>
                Shop Now <i className="fa fa-long-arrow-right fa-white ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCat;
