import React, { Component } from 'react';
import stowClient from './../services/stow';
import Stow from '@stowprotocol/stow-js';
import { Grid, Row } from 'react-native-easy-grid';
import Spinner from './Spinner';
import { Text, AsyncStorage, StyleSheet } from 'react-native';
import Button from './Button';
import theme from '@stowprotocol/brand/theme';
import grantPermission from './../services/grantPermission';

class PermissionProcessing extends Component {

	state = {
		finished: false,
		show: {}
	};


	goBackHome = () => {
		this.props.navigation.navigate('PrescriptionList');
	}

	componentDidMount = async () => {
		const stow = await stowClient();
		const [myAddress] = await stow.web3.eth.getAccounts();
		const { credentials, dataHash } = this.props.navigation.state.params;
		const { publicEncryptionKey } = JSON.parse(JSON.parse(credentials));

		await grantPermission (myAddress, dataHash, 'fvuLKt4mLro5T7445Y5qTOuLSxp6BfwQybeLT2NmMFY=', myAddress, publicEncryptionKey)

		this.setState({ finished: true });
	}

	render = () => {
		const { finished } = this.state;
		return (
			<Grid style={styles.container}>
				<Row style={styles.row}>
					<Text style={styles.title}>
						{finished ? 'Great! Prescription has been shared on the blockchain.' : 'Sharing Prescription with pharmacy.'}
					</Text>
				</Row>
				<Row style={styles.row}>
					<Spinner shouldSpin={true} />
				</Row>
				<Row style={styles.row}>
					{finished && <Button
						title='Go Back'
						onPress={this.goBackHome}
					/>}
				</Row>
			</Grid>
		);
	}
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
  title: {
    fontFamily: theme.typography.secondary,
    textAlign: "center",
    fontSize: 32
  }
});


export default PermissionProcessing;