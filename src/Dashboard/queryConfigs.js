import Relay from 'react-relay';

export class BaseQueryConfig extends Relay.Route {
  static queries = {
    viewer: () => Relay.QL`query {viewer}`
  };
  static routeName = 'BaseQueryConfig';
}
