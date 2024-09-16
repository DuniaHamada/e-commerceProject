import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from '../app/features/wishlistSlice';
import cartReducer from '../app/features/Cart';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer

  }
});
