import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0
  },
  reducers: {
    addItem (state, action) {
      const findItem = state.items.find(item => item.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
        state.totalPrice = state.items.reduce((sum, obj) => {
          return (obj.price * obj.count) + sum
        }, 0)
    },
    incItem (state, action) {
      const findItem = state.items.find(item => item.id === action.payload)
      if (findItem) findItem.count++
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
      }, 0)
    },
    decItem (state, action) {
      const findItem = state.items.find(item => item.id === action.payload)
      if (!findItem) return

      if (findItem.count > 1) {
        findItem.count--
        state.totalPrice = state.items.reduce((sum, obj) => {
          return (obj.price * obj.count) + sum
        }, 0)
        return
      }
      removeItem(state, action)
    },
    removeItem (state, action) {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
      }, 0)
    },
    clearItems (state) {
      state.items = []
      state.totalPrice = 0
    }
  },
})

export const { addItem, removeItem, clearItems, incItem, decItem } = cartSlice.actions

export default cartSlice.reducer
