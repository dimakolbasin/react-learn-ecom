import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const getPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async ({
           searchValue,
           selectedSort,
           selectedCategory,
           currentPage
         }, thunkAPI) => {
    try {
      const { data, headers } = await axios.get(`http://localhost:4200/data?${selectedCategory > 0 ? `category=${selectedCategory}` : ''}&_limit=4 &_page=${currentPage} &_sort=${selectedSort.sort}&_order=asc&q=${searchValue}`)

      return { data, headers }
    } catch (err) {
    }
  }
)

export const piazzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    items: [],
    contentType: 0
  },
  reducers: {
    setItems (state, action) {
      state.items = action.payload
    },
    setContentType (state, action) {
      state.contentType = action.payload
    }
  },
  extraReducers: {
    [getPizzas.fulfilled]: (state, action) => {
      state.items = action.payload.data
      state.contentType = +action.payload.headers['x-total-count']
    }
  }
})

export const { setItems } = piazzaSlice.actions

export default piazzaSlice.reducer
