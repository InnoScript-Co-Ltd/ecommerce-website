import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { keys } from '@/constant/key';

interface ExchangeState {
  exchange: {
    name: string;
    rate: any;
  };
}

// Create a function to get the initial state
const getInitialState = (): ExchangeState => {
  if (typeof window !== 'undefined') {
    const exchangeLocal = localStorage.getItem(keys.EXCHANGE);
    if (exchangeLocal) {
      return { exchange: JSON.parse(exchangeLocal) };
    }
  }
  return {
    exchange: {
      name: "",
      rate: "",
    },
  };
};

export const initialState: ExchangeState = getInitialState();

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    addExchange: (state, action: PayloadAction<{ name: string; rate: number | string }>) => {
      state.exchange = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem(keys.EXCHANGE, JSON.stringify(state.exchange));
      }
    },
  },
});

export const { addExchange } = exchangeSlice.actions;

export const exchangeState = (state: RootState) => state.exchnage;

export default exchangeSlice.reducer;
