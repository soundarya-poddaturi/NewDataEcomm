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
            console.log("in cartslice")
            const { product, quantity } = action.payload;
            console.log(product);
            console.log(quantity)
            const existingProductIndex = state.items.findIndex(item => item.id === product.id);
            if (existingProductIndex !== -1) {
                state.items[existingProductIndex].quantity += quantity;
            } else {
                state.items.push({ ...product, quantity });
            }
            state.subtotal = calculateTotal(state.items);
            state.total = state.subtotal; 
        },
        delItem(state, action) {
            state.items = state.items.filter((item) => item.id !== action.payload);
            state.subtotal = calculateTotal(state.items);
            state.total = state.subtotal; 
        },
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.id === id);
            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
                state.subtotal = calculateTotal(state.items);
                state.total = state.subtotal;
            }
        },
            
        clearCart(state) {
            state.items = [];
            state.subtotal = 0;
            state.total = 0;
        },
        addToCart(state, action) {
            const itemsToAdd = Array.isArray(action.payload) ? action.payload : [action.payload];
            console.log(itemsToAdd);
            itemsToAdd.forEach(item => {
                if (Object.keys(item).length === 0) {
                    return; 
                }
                
                const existingProductIndex = state.items.findIndex(cartItem => cartItem.id === item.id);
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

export const { addItem, delItem, updateQuantity,clearCart ,addToCart,clearStorageItems} = cartSlice.actions;
export default cartSlice.reducer;
