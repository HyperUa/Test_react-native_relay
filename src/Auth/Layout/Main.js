import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default  class App extends Component {
  render() {
    return (
      <View style={styles.content}>
        <View style={styles.header}><Text>Truebill</Text></View>
        <View style={styles.container}>
          {this.props.children}
        </View>

      </View>
    );

  }

}

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  container: {
    flex: 8
  }
});