import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import {loginReducer, locationReducer} from './redux/reducers';
import DefaultScreen from './src/screens/DefaultScreen';
import Thunk from 'redux-thunk';

const rooteReducer = combineReducers({
  login: loginReducer,
  coords: locationReducer,
});
const store = createStore(
  rooteReducer,
  composeWithDevTools(applyMiddleware(Thunk)),
);
const App = () => (
  <Provider store={store}>
    <DefaultScreen />
  </Provider>
);

export default App;
