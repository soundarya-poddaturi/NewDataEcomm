import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice";


const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist(state, action) {
      const newItem = action.payload;
    
      if (Object.keys(newItem).length === 0) {
        return state; 
      }

      // Check if the item already exists in the wishlist
      const existingItemIndex = state.wishlistItems.findIndex(
        item => item.id === newItem.id
      );
      console.log(existingItemIndex);
      if (existingItemIndex === -1) {
        state.wishlistItems.unshift(newItem);
     
      }
    },
    addItemsToWishlist(state, action) {
      const itemsToAdd = action.payload;
      console.log("Payload:", itemsToAdd);
      if (!Array.isArray(itemsToAdd)) {
        console.error("Payload is not an array.");
        return;
      }
    
      itemsToAdd.forEach(item => {
        const existingItemIndex = state.wishlistItems.findIndex(
          wishlistItem => wishlistItem.id === item.id
        );
        if (existingItemIndex === -1) {
          state.wishlistItems.unshift(item);
        }
      });
    },
    
    
    removeItemFromWishlist(state, action) {
      const itemIdToRemove = action.payload;
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== itemIdToRemove
      );
      // Update local storage
      localStorage.setItem("WishListItems", JSON.stringify(state.wishlistItems));
    },
    clearWishlist(state) {
      state.wishlistItems = [];
      // Update local storage
      // localStorage.setItem("WishListItems", JSON.stringify(state.wishlistItems));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state, action) => {
      console.log("Logging out...");
      const userId = action.payload.userId;
      const cartData = JSON.parse(localStorage.getItem("WishListItems")) || {};
      cartData[userId] = state.wishlistItems; // Map wishlist items to user ID
      console.log(cartData[userId]);
      console.log(userId);
      console.log(cartData);
      localStorage.setItem("WishListItems", JSON.stringify(cartData));
      state.wishlistItems = [];
    });
  
  }
});

export const {
  addItemToWishlist,
  removeItemFromWishlist,
  clearWishlist,
  addItemsToWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
