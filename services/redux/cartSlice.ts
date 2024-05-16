import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';
import { keys } from '@/constant/key';

interface CounterState {
    cart: Array<any>;
}

const cartLocal = typeof window !== 'undefined' && typeof document !== 'undefined' && localStorage.getItem(keys.CART);

export const initialState: CounterState = {
    cart: cartLocal ? JSON.parse(cartLocal!) : []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action: PayloadAction<any>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.
            if (typeof window !== 'undefined' && typeof state.cart !== 'string') {
                if (state.cart.length > 0) {
                    state.cart.filter((cart) => {
                        if (cart.id !== action.payload.id) {
                            state.cart = [...state.cart, action.payload]; // Using spread operator to create a new array
                            localStorage.setItem(keys.CART, JSON.stringify(state.cart))
                        } else {
                            state.cart.filter((cart) => {
                                if (cart.id === action.payload.id) {
                                    cart.id = action.payload.id;
                                    cart.title = action.payload.title;
                                    cart.price = action.payload.price
                                    cart.promotionPrice = action.payload.promotionPrice;
                                    cart.desc = action.payload.desc;
                                    cart.choose_count = action.payload.choose_count;
                                    cart.choose_color = action.payload.choose_color;
                                    cart.choose_size = action.payload.choose_size;
                                }
                            })
                            localStorage.setItem(keys.CART, JSON.stringify(state.cart))
                        }
                    })
                } else {
                    state.cart = [...state.cart, action.payload]; // Using spread operator to create a new array
                    localStorage.setItem(keys.CART, JSON.stringify(state.cart))
                }
            }
        },
        removeCart: (state, action: PayloadAction<any>) => {
            state.cart = state.cart.filter((cart) => cart.id !== action.payload.id)
            localStorage.setItem(keys.CART, JSON.stringify(state.cart))
        },
        reduceCartCount: (state, action: PayloadAction<any>) => {
            state.cart.map((cart) => {
                if(cart.id === action.payload.id){
                    if(cart.choose_count > 1){
                        cart.choose_count -= 1;
                    }
                }
            })
            localStorage.setItem(keys.CART, JSON.stringify(state.cart))
        },
        addCartCount: (state, action: PayloadAction<any>) => {
            state.cart.map((cart) => {
                if(cart.id === action.payload.id){
                    cart.choose_count += 1;
                }
            });
            localStorage.setItem(keys.CART, JSON.stringify(state.cart))
        }
    },
})

// Action creators are generated for each case reducer function
export const { addCart, removeCart, reduceCartCount, addCartCount } = cartSlice.actions

export const cartState = (state: RootState) => state.cart;

export default cartSlice.reducer