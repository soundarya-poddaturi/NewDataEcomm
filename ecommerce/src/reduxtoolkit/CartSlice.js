import { createSlice } from '@reduxjs/toolkit';
import { logout } from "./authSlice";

const initialState = {
    items: [], 
    total: 0,
    subtotal: 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
          
            const { product, quantity } = action.payload;
            console.log(product);
            console.log(quantity)
            const existingProductIndex = state.items.findIndex(item => item.id === product.id && item.selectedSize===product.selectedSize);
            if (existingProductIndex !== -1) {
                state.items[existingProductIndex].quantity += quantity;
            } else {
                state.items.push({ ...product, quantity });
            }
            state.subtotal = calculateTotal(state.items);
            state.total = state.subtotal; 
        },
        delItem(state, action) {
            const { itemId, selectedSize } = action.payload;
            console.log(itemId, selectedSize);
            state.items = state.items.filter(item => !(item.id === itemId && item.selectedSize === selectedSize));
            state.subtotal = calculateTotal(state.items);
            state.total = state.subtotal; 
        },
        updateQuantity(state, action) {
            const { id, quantity, selectedSize } = action.payload;
            const itemToUpdate = state.items.find(item => item.id === id && item.selectedSize === selectedSize);
            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
                state.subtotal = calculateTotal(state.items);
                state.total = state.subtotal;
            }
        },
        
        updateSize(state, action) {
            const { id, size } = action.payload;
            const itemToUpdate = state.items.find(item => item.id === id);
            if (itemToUpdate) {
              itemToUpdate.selectedSize = size;
            }
          },
            
        clearCart(state) {
            state.items = [];
            state.subtotal = 0;
            state.total = 0;
        },
        addToCart(state, action) {
            const itemsToAdd = Array.isArray(action.payload) ? action.payload : [action.payload];
            itemsToAdd.forEach(item => {
                if (Object.keys(item).length === 0) {
                    return;
                }
                const existingProductIndex = state.items.findIndex(cartItem => cartItem.id === item.id && cartItem.selectedSize === item.selectedSize);
                if (existingProductIndex !== -1) {
                    state.items[existingProductIndex].quantity += item.quantity || 1;
                } else {
                    const newItem = { ...item, quantity: item.quantity || 1 };
                    state.items.push(newItem);
                }
            });
            state.subtotal = calculateTotal(state.items);
            state.total = state.subtotal;
        },
        
        clearStorageItems(state, action) {
            const userId = action.payload;
            const cartData = JSON.parse(localStorage.getItem("cartItems")) || {};
            delete cartData[userId];
            localStorage.setItem("cartItems", JSON.stringify(cartData));
        }
    
        
    }
    
});

const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const { addItem, delItem, updateQuantity,updateSize,clearCart ,addToCart,clearStorageItems} = cartSlice.actions;
export default cartSlice.reducer;
