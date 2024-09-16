// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    orderStatus: null,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
    clearCart: (state) => {
      state.products = [];
    },
    increaseQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    placeOrder: (state) => {
      state.orderStatus = "success";
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  placeOrder,
} = cartSlice.actions;
export default cartSlice.reducer;
