import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ id: number; title: string; price: number }>
    ) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    decrementItem: (state, action: PayloadAction<number>) => {
      const existing = state.items.find((i) => i.id === action.payload);
      if (!existing) return;
      if (existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, decrementItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
