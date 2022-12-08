import { createSlice, current } from '@reduxjs/toolkit';
import _ from 'lodash';

const DATA_SLICE = 'DATA';

const initialState = {
  data: [],
};

export const dataSlice = createSlice({
  name: DATA_SLICE,
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    fetchData: () => {},
  },
});

export const {
  fetchData,
  setData,
} = dataSlice.actions;

export const dataSliceSelector = (state) => state.data;

export default dataSlice.reducer;
