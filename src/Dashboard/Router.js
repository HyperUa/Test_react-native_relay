import React from 'react-native';
import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    viewer: () => Relay.QL`query {viewer}`
  };
  static routeName = 'Test';
}
