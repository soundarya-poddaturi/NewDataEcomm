import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import categoriesReducer from './categoriesSlice';
import wishlistReducer from "./WishlistSlice"; 
import authReducer from './authSlice';
import deliverySlice from "./deliverySlice";
const store =configureStore(
    {
        reducer:{
            cart:CartSlice,
            categories: categoriesReducer,
            wishlist: wishlistReducer,
            auth: authReducer,
            delivery: deliverySlice,
        }
    }
)
export default store;