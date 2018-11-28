import React from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import Stow from '@stowprotocol/stow-js';

class GeneratingAccount {
	componentDidMount() {
		this.generateKeys()
			.then(console.log);
	}

	generateKeys() {
		return new Promise((resolve) => {
			const keys = Stow.util.genKeyPair();
			resolve(keys);
		}, 2000);
	}

	render() {
		return (
			<View>
				<Text>Great! Please hold tight while we generate your account.</Text>
				<Button 
					title='Patient'
					onPress={() => {}}
				/>
				<Button 
					title='Doctor'
					onPress={() => {}}
				/>
				<Button 
					title='Pharmacy'
					onPress={() => {}}
				/>
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
  }
});


export default GeneratingAccount;