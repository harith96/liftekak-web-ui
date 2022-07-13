import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from 'reducers';
import rootSaga from 'sagas';
import initialState from './initialState';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(logger, sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
