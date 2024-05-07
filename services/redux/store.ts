import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './counterSlice'
import { cartSlice } from './cartSlice'

export const store = () => {
  return configureStore({
    reducer: {
      counter : counterSlice.reducer,
      cart: cartSlice.reducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']