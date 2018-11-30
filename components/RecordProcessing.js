import React, { Component } from 'react';
import stowClient from './../services/stow';
import Stow from '@stowprotocol/stow-js';
import { Grid, Row } from 'react-native-easy-grid';
import Spinner from './Spinner';
import { Text, AsyncStorage } from 'react-native';
import IPFS from 'ipfs-mini'

class RecordProcessing extends Component {
	state = {
		publicEncryptionKey: ''
	};
	encryptPrescription = async () => {
		const { credentials, prescription } = this.props.navigation.state.params;
		const { publicEncryptionKey } = JSON.parse(JSON.parse(credentials));
		let unencrypted = Object({}, prescription);
		unencrypted.issuedAt = new Date().toISOString();

		const encrypted = await Stow.util.encrypt(
    		publicEncryptionKey,
     		unencrypted,
  		);

  		return { unencrypted, encrypted };
	};

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
		const { unencrypted, encrypted } = content;
		const { credentials } = this.props.navigation.state.params;
		const { ethereumAddress } = JSON.parse(JSON.parse(credentials));
		const stow = await stowClient();
		const dataHash = stow.web3.utils.sha3(JSON.stringify(unencrypted));
		const { records, users } = await stow.getContractInstances();
		const metadata = this.formMetadata(unencrypted);
		const [myAccount] = await stow.web3.eth.getAccounts();
		const privateKey = await AsyncStorage.getItem('@Stow:ethereumPrivateKey');
		const address = await AsyncStorage.getItem('@Stow: ethereumAddress');
		
		this.setState({ address, myAccount })

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
		const dataHash = await this.appendRecord(content, dataUri)
	}

	render = () => {
		return (
			<Grid>
				<Row>
					<Text>
						Appending Prescription to Blockchain
					</Text>
				</Row>
				<Row>

					<Text>
					{'myAccount'}
					</Text>
					<Text>
					{this.state.myAccount}
					</Text>

					<Text>

					</Text>

				</Row>
				<Row>
					<Text>
					{'address'}
					</Text>
					<Text>
					{this.state.address}
					</Text>
				</Row>
			</Grid>
		);
	}
}

export default RecordProcessing;