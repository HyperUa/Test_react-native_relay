import React, { Component, Text, View, TouchableHighlight } from 'react-native';
import Relay from 'react-relay';
import RenameSubscriptionMutation from '../mutations/RenameSubscriptionMutation';

class Subscription extends Component {
  handleGoBack() {
    return this.props.routes.pop()
  }

  handleRename() {
    Relay.Store.commitUpdate(new RenameSubscriptionMutation({
      subscription: this.props.viewer.subscription,
      custom_name: 'Test Ok!'
    }), {
      onSuccess: () => {
        console.log('Thanks God!');
      },
      onFailure: (transaction) => {
        console.log('Rename error:', transaction);
      }
    });
  }

  render() {
    return (<View>
      <Text>Email:</Text>
      <Text>{this.props.viewer.email}</Text>
      <Text>Sybscription</Text>
      <Text>{this.props.viewer.subscription._id}</Text>
      <Text>{this.props.viewer.subscription.custom_name}</Text>

      <TouchableHighlight
        onPress={this.handleRename.bind(this)}
      >
        <Text>Rename</Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={this.handleGoBack.bind(this)}
      >
        <Text>Back</Text>
      </TouchableHighlight>
    </View>);
  }
};

export default Relay.createContainer(Subscription, {
  initialVariables: {
    subscriptionId: null
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id,
        email, 
        subscription(subscriptionId: $subscriptionId) {
          id,
          _id,
          custom_name,
          ${RenameSubscriptionMutation.getFragment('subscription')}
        }
      }
    `
  }
});