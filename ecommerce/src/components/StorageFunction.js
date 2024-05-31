import { useSelector } from "react-redux";
export const addToStorageCart = (product, userId, QUANTITY = 1) => {
  const storedCartData = localStorage.getItem("cartItems");
  let cartData = storedCartData ? JSON.parse(storedCartData) : {};

  if (!cartData[userId]) {
    cartData[userId] = [];
  }
  const existingProductIndex = cartData[userId].findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
    cartData[userId][existingProductIndex].quantity += QUANTITY;
  } else {
    cartData[userId].push({ ...product, quantity: QUANTITY });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartData));
};

  export const deleteStorageCartItem = (key, userId, itemId) => {
    const currentItems = JSON.parse(localStorage.getItem(key)) || {};
    const userItems = currentItems[userId] || [];
    const index = userItems.findIndex(storageItem => storageItem.id === itemId);
        if (index !== -1) {
      userItems.splice(index, 1);
      currentItems[userId] = userItems;
      localStorage.setItem(key, JSON.stringify(currentItems));
    }
  };
  export const addToStorageWishlist = (item, userId, quantity = 1) => {
    console.log(item);
    console.log(userId)
    let wishlistData = JSON.parse(localStorage.getItem("WishListItems")) || {};
  
    if (wishlistData[userId]) {
      const existingItemIndex = wishlistData[userId].findIndex(wishlistItem => wishlistItem.id === item.id);
      if (existingItemIndex !== -1) {
        return;
      } else {
        wishlistData[userId].push({ ...item, quantity: 1 });
      }
    } else {
      wishlistData[userId] = [{ ...item, quantity: 1 }];
    }
    localStorage.setItem("WishListItems", JSON.stringify(wishlistData));
  };
  


  export const deleteStorageWishlistItem = (key, userId, itemId) => {
    
    const currentItems = JSON.parse(localStorage.getItem(key)) || {};
    const userWishlist = currentItems[userId] || [];
    const index = userWishlist.findIndex(storageItem => storageItem.id === itemId);
    
    if (index !== -1) {
      userWishlist.splice(index, 1);
      currentItems[userId] = userWishlist;
      localStorage.setItem(key, JSON.stringify(currentItems));
    }
};


export const updateStorageItemQuantity = (key, userId, itemId, newQuantity) => {
  console.log(userId+" "+itemId+" "+newQuantity)
    const currentItems = JSON.parse(localStorage.getItem(key)) || {};
    const userItems = currentItems[userId] || [];
     const index = userItems.findIndex(storageItem => storageItem.id === itemId);
    if (index !== -1) {
      userItems[index].quantity = newQuantity;
      currentItems[userId] = userItems;
      localStorage.setItem(key, JSON.stringify(currentItems));
    }
};


export const storeOrderLocally = (userId, items, totalAmount, promoCode, calculatedDeliveryFee, subtotal, promoCodes) => {
  const orders = JSON.parse(localStorage.getItem("orders")) || {};
  const orderNumber = generateOrderNumber(); // Generate a random order number
  // const promoCodes = useSelector((state) => state.delivery.promoCodes);
  const discountPercentage = promoCodes[promoCode];
  const newOrder = {
    id: orderNumber,
    userId: userId,
    date: new Date().toISOString(),
    products: items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
    totalAmount: totalAmount,
    promoCodeDiscountPercentage: discountPercentage,
    promoCode: promoCode, // Include promo code in the order details
    calculatedDeliveryFee: calculatedDeliveryFee,
    subtotal: subtotal,
  };

  if (!orders[userId]) {
    orders[userId] = [];
  }
  orders[userId].push(newOrder);

  localStorage.setItem("orders", JSON.stringify(orders));
};

const generateOrderNumber = () => {
  return Math.floor(100000000 + Math.random() * 900000000);
};