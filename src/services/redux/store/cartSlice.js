import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemExists = state.items.find(item => item.prd_id === action.payload.prd_id);
            if (itemExists) {
                itemExists.ppd_qtd += action.payload.ppd_qtd;
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.prd_id !== action.payload);
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(item => item.prd_id === action.payload);
            if (item) item.ppd_qtd += 1;
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(item => item.prd_id === action.payload);
            if (item && item.ppd_qtd > 1) item.ppd_qtd -= 1;
        }
    }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
