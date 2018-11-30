import React from "react";
import IPFS from 'ipfs-mini';
import theme from "@stowprotocol/brand/theme";
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, Text, AsyncStorage, Dimensions } from "react-native";
import Button from "./Button";
import Stow from '@stowprotocol/stow-js'
import { Jiro } from 'react-native-textinput-effects';

const ipfs = new IPFS({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    });

class Prescription extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
 let prescription = this.props.navigation.getParam('prescription');
 let credentials = this.props.navigation.getParam('credentials');
  new Promise((resolve, reject) => {
      ipfs.cat(prescription.dataUri, (err, ipfsRed) => {
        err ? reject(err) : resolve(ipfsRed);
      });
    }).then(file =>{
    	const encryptedData = JSON.parse(file);
    	return Stow.util.decrypt(`fvuLKt4mLro5T7445Y5qTOuLSxp6BfwQybeLT2NmMFY=`, encryptedData);
    }).then(data => {
    	this.setState({ data });
    })
  }

  share() {}

  render() {
  const { data } = this.state;
  return (
      <Grid style={styles.container}>
        <Row style={styles.row}>
          <Text style={styles.copy}>Prescription</Text>
        </Row>
        <Row style={styles.row}>
          <Jiro
            label='dosage'
            style={styles.input}
            borderColor={theme.palette.secondary.main}
            labelStyle={styles.label}
            inputStyle={styles.label}
            value={data.dosage}
            editable={false}
          />
        </Row>
        <Row style={styles.row}>
          <Jiro
            label='substance'
            style={styles.input}
            borderColor={theme.palette.secondary.main}
            labelStyle={styles.label}
            inputStyle={styles.label}
            value={data.substance}
            editable={false}
          />
        </Row>
        <Row style={styles.row}>
          <Jiro
            label='frequency'
            style={styles.input}
            borderColor={theme.palette.secondary.main}
            labelStyle={styles.label}
            inputStyle={styles.label}
            value={data.frequency}
            editable={false}
          />
        </Row>
        <Row style={styles.row}>
          <Jiro
            label='timeframe'
            style={styles.input}
            borderColor={theme.palette.secondary.main}
            labelStyle={styles.label}
            inputStyle={styles.label}
            value={data.timeframe}
            editable={false}
          />
        </Row>
        <Row style={styles.row}>
          <Jiro
            label='times to refill'
            style={styles.input}
            borderColor={theme.palette.secondary.main}
            labelStyle={styles.label}
            inputStyle={styles.label}
            value={data.timesToRefill}
            editable={false}
          />
        </Row>
        <Row style={styles.row}>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Back"
          />
        </Row>
      </Grid>
  );
};
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    padding: 50,
    backgroundColor: theme.palette.primary.main
  },
  input: {
    width: width - 60
  },
  label: {
    color: 'white',
    fontFamily: theme.typography.primary
  },
  row: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  text: {
    color: "black",
    fontFamily: theme.typography.secondary,
    fontSize: 15
  },
  copy: {
    fontFamily: theme.typography.secondary,
    textAlign: "center",
    fontSize: 32
  }
});

export default Prescription;
