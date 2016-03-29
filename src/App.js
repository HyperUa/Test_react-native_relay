import React, {Component} from 'react-native';

import SignUpPage from './Auth/SignUp/Page';
import SignInPage from './Auth/SignIn/Page';

import Dashboard from './Dashboard/Dashboard';

import { routerReducer, Router, Schema, Route } from 'react-native-redux-router';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';


const store = createStore(combineReducers({routerReducer}));

console.log(store);
export default  () => (
  <Provider store={store}>
    <Router>
      <Route name="dashboard" initial component={Dashboard} />
      <Route name="register" component={SignUpPage} />
      <Route name="login" component={SignInPage} />
    </Router>
  </Provider>
);

