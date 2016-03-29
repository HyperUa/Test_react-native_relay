import React from 'react-native';
import Relay from 'react-relay';

export default function relayRenderScene(route, navigator) {
  const { title, Component, queryConfig } = route;
console.log(route);
  return (
    <Relay.RootContainer
      Component={Component}
      route={queryConfig}
      renderFetched={(data) => {
        return <Component
          navigator={navigator}
          name={title}
          {...data}
        />;
      }}
    />
  );
}
