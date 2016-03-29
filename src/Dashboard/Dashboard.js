import React, {Text, Component} from 'react-native';

import Relay from 'react-relay';
import App from './App';
import Route from './Router';

import {getUrl} from '../helper';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(getUrl('graphql'), {
    credentials: 'same-origin'
  })
);

export default class Dashboard extends Component {
  render() {
    return (<Relay.RootContainer
      Component={App}
      route={new Route()}
      renderFailure={(error, retry) => {
        // this.props.goToLogin();
      }}
    />)
  }
};
