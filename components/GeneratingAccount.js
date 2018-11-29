import React, { Component } from 'react';

import {
	Platform, 
	StyleSheet, 
	Text, 
	View, 
	Image, 
	Animated, 
	Easing, 
	Dimensions, 
	AsyncStorage
} from 'react-native';

import Button from 'react-native-button';
import Stow from '@stowprotocol/stow-js';
import stowClient from './../services/stow';
import { Col, Row, Grid } from "react-native-easy-grid";

const spinValue = new Animated.Value(0);

Animated.timing(
    spinValue,
  {
    toValue: 2,
    duration: 6000,
    easing: Easing.linear
  }
).start();

const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
});

class GeneratingAccount extends Component {

	state = {
		copy: `Great! Now let's make you an account`,
		finished: false,
		publicEncryptionKey: null,
		privateEncryptionKey: null,
		ethereumPrivateKey: null,
		ethereumAddress: null,
	};

	componentDidMount = () => {
		this
			.generateKeys()
			.then(this.generateAccount);
	};

	saveKeys = keys => this.setState({
		publicEncryptionKey: keys.publicKey,
		privateEncryptionKey: keys.privateKey
	});

	generateKeys = () => {
		this.setState({
			copy: 'Generating keys'
		});

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const keys = Stow.util.genKeyPair();
				this.saveKeys(keys);
				resolve();
			}, 3000);
		});
	};

	saveAccount = account => this.setState({
		ethereumPrivateKey: account.privateKey,
		ethereumAddress: account.address
	});

	generateAccount = () => {
		this.setState({
			copy: 'Creating ethereum addresss'
		});

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const stow = stowClient();
			  const account = stow.web3.eth.accounts.create();
			  this.saveAccount(account);
	  		this.finishLoading();
	  		resolve();
	  	}, 3000)
		});
	}

	finishLoading = () => {
	  this.setState({ 
	  	finished: true,
	  	copy: `Congrats! You're ready to get started`,
	  });
	}

	register = async () => {
		const { 
			publicEncryptionKey, 
			privateEncryptionKey, 
			ethereumPrivateKey, 
			ethereumAddress
		} = this.state;

    await AsyncStorage.setItem('@Stow:publicEncryptionKey', publicEncryptionKey);
    await AsyncStorage.setItem('@Stow:privateEncryptionKey', privateEncryptionKey);
    await AsyncStorage.setItem('@Stow:ethereumPrivateKey', ethereumPrivateKey);
    await AsyncStorage.setItem('@Stow: ethereumAddress', ethereumAddress);
	};

	render = () => {
		const { copy, dots, finished } = this.state;
		return (
			<Grid style={styles.container}>
				<Row style={styles.row}>
					<Text style={styles.copy}>{copy}</Text>
				</Row>
				<Row style={styles.row}>
					<Animated.Image 
						style={styles.spinner} 
						source={require('./../assets/images/logo-filled.png')}
					/>
				</Row>
				<Row style={styles.row}>
					{finished && <Button
		        style={styles.button}
		        onPress={this.register}>
						Get Started
					</Button>}
				</Row>
			</Grid>			
		);
	}
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
		textAlign: 'center',
		padding: 20,
    backgroundColor: theme.palette.primary.main,
  },
  row: {
  	flex: 1,
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  button: {
  	color: 'white',
  	backgroundColor: theme.palette.secondary.main,
  	fontFamily: theme.typography.secondary,
  	fontSize: 20,
  	paddingTop: 12,
  	paddingBottom: 12,
  	width: width - 20,
  },
  copy: {
  	fontFamily: theme.typography.secondary,
  	textAlign: 'center',
  	fontSize: 32,
  },
  spinner: {
  	height: 200,
  	width: 200,
  	transform: [{rotate: spin}]
  },
});

export default GeneratingAccount;