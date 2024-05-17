import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './counterSlice'
import { cartSlice } from './cartSlice'
import { exchangeSlice } from './exchangeSlice'
import { favSlice } from './favSlice'

export const store = () => {
  return configureStore({
    reducer: {
      counter : counterSlice.reducer,
      cart: cartSlice.reducer,
      exchnage: exchangeSlice.reducer,
      fav: favSlice.reducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']