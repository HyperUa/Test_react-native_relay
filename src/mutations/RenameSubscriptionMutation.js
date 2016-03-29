import Relay from 'react-relay';

export default class RenameSubscriptionMutation extends Relay.Mutation {
  static fragments = {
    subscription: () => Relay.QL`
      fragment on Subscription {
        id,
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { renameSubscription }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RenameSubscriptionPayload {
        subscription {
          custom_name
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          subscription: this.props.subscription.id,
        },
      },
    ];
  }

  getVariables() {
    return {
      subscriptionId: this.props.subscription.id,
      custom_name: this.props.custom_name,
    };
  }

  getOptimisticResponse() {
    return {
      subscription: {
        custom_name: this.props.custom_name,
      },
    };
  }
}
