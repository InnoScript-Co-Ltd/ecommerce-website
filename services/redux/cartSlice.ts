import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';
import { keys } from '@/constant/key';

interface CounterState {
    cart: Array<any>;
}

const cartLocal = typeof window !== 'undefined' && localStorage.getItem(keys.CART);

export const initialState: CounterState = {
    cart: cartLocal ? JSON.parse(cartLocal) : []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action : PayloadAction<any> ) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.

            state.cart = action.payload;
        },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { addCart } = cartSlice.actions

export const cartState = (state: RootState) => state.cart;

export default cartSlice.reducer