import React from "react";
import "./style.css";
function AboutSection() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-12 col-md-6  ">
            {/* Image */}
            <div className="p-3">
              <img
                src={require("../ImagesO/product-36.jpg")}
                alt="..."
                className="img-fluid w-50 "
              />
            </div>

            {/* Image */}
            <div className="text-end mt-n13 mt-lg-n15 mb-10 mb-md-0">
              <div className="p-3">
                <img
                  src={require("../ImagesO/product-62.jpg")}
                  alt="..."
                  className="img-fluid w-50 "
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-5 fs-5 pt-0">
            {/* Preheading */}
            <h6 className="heading-xxs mb-4 text-gray-400">Our story</h6>

            {/* Heading */}
            <h2 className="mb-7">About our Store</h2>

            {/* Text */}
            <p className="fs-lg text-muted">
              Founded in 2015, Shop Nest. has been committed to providing
              high-quality apparel for fashion enthusiasts worldwide. Our
              journey began with a passion for sustainable fashion. Since then,
              we have grown into a global brand, known for our eco-friendly
              practices and trendy designs.
            </p>
            <p className="mb-0 fs-lg text-muted">
              At Shop Nest. we believe in empowering individuals to express
              their unique style while minimizing their environmental footprint.
              Every product is crafted with care and attention to detail, using
              ethically sourced materials and eco-friendly manufacturing
              processes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
