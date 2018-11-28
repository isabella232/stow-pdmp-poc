import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import './shim.js';

type Props = {};
export default class App extends Component<Props> {

  render() {
    return (
      <Text>Loading . . .</Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
