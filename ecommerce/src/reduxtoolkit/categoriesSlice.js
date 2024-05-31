
import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    setCategories(state, action) {
      console.log(action.payload);
      return action.payload;
    }
  }
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
