import React, { Component, Text, View } from 'react-native';
import Relay from 'react-relay';

class App extends Component {
  render() {
    console.log(this.props.viewer);
    return (<View><Text>{this.props.viewer.email}</Text></View>);
  }
};

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id,
        email
      }
    `
  }
});