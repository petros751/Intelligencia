import { takeLatest, put, call } from 'redux-saga/effects';
import { setData, fetchData } from './dataSlice';
import { fetchDataCall } from '../../utils/apiCalls';

function* fetchDataSagas(action) {
  try {
    console.log(action.payload);
    const res = yield call(fetchDataCall, action.payload);
    if (res.error && res.error === 'Could not authenticate user') {
      console.log(res.error);
    } else {
      console.log('RESPNSE: ', res);
      yield put(setData(res));
    }
  } catch (err) {
    console.error('New error', err);
  }
}



export function* watchDataSaga() {
    yield takeLatest(fetchData.type, fetchDataSagas);
}