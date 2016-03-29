import React from 'react-native';
import Relay from 'react-relay';

import { routerReducer, Router, Schema, Route } from 'react-native-redux-router';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { getUrl } from './helper';

import RelayApp from './RelayApp';

import SignUpPage from './Auth/SignUp/Page';
import SignInPage from './Auth/SignIn/Page';
import Dashboard from './Dashboard/Dashboard';
import Subscription from './Dashboard/Subscription';

const store = createStore(combineReducers({routerReducer}));

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(getUrl('graphql'), {
    credentials: 'same-origin'
  })
);

export default  () => (
  <Provider store={store}>
    <Router>
      <Route name="dashboard" passProps={{Component: Dashboard}} component={RelayApp} />
      <Route name="subscription" passProps={{Component: Subscription}} component={RelayApp} />
      <Route name="register" initial component={SignUpPage} />
      <Route name="login"  component={SignInPage} />
    </Router>
  </Provider>
);
