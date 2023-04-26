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
    },
    setFilters: (state, action) => {
      state.page = +action.payload.currentPage
      state.sort = action.payload.sort
      state.categoryId = +action.payload.selectedCategory
    },
    unsetFilters: (state, action) => {
      state.page = 1
      state.categoryId = 0
      state.sort = {
        name: 'популярности',
        sort: 'rating',
      }
    }
  },
})

export const { setCategoryId, setSortType, setCurrentPage, setFilters, unsetFilters } = filterSlice.actions

export default filterSlice.reducer
