import Relay from 'react-relay';

export class DefaultQuery extends Relay.Route {
  static queries = {
    viewer: () => Relay.QL`query {viewer}`
  };
  static routeName = 'ViewerQueries';
}