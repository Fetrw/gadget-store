/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type FavoritesState = {
  favorites: Product[];
};

const initialState: FavoritesState = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addProductToFav: (state, action: PayloadAction<Product>) => {
      state.favorites.push(action.payload);
    },
    deleteProductFromFav: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        product => product.id !== action.payload,
      );
    },
  },
});

export const { addProductToFav, deleteProductFromFav } = favoritesSlice.actions;
export default favoritesSlice.reducer;
