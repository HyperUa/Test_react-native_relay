import React, { Component, Text, View, TouchableHighlight } from 'react-native';
import Relay from 'react-relay';

class Dashboard extends Component {

  handleClick(id) {
    return this.props.routes.subscription({query: {subscriptionId: id}});
  }
  
  
  render() {
    return (<View>
      <Text>Email:</Text>
      <Text>{this.props.viewer.email}</Text>

      {this.props.viewer.subscriptions.edges.map(({node}) => {
        return (
          <TouchableHighlight
            onPress={this.handleClick.bind(this, node._id)}
          >
            <Text>{node.custom_name}</Text>
          </TouchableHighlight>
        );
      })}
    </View>);
  }
};

export default Relay.createContainer(Dashboard, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id,
        email, 
        subscriptions(first: 10) {
          edges {
            node {
              custom_name,
              _id
            }
          }
        }
      }
    `
  }
});