export const addToGuestCart = (product) => {
  let guestCartItems = JSON.parse(localStorage.getItem("guestCartItems")) || [];
  const existingIndex = guestCartItems.findIndex(item => item.id === product.id && item.selectedSize === product.selectedSize);
  console.log(product.selectedSize);
  const nqty = product.quantity; // Assuming product.quantity holds the quantity to add
  if (existingIndex !== -1) {
      guestCartItems[existingIndex].quantity += nqty;
  } else {
      // If the product with the same id and selected size doesn't exist, add it as a new item
      const productWithQuantity = { ...product, quantity: nqty }; // Use the correct property name: quantity
      guestCartItems.push(productWithQuantity);
  }
  localStorage.setItem("guestCartItems", JSON.stringify(guestCartItems));
};

export const updateGuestCartItemQuantity = (itemId, newQuantity, selectedSize) => {
  let guestCartItems = JSON.parse(localStorage.getItem("guestCartItems")) || [];
  const existingIndex = guestCartItems.findIndex(item => item.id === itemId && item.selectedSize === selectedSize);

  if (existingIndex !== -1) {
      guestCartItems[existingIndex].quantity = newQuantity;
      localStorage.setItem("guestCartItems", JSON.stringify(guestCartItems));
  } else {
      console.error("Product not found in guest cart.");
  }
};

  export const updateGuestCartItemSize = (itemId, newSize) => {
    const guestCartItems = JSON.parse(localStorage.getItem("guestCartItems")) || [];
    const index = guestCartItems.findIndex(item => item.id === itemId);
  
    if (index !== -1) {
      guestCartItems[index].selectedSize = newSize;
      localStorage.setItem("guestCartItems", JSON.stringify(guestCartItems));
    }
  };
  

  
  export const deleteGuestCartItem = (itemId, selectedSize) => {
   
    let guestCartItems = JSON.parse(localStorage.getItem("guestCartItems")) || [];
    const updatedCartItems = guestCartItems.filter(item => !(item.id === itemId && item.selectedSize === selectedSize));

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
  
  