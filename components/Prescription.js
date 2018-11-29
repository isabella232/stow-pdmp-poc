import React from "react";
import theme from "@stowprotocol/brand/theme";
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, Text, AsyncStorage } from "react-native";
import Button from "./Button";

const goBack = navigation => async () => {
  navigation.goBack();
};

const Prescription = ({ navigation }) => {
  const prescription = navigation.getParam("prescription");
  console.log(prescription);
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
        <Button title="Back" onPress={goBack(navigation)} />
      </Row>
    </Grid>
  );
};

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
