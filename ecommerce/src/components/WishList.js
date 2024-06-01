import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromWishlist } from "../reduxtoolkit/WishlistSlice";
import { addItem } from '../reduxtoolkit/CartSlice';
import { NavLink } from "react-router-dom";
import { addToStorageCart, deleteStorageWishlistItem } from "./StorageFunction";
import { addToGuestCart, deleteGuestWishlistItem } from "./GuestStorageFunctions";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 
  const auth = useSelector((state) => state.auth); 
  const userId = auth.user?.id;
  const baseURL = 'http://localhost:5000';
  const handleAddToCart = (product) => {
    let defaultSize = "";
  
    // Check if the product requires size selection and set a default size if available
    if (product.subcategories && product.subcategories.sizes && product.subcategories.sizes.length > 0) {
      defaultSize = product.subcategories.sizes[0]; // Assuming the first size as the default
    }
  
    const cartProduct = { ...product, selectedSize: defaultSize };
   
       if(!isAuthenticated)
      {
        dispatch(removeItemFromWishlist(product.id));
        addToGuestCart(cartProduct, 1);
      dispatch(addItem({ product: cartProduct, quantity: 1 }));
        deleteGuestWishlistItem(product.id); 
      }
      else{
      
        dispatch(removeItemFromWishlist(product.id)); 
        const userId = auth.user?.id;
        addToStorageCart(cartProduct, userId, 1);
        dispatch(addItem({ product: cartProduct, quantity: 1 }));
      }
  };
  

  const handleRemoveFromWishlist = (itemId) => {
    if (isAuthenticated) {
      dispatch(removeItemFromWishlist(itemId));
      deleteStorageWishlistItem("WishList",userId,itemId)
    } else {
      deleteGuestWishlistItem(itemId);
      dispatch(removeItemFromWishlist(itemId));
    }
  };
  return (
    <>
      <button
        className="border-0 bg-color-transparent position-relative ms-1"
        data-bs-toggle="modal"
        data-bs-target="#WishlistModal"
      >
        <span className="fa fa-heart fa-lg icon-small"></span>
        {wishlistItems.length > 0 && (
          <span
            className="bg-dark position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "0.65rem" }}
          >
            {wishlistItems.length}
          </span>
        )}
      </button>

      <div
        className="modal fade"
        data-backdrop="false"
        id="WishlistModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"

      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Wishlist
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row row-cols-1 row-cols-md-3 justify-content-center">
                  {wishlistItems.length === 0 ? (
                    <div className="text-center">
                      <h3 className="p-0 text-danger">Empty Wishlist !</h3>
                      <img src={require("../ImagesO/no-results.png")} alt="Empty List" className="img-fluid"  />
                    <p> Explore our products to add your favorites!</p>
                   
                    </div>
                  ) : (
                    wishlistItems.map((item) => (
                      <div
                        className="card1 my-3 py-4 col"
                        key={item.id}
                        style={{ width: "20rem" }}
                      >
                        <NavLink to={`/products/${item.id}`}>
                            <img
                              src={`${baseURL}${item.image[0]}`}
                              className="card-img-top"
                              alt={item.title}
                              style={{
                                backgroundSize: "cover",
                                height: "300px",
                              }}
                            />
                          </NavLink>
                        <div className="card-body  py-3">
                        <div className="d-flex card-title justify-content-between align-items-baseline py-0" style={{ height: '30px' }}>
                <div>
                  <p className="fw-semibold fs-5 overflow-hidden text-truncate">
                    {item.brand}
                  </p>
                </div>
                <div>
                  <p className="overflow-hidden ">
                    ({item.rating.rate}) 
                  </p>
                </div>
              </div>
              <p className="card-title overflow-hidden text-truncate">
                {item.title}
              </p>
              <div className="d-flex align-items-center ">
                {item.discount_percentage > 0 && (
                  <span
                    className="lead mt-2   text-danger  me-2 fs-6 "
                    style={{ textDecoration: "line-through" }}
                  >
                    $
                    {(
                      item.price +
                      (item.price * item.discount_percentage) / 100
                    ).toFixed(1)}
                  </span>
                )}
                <span className="lead mt-2 fw-bold">${item.price}</span>
              </div>
            </div>
        
                          <div className="d-flex flex-row align-items-center justify-content-center ">
                         
                          
{/*                             
                            <NavLink
                              to={`/products/${item.id}`}
                              className="nav-link inner p-2 "
                            >
                              <span className="fa fa-search-plus"></span>
                            </NavLink> */}
                            <button
                              className=" btn btn-fa btn-danger border-0 rounded-0  inner"
                              onClick={() => handleAddToCart(item)}
                            >
                              Move to Bag
                            </button>
                            <NavLink
                              to="#"
                              className="nav-link  p-2"
                              onClick={() => handleRemoveFromWishlist(item.id)}
                            >
                              <span className={`fa fa-visible ${wishlistItems.includes(item) ? 'fa-heart' : 'fa-heart-o'}`}></span>
                            </NavLink>
                          </div>
                        </div>
                    
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
