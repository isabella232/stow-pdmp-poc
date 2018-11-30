import React, { Component } from 'react';
import stowClient from './../services/stow';
import Stow from '@stowprotocol/stow-js';
import { Grid, Row } from 'react-native-easy-grid';
import Spinner from './Spinner';
import { Text, AsyncStorage, StyleSheet } from 'react-native';
import IPFS from 'ipfs-mini';
import Button from './Button';
import theme from '@stowprotocol/brand/theme';

class RecordProcessing extends Component {

	state = {
		finished: false
	};

	encryptPrescription = async () => {
		let { credentials, prescription } = this.props.navigation.state.params;
		const { publicEncryptionKey } = JSON.parse(JSON.parse(credentials));
		const { substance } = prescription;
		prescription.issuedAt = new Date().toISOString();

		const encrypted = await Stow.util.encrypt(
    		publicEncryptionKey,
     		prescription,
  		);

  		return { prescription, encrypted };
	};

	goBackHome = () => {
		this.props.navigation.navigate('IssuePrescription');
	}

	uploadPrescription = encrypted => {
		const ipfs = new IPFS({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
 		return new Promise((resolve, reject) => {
    		ipfs.add(JSON.stringify(encrypted), (err, ipfsRed) => {
      			err ? reject(err) : resolve(ipfsRed);
    		});
      	});
	};

	formMetadata = content => ({
      dataFormat: "json",
      storage: "IPFS",
      duration: content.issuedAt,
      substance: content.substance,
      encryptionScheme: "x25519-xsalsa20-poly1305",
      stowjsVersion: "0.3.6",
      keywords: ['prescription']
	});

	appendRecord = async (content, dataUri) => {
		const { prescription, encrypted } = content;
		const { credentials } = this.props.navigation.state.params;
		const { ethereumAddress } = JSON.parse(JSON.parse(credentials));
		const stow = await stowClient();
		const dataHash = stow.web3.utils.sha3(JSON.stringify(prescription));
		const { records, users } = await stow.getContractInstances();
		const metadata = this.formMetadata(prescription);
		const [myAccount] = await stow.web3.eth.getAccounts();

		return records.addRecordByProvider(
			dataHash,
			myAccount.toLowerCase(),
			JSON.stringify(metadata),
			dataUri, {
				from: myAccount.toLowerCase(),
				gas: 500000
			}
		);
	}

	componentDidMount = async () => {
		const content = await this.encryptPrescription();
		const dataUri = await this.uploadPrescription(content.encrypted);
		const dataHash = await this.appendRecord(content, dataUri);

		this.setState({ finished: true });
	}

	render = () => {
		const { finished } = this.state;
		return (
			<Grid style={styles.container}>
				<Row style={styles.row}>
					<Text style={styles.title}>
						{finished ? 'Great! Prescription has been shared on the blockchain.' : 'Appending Prescription to Blockchain'}
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


export default RecordProcessing;