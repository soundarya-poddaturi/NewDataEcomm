import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { setCategories } from '../reduxtoolkit/categoriesSlice';
import { useDispatch, useSelector } from 'react-redux'; 
import './style.css'; 
import ScrollComponent from "./ScrollComponent";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories');
        dispatch(setCategories(response.data));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [dispatch]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    // <ScrollComponent threshold={0.4} className="my-scroll-component">
    <div className="container mt-5 mb-5">
      <div className="row">
        {categories.map((category, index) => (
          <div key={category} className="col-md-4 col-sm-12">
            <Link to={`/products/category/${category}`} className="text-decoration-none" onClick={scrollToTop}>
              <div
                className="text-white text-center mb-4 position-relative cat category-card"
                style={{
                  minHeight: "300px",
                  
                  backgroundImage: `url(assets/images/category/cat-${index + 1}.jpg)`,
                  backgroundSize: "cover",
                }}
              >
                <div className=""></div> {/* Add overlay */}
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <h1 className="mb-0 fw-bolder text-uppercase">{category}</h1>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    //  </ScrollComponent>
  );
};

export default Categories;
