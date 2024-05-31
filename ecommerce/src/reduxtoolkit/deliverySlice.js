// deliverySlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deliveryFee: 5,
  appliedPromoCode: null,
  promoCodes: {
    SHOP123: 5, // 5% discount
    FRESH300: 10, // 10% discount
    // Add more promo codes here if needed
  }
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    updateDeliveryFee(state, action) {
      state.deliveryFee = action.payload;
    },
  
        applyPromoCode(state, action) {
            const promoCodeValue = action.payload;
            const discountPercentage = state.promoCodes[promoCodeValue];
          
            if (discountPercentage !== undefined) {
              state.appliedPromoCode = promoCodeValue; // Store the applied promo code
            } else {
              // Handle invalid promo code
              console.error('Invalid promo code');
            }
          },
          
    clearPromoCode(state) {
      state.deliveryFee = 5;
      state.appliedPromoCode = null;
    },
  },
});

export const { updateDeliveryFee, applyPromoCode, clearPromoCode } = deliverySlice.actions;

export default deliverySlice.reducer;
