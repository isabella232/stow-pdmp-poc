import React, { Component } from 'react';
import {StyleSheet, Text, AsyncStorage} from 'react-native';
import QRCode from 'react-native-qrcode';
import { Col, Row, Grid } from "react-native-easy-grid";
import theme from "@stowprotocol/brand/theme";

class ShareCredentials extends Component {

	state = {
		credentials: {}
	};

	getCredentials = async () => {
	  const credentials = await AsyncStorage.getItem('@Stow:credentials');

	  this.setState({
	  credentials
	  });
	};

	componentDidMount = () => {
		this.getCredentials();
	}

	render = () => {
		const { credentials } = this.state;

		return (
			<Grid style={styles.root}>
				<Row style={styles.row}>
					<Text style={styles.title}>
						Share Credentials
					</Text>
				</Row>
				<Row style={styles.row}>
			    {credentials && <QRCode
			      value={JSON.stringify(this.state.credentials)}
			      size={200}
			      bgColor='black'
			      fgColor='white'
			    />}
			  </Row>
		    <Row style={styles.row}>
		    	<Text style={styles.copy}>
		    		Show this QR code to another user to share your ethereum credentials with them.
		    	</Text>
		    </Row>
			</Grid>
		);		
	}
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: 50
  },
  title: {
  	fontFamily: theme.typography.secondary,
  	fontSize: 32,
  	textAlign: 'center'
  },
   row: {
  	flex: 1,
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  copy: {
  	fontFamily: theme.typography.primary,
  	textAlign: 'center',
  	fontSize: 20
  }
});

export default ShareCredentials;