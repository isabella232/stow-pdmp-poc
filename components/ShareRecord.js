import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import {StyleSheet, Text, View, AsyncStorage, Dimensions} from 'react-native';
import Button from 'react-native-button';
import QRCodeScanner from 'react-native-qrcode-scanner';

class ShareRecord extends Component {
	state = {
		credentials: ''
	};

	render() {
		const { onCredentialsReceived } = this.props;

		return (
			 <QRCodeScanner
        onRead={(e) => this.setState({credentials: JSON.stringify(e)})}
        containerStyle={styles.root}
        topContent={
					<Text style={styles.title}>
						Share Record
					</Text>
        }
        bottomContent={
          <Text style={styles.copy}>
						To share your prescription with you pharmacy, please scan their QRCode. This will
						pull their blockchain credentials into your application so that it can share your
						prescription with them securely.
					</Text>
        }
      />
		);
	}
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.palette.primary.main,
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
  	fontSize: 20,
  	padding: 20,
  	backgroundColor: theme.palette.primary.main
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
});

export default ShareRecord;