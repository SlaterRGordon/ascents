import { createStore, applyMiddleware, compose, AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleWare = [thunk];

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type DispatchFunctionType = ThunkDispatch<any, undefined, AnyAction>

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware<DispatchFunctionType, any>(...middleWare))
);

export default store;