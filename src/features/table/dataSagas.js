import { takeLatest, put, call } from 'redux-saga/effects';
import { setData, fetchData, setChartData, setLoadData } from './dataSlice';
import { fetchDataCall } from '../../utils/apiCalls';
import { duplicateItem } from '../chart/chartOptionsService';
import { errorToastMessage } from '../../utils/errorServices';
import _ from 'lodash';

function* fetchDataSagas(action) {
  try {
    yield put(setLoadData(true));
    const res = yield call(fetchDataCall, action.payload);
    if (res.error) {
      yield call(errorToastMessage, res.message);
    } else {
      yield put(setData(res));
      let tempArray = [];
      let categories = [];
      _.forEach(res._embedded.terms, (value) => {
        _.forEach(value.label.split(" "), (value) => {
          tempArray.push(value.toLowerCase());
        })
        categories = _.uniq(tempArray);
      });
      const data = yield call(duplicateItem, tempArray);
      const chartData = {categories, data}
      yield put(setChartData(chartData));
      yield put(setLoadData(false));
    }
  } catch (err) {
    yield call(errorToastMessage, err);
  }
}



export function* watchDataSaga() {
    yield takeLatest(fetchData.type, fetchDataSagas);
}