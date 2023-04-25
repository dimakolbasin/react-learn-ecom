import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    categoryId: 0,
    page: 1,
    sort: {
      name: 'популярности',
      sort: 'rating',
    },
  },
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload
    },
    setSortType: (state, action) => {
      state.sort = action.payload
    },
    setCurrentPage: (state, action) => {
      state.page = action.payload
    }
  },
})

export const { setCategoryId, setSortType, setCurrentPage } = filterSlice.actions

export default filterSlice.reducer
