import React, { Component, Navigator } from 'react-native';

import dashboardRoute from './navigatorRoutes';
import renderRelayScene from './relayRenderScene';

export default class DashboardAppNavigator extends Component {
  render() {
    const initialRoute = dashboardRoute();

    return (
      <Navigator
        initialRoute={initialRoute}
        renderScene={renderRelayScene}
      />
    )
  }
}