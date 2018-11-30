import React from "react";
import IPFS from 'ipfs-mini';
import theme from "@stowprotocol/brand/theme";
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, Text, AsyncStorage } from "react-native";
import Button from "./Button";
import Stow from '@stowprotocol/stow-js'

const ipfs = new IPFS({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    });

class Prescription extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: null
    };
  }

  componentDidMount() {
 let prescription = this.props.navigation.getParam('prescription');
 let credentials = this.props.navigation.getParam('credentials');
 console.log(prescription, credentials)
  new Promise((resolve, reject) => {
      ipfs.cat(prescription.dataUri, (err, ipfsRed) => {
        err ? reject(err) : resolve(ipfsRed);
      });
    }).then(file =>{
    	const encryptedData = JSON.parse(file);
    	return Stow.util.decrypt(`br3COPKC40F3n5nprnpxCoyotrAmLAN9mPVWyEYyxDk=`, encryptedData);
    }).then(data => {
    	console.log(data)
    })
  }

  share() {}

  render() {
  const prescription = this.props.navigation.getParam('prescription')
  return (
    <Grid style={styles.root}>
      <Row style={styles.row}>
        <Text style={styles.title}>{prescription.metadata.substance}</Text>
      </Row>
      <Row style={styles.row}>
        <Text style={styles.text}>
          Prescribed: {new Date(prescription.metadata.date).toString()}
        </Text>
      </Row>
      <Row style={styles.row}>
        <Text style={styles.text}>Dosage:</Text>
        <Text style={styles.subtext}> {prescription.metadata.dosage} </Text>
      </Row>
      <Row style={styles.row}>
        <Text style={styles.text}>Frequency:</Text>
        <Text style={styles.subtext}> {prescription.metadata.frequency} </Text>
      </Row>
      <Row style={styles.row}>
        <Text style={styles.text}>Duration:</Text>
        <Text style={styles.subtext}> {prescription.metadata.duration} </Text>
      </Row>
      <Row style={styles.row}>
        <Text style={styles.text}>Refills:</Text>
        <Text style={styles.subtext}> {prescription.metadata.refills} </Text>
      </Row>
      <Row style={styles.row}>
        <Button title="Back" onPress={() => this.props.navigation.goBack()} />
      </Row>
    </Grid>
  );
};

}

const styles = StyleSheet.create({
  root: {
    padding: 20,
    textAlign: "center",
    backgroundColor: theme.palette.primary.main
  },
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontFamily: theme.typography.secondary,
    fontSize: 32,
    color: "white"
  },
  text: {
    color: "white",
    fontFamily: theme.typography.secondary,
    fontSize: 20
  },
  subtext: {
    color: "white",
    fontFamily: theme.typography.secondary,
    fontSize: 15
  }
});

export default Prescription;
