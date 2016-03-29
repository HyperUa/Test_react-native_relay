import React, { Component } from 'react-native';
import Relay from 'react-relay';
import * as queryConfig from './queryConfig';

export default class RelayApp extends Component {
  render() {
    const self = this;

    return (
      <Relay.RootContainer
        Component={self.props.passProps.Component}
        route={(() => {
          const query = self.props.query || {};
          if (self.props.passProps.queryConfig) {
            return self.props.passProps.queryConfig(query);
          }
          return new queryConfig.DefaultQuery(query);
        })()}
        renderFetched={(data) => {
          return <self.props.passProps.Component
            {...self.props}
            {...data}
          />;
        }}
      />
    );
  }
}