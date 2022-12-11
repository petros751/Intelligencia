import { takeLatest, put, call } from 'redux-saga/effects';
import { setData, fetchData, setChartData } from './dataSlice';
import { fetchDataCall } from '../../utils/apiCalls';
import { duplicateItem } from '../chart/chartOptionsService';
import _ from 'lodash';

function* fetchDataSagas(action) {
  try {
    console.log(action.payload);
    const res = yield call(fetchDataCall, action.payload);
    if (res.error && res.error === 'Could not authenticate user') {
      console.log(res.error);
    } else {
      console.log('RESPNSE: ', res);
      yield put(setData(res));
      let tempArray = [];
      let categories = [];
      _.forEach(res._embedded.terms, function(value) {
        _.forEach(value.label.split(" "), function(value) {
          tempArray.push(value.toLowerCase())
        })
        // setDataChart(duplicateItem(tempArray))
        categories = _.uniq(tempArray);
      });
      console.log('tempArray: ', tempArray);
      const data = yield call(duplicateItem, tempArray)
      const chartData = {categories, data}
      console.log('chartData: ', chartData);
      yield put(setChartData(chartData))
      
    }
  } catch (err) {
    console.error('New error', err);
  }
}



export function* watchDataSaga() {
    yield takeLatest(fetchData.type, fetchDataSagas);
}