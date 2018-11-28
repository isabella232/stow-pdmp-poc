import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import './shim.js';
import stowClient from './services/stow';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    record: {}
  };

  componentDidMount() {
    const dataHash = '0xebf0a304f0e5a6445a7fd5850d00fd851837e8694184072e0f1b79037e447485';
    const stow = stowClient();

      stow.getRecord(dataHash).then(console.log);
  }

  render() {
    const { record } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>{JSON.stringify(record)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    fontFamily: 'Raleway',
    marginBottom: 5,
  },
});
