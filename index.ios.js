import React, {
  AppRegistry,
  Component,
  StyleSheet,
  View
} from 'react-native';

import App from './src/App';

class Truebill extends Component {
  render() {
    return (
      <View style={styles.container}>
        <App />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  }
});

AppRegistry.registerComponent('test', () => Truebill);
