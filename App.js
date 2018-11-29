import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import './shim.js';
import GeneratingAccount from './components/GeneratingAccount';

type Props = {};
export default class App extends Component<Props> {

  render() {
    return (
      <GeneratingAccount />
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