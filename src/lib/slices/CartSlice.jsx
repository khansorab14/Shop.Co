// src/lib/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  wishlist: [],
  wishlistCount: 0,
  drawerOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1; // Increment quantity
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add new item
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex >= 0 && state.items[itemIndex].quantity > 0) {
        state.items[itemIndex].quantity -= 1; // Decrement quantity
      }
    },
    updateItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity = action.payload.quantity; 
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity,
        }); 
      }
    },
 
    addToWishList: (state, action) => {
      const itemExists = state.wishlist.find(
        (item) => item.id === action.payload.id
      );
      if (!itemExists) {
        state.wishlist.push(action.payload);
        state.wishlistCount += 1;
      }
    },
    removeFromWishList: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
      state.wishlistCount -= 1;
    },
    toggleDrawer: (state, action) => {
      state.drawerOpen =
        action.payload !== undefined ? action.payload : !state.drawerOpen;
    },
    addAllFromWishlist: (state) => {
      state.wishlist.forEach((item) => {
        const itemIndex = state.items.findIndex(
          (cartItem) => cartItem.id === item.id
        );
        if (itemIndex >= 0) {
          state.items[itemIndex].quantity += 1;
        } else {
          state.items.push({ ...item, quantity: 1 });
        }
      });
      state.wishlist = [];
      state.wishlistCount = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateItem,
  addToWishList,
  removeFromWishList,
  toggleDrawer,
  addAllFromWishlist,
} = cartSlice.actions;

export default cartSlice.reducer;
