import { all, fork } from 'redux-saga/effects';
import { watchDataSaga } from '../features/table/dataSagas';

export default function* rootSaga() {
  yield all([
    // more sagas from different files
    watchDataSaga,
  ].map(fork));
}
