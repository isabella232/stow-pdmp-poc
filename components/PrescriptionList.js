import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Dimensions,
  Animated,
  Easing
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import theme from "@stowprotocol/brand/theme";


const PrescriptionList = ({ navigation, props }) => (
      <Grid style={styles.container}>
        <Row style={styles.row}>
          <Text style={styles.copy}>Issue Prescription</Text>
        </Row>
        <Row style={styles.row}>
          <Text style={styles.text}>Patient will take:</Text>
        </Row>
        <Row style={styles.row}>
          <TextInput placeholder="30" style={styles.inputAmount} />
          <TextInput placeholder="mg" style={styles.inputUnit} />
        </Row>
        <Row style={styles.row}>
          <Text style={styles.text}>Of</Text>
          <TextInput placeholder="30" style={styles.inputDetails} />
        </Row>
        <Row style={styles.row}>
          <Text style={styles.text}>a</Text>
          <TextInput placeholder="30" style={styles.inputDetails} />
        </Row>
        <Row style={styles.row}>
          <Text style={styles.text}>for</Text>
          <TextInput placeholder="30" style={styles.inputDetails} />
        </Row>
        <Row style={styles.row}>
          <Button
            buttonStyle={styles.button}
            onPress={this.register}
            color="white"
            title="Prescribe"
          />
        </Row>
      </Grid>
    );

const { height, width } = Dimensions.get("window");

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
  inputAmount: {
    width: 40,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1
  },
  inputUnit: {
    width: 40,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    marginLeft: 10
  },
  inputDetails: {
    width: 80,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    marginLeft: 10
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    fontFamily: theme.typography.secondary,
    fontSize: 20,
    paddingTop: 12,
    paddingBottom: 12,
    width: width - 20
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

export default PrescriptionList;
