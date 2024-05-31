export const addToGuestCart = (product, quantity = 1) => {
    let guestCartItems = JSON.parse(localStorage.getItem("guestCartItems")) || [];
    const existingIndex = guestCartItems.findIndex(item => item.id === product.id);
  
    if (existingIndex !== -1) {
   
      guestCartItems[existingIndex].quantity += quantity;
    } else {
    
      const productWithQuantity = { ...product, quantity };
      guestCartItems.push(productWithQuantity);
    }
  
    localStorage.setItem("guestCartItems", JSON.stringify(guestCartItems));
  };
  export const updateGuestCartItemQuantity = (itemId, newQuantity) => {
    let guestCartItems = JSON.parse(localStorage.getItem("guestCartItems")) || [];
    const existingIndex = guestCartItems.findIndex(item => item.id === itemId);
  
    if (existingIndex !== -1) {
     
      guestCartItems[existingIndex].quantity = newQuantity;
      localStorage.setItem("guestCartItems", JSON.stringify(guestCartItems));
    } else {
      console.error("Product not found in guest cart.");
    }
  };
  export const deleteGuestCartItem = (itemId) => {
    let guestCartItems = JSON.parse(localStorage.getItem("guestCartItems")) || [];
    const updatedCartItems = guestCartItems.filter(item => item.id !== itemId);
    localStorage.setItem("guestCartItems", JSON.stringify(updatedCartItems));
  };

  











  export const addToGuestWishlist = (item) => {
    let guestWishlistItems = JSON.parse(localStorage.getItem("GuestWishListItems")) || [];
    const isItemAlreadyInWishlist = guestWishlistItems.some(wishlistItem => wishlistItem.id === item.id);
    if (!isItemAlreadyInWishlist) {
      guestWishlistItems.unshift(item);
      localStorage.setItem("GuestWishListItems", JSON.stringify(guestWishlistItems));
    }
  };

  export const deleteGuestWishlistItem = (itemId) => {
    let guestWishlistItems = JSON.parse(localStorage.getItem("GuestWishListItems")) || [];
    const updatedWishlistItems = guestWishlistItems.filter(item => item.id !== itemId);
    localStorage.setItem("GuestWishListItems", JSON.stringify(updatedWishlistItems));
  };
  
  