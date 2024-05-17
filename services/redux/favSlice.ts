import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';
import { keys } from '@/constant/key';

interface FavState {
    fav: Array<any>;
}

const favlocal = typeof window !== 'undefined' && typeof document !== 'undefined' && localStorage.getItem(keys.FAV);

export const initialState: FavState = {
    fav: favlocal ? JSON.parse(favlocal!) : []
};

export const favSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addFav: (state, action: PayloadAction<any>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.
            if (typeof window !== 'undefined' && typeof state.fav !== 'string') {
                if (state.fav.length > 0) {
                    state.fav.filter((fav) => {
                        if(fav.id !== action.payload.id){
                            state.fav = [...state.fav, action.payload]; // Using spread operator to create a new array
                            localStorage.setItem(keys.FAV, JSON.stringify(state.fav))
                        }
                    })
                } else {
                    state.fav = [...state.fav, action.payload]; // Using spread operator to create a new array
                    localStorage.setItem(keys.FAV, JSON.stringify(state.fav))
                }
            }
        },
        removeFav: (state, action: PayloadAction<{id : any}>) => {
            state.fav = state.fav.filter((fav) => fav.id !== action.payload.id)
            localStorage.setItem(keys.FAV, JSON.stringify(state.fav))
        },

    },
})

// Action creators are generated for each case reducer function
export const { addFav, removeFav } = favSlice.actions

export const favState = (state: RootState) => state.fav;

export default favSlice.reducer