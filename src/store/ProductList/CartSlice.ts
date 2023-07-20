import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image:any;
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
        const itemId = action.payload;
        const item = state.cartItems.find((item) => item.id === itemId);
        if (item) {
          if (item.quantity > 1) {
            // Decrement the quantity by one
            item.quantity -= 1;
          } else {
            // Remove the item from the cart if the quantity is one
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
          }
        }
      },

      removeProductFromCart: (state, action: PayloadAction<number>) => {
        const itemId = action.payload;
        state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      },
      
  
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },

    resetCart: (state) => {
        state.cartItems = [];
      },
    
  },
  
});

export const { addToCart, removeFromCart, updateQuantity ,resetCart,removeProductFromCart} = CartSlice.actions;

export default CartSlice;
