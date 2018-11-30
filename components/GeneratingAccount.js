import React, { Component } from "react";

import { StyleSheet, Text, View, AsyncStorage } from "react-native";

import Button from "./Button";
import Stow from "@stowprotocol/stow-js";
import stowClient from "./../services/stow";
import { Col, Row, Grid } from "react-native-easy-grid";
import theme from "@stowprotocol/brand/theme";
import Spinner from "./Spinner";

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
			.then(this.generateAccount)
			.then(this.giveEther)
			.then(this.finishLoading);
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
			}, 2000);
		});
	};

	giveEther = account => {
		return new Promise((resolve, reject) => {
			setTimeout(async() => {
				const { address } = account;
				console.log(account);

				this.setState({
					copy: 'Fueling Address'
				});

				const stow = await stowClient();
				const [myAccount] = await stow.web3.eth.getAccounts();

				try {
					await stow.web3.eth.sendTransaction({
						from: myAccount,
						to: address, 
						value: stow.web3.utils.toWei("0.1", "ether")
					});
				} catch (e) {

				}

				resolve();
			}, 1000);

		});


	}

	saveAccount = account => this.setState({
		ethereumPrivateKey: account.privateKey,
		ethereumAddress: account.address
	});

	generateAccount = () => {
		this.setState({
			copy: 'Creating ethereum addresss'
		});

		return new Promise(async (resolve, reject) => {
			setTimeout(async () => {
				const stow = await stowClient();
				const account = await stow.web3.eth.accounts.create();
				this.saveAccount(account);
	  			resolve(account);
	  		}, 2000);
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


    await AsyncStorage.mergeItem('@Stow:credentials', JSON.stringify({
      publicEncryptionKey,
      privateEncryptionKey,
      ethereumPrivateKey,
      ethereumAddress
    }));

    const credentials = await AsyncStorage.getItem('@Stow:credentials');

      return this.props.navigation.navigate("AuthContainer", { credentials: JSON.parse(credentials) });

  };

  render = () => {
    const { copy, finished } = this.state;
    return (
      <Grid style={styles.container}>
        <Row style={styles.row}>
          <Text style={styles.copy}>{copy}</Text>
        </Row>
        <Row style={styles.row}>
          <Spinner />
        </Row>
        <Row style={styles.row}>
          {finished && <Button title="Get Started" onPress={this.register} />}
        </Row>
      </Grid>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    padding: 20,
    backgroundColor: theme.palette.primary.main
  },
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  copy: {
    fontFamily: theme.typography.secondary,
    textAlign: "center",
    fontSize: 32
  }
});

export default GeneratingAccount;
