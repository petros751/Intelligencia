import { createSlice, current } from '@reduxjs/toolkit';
import _ from 'lodash';

const DATA_SLICE = 'DATA';

const initialState = {
  data: [],
  categories: [],
  dataChart: [],
};

export const dataSlice = createSlice({
  name: DATA_SLICE,
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload._embedded.terms;
      state.limit = action.payload.page.size;
      state.totalData = action.payload.page.totalElements;
      state.activePage = action.payload.page.number+1;
      state.totalPages = action.payload.page.totalPages;
    },
    setChartData:(state, action) => {
      state.categories = action.payload.categories;
      state.dataChart = action.payload.data;
    },
    fetchData: () => {},
  },
});

export const {
  fetchData,
  setData,
  setChartData
} = dataSlice.actions;

export const dataSliceSelector = (state) => state.data;

export default dataSlice.reducer;
