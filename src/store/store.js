import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import dataReducer from '../features/table/dataSlice';
import rootSaga from './saga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the store middlewares array, to include saga middleware
const middleware = [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware];

// EXAMPLE: Dynamic value that can be configured by the .env file regarding the environment.
const devMode = 'development';

if (devMode) {
  // If in devMode, add redux logging
  middleware.push(logger);
}

// Include all reducers to store
const reducer = combineReducers({
    data: dataReducer,
});

export const store = configureStore({
  reducer,
  devTools: devMode,
  middleware,
});

// Start sagas
sagaMiddleware.run(rootSaga);
