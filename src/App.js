import React, {Component} from 'react';
import Routes from './config/routes';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './ducks/rootReducer';

export default class App extends Component {
  render() {
    return (
      <Provider
        store={createStore(rootReducer, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    );
  }
}
