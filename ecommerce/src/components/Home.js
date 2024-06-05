import React from "react";
import Categories from "./Categories";
import "./style.css";
import Delivery from "./Delivery";
import CountDown from "./CountDown";
import HomeCat from "./HomeCat";
import AboutSection from "./AboutSection";
import ScrollComponent from "./ScrollComponent"
const Home = () => {

  return (
    <div>
      
      <div class=" py-3 bg-dark bg-pattern mt-4 mb-2 res">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="text-center text-white">
                <span class=" heading-xxs letter-spacing-xl">
                  ⚡️ Happy Holiday Deals on Everything ⚡️
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Search /> */}

      <div className="mb-3">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item ">
              <img
                src="/assets/images/home/img-10.jpg"
                className="d-block w-100"
                alt="..."
                style={{ maxHeight: "550px", objectFit: "cover" }}
              />
              <div
                className="carousel-caption d-flex justify-content-center align-items-center text-center"
                style={{ height: "100%" }}
              >
                <div className="bg-light bg-opacity-60 p-4 text-dark   cartext">
                  <h2 className="text-uppercase">
                    Unleash the inner fashionista with us
                  </h2>
                  <p>Discover amazing products and services.</p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="/assets/images/home/img2.jpg"
                className="d-block w-100"
                alt="..."
                style={{ maxHeight: "550px", objectFit: "cover" }}
              />
              <div
                className="carousel-caption d-flex justify-content-center align-items-center text-center"
                style={{ height: "100%" }}
              >
                
                <div className="bg-light bg-opacity-80 p-4 text-dark">
                  <h1 className="text-uppercase">
                    Get ready to slay all day. Shop our curated collection now!
                  </h1>
                  <p>All the favourites brand in one place</p>
                </div>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="/assets/images/home/img3.jpg"
                className="d-block w-100"
                alt="..."
                style={{ maxHeight: "550px", objectFit: "cover" }}
              />
              <div
                className="carousel-caption d-flex justify-content-center align-items-center text-center "
                style={{ height: "100%" }}
              >
                 
                <div className="bg-light bg-opacity-80 p-4 text-dark">
                  <h1 className="text-uppercase">
                    Clothes that make heads turn.
                  </h1>
                  {/* <h2 className="text-uppercase"></h2> */}
                  <p>Shop our latest arrivals</p>
                </div>
               
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <br />
        <br />
        <div>
        <div className="mb-5"><CountDown /></div>
         
          
        {/* <ScrollComponent threshold={0.1} className="my-scroll-component"> */}
        <h2 className="my-4 fs-1 d-flex justify-content-center">
          Top Categories
        </h2>
      {/* </ScrollComponent> */}
           
         
        
          {/* <Card /> */}
          <Categories/>

        </div>
        {/* <ScrollComponent threshold={0.1} className="my-scroll-component"> */}
        <HomeCat />
        {/* </ScrollComponent> */}
        {/* <div className="container">
          <div className="row">
            <h2 className="text-center mb-3 mt-3">CATEGORIES</h2>
            <hr />
            <div className="col">
              <Categories />
            </div>
          </div>
          <hr/>
        </div> */}

       
       
        {/* <ScrollComponent threshold={0.1} className="my-scroll-component"> */}
        <AboutSection />
        {/* </ScrollComponent> */}
        <Delivery />
      </div>
    </div>
  );
};

export default Home;
