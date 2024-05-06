'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { store, AppStore } from '@/services/redux/store'
import { initializeCount } from '@/services/redux/counterSlice'

export default function StoreProvider({
  cart,
  children
}: {
  cart: Array<any>
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store();
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}