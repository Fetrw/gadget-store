/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type CartItem = {
  quantity: number;
  product: Product;
};

type CartState = {
  cartItems: CartItem[];
};

const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      state.cartItems.push({ product: action.payload, quantity: 1 });
    },

    deleteItemFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        item => item.product.id !== action.payload,
      );
    },

    increaseAmount: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(
        item => item.product.id === action.payload,
      );

      if (item) {
        item.quantity += 1;
      }
    },
    decreaseAmount: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(
        item => item.product.id === action.payload,
      );

      if (item) {
        item.quantity -= 1;
        if (item.quantity === 0) {
          state.cartItems = state.cartItems.filter(i => i !== item);
        }
      }
    },
    clearCart: state => {
      state.cartItems = [];
    },
  },
});

export const {
  addItemToCart,
  deleteItemFromCart,
  increaseAmount,
  decreaseAmount,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
