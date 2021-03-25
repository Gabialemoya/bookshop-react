//import {thunk} from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
//import {thunk} from 'redux-thunk';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';


export const middlewares = [thunk, logger];
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;