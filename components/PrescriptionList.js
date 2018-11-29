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
import BUtton from "./Button";

class PrescriptionList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      prescriptions: []
    };
    this.prescriptionMap = this.prescriptionMap.bind(this);
    this.share = this.share.bind(this);
  }

  componentDidMount() {
    fetch(
      `https://qastg.api.stow-protocol.com/records?owner=${this.props.credentials.ethereumAddress}`
    )
      .then(response => response.json())
      .then(prescriptions => {
        console.log(prescriptions)
        // can edit this mapping once we have data to play with
        prescriptions = prescriptions.map(prescription =>{
          prescription.metadata = JSON.parse(prescription.metadata)
          prescription.metadata.substance = 'hugs';
          prescription.metadata.date = "2014-11-03T19:38:34.203Z";
          return prescription;
          })
        console.log(prescriptions);
        this.setState({ prescriptions });
      });
  }

  share(){}

  prescriptionMap(role) {
    console.log(role, this.state.prescriptions);
    return this.state.prescriptions.map(prescription => {
      return (
        <Row style={styles.row} key={prescription.dataHash}>
          <Col>
            <Text style={styles.text}>{prescription.metadata.substance}</Text>
            <Text style={styles.subtext}>
              {new Date(prescription.metadata.date).toString()}
            </Text>
          </Col>
          <Col>
          {// have to edit here for disabled and check for existing share Fill here is for Pharmacy to Fill}
            <Button title={role === "patient" ? "Share" : "Fill"} />
          }
          }
          </Col>
        </Row>
      );
    });
  }

  render() {
    return (
      <Grid style={styles.container}>
        <Row style={styles.row}>
          <Text style={styles.copy}>Prescriptions</Text>
        </Row>
        {this.prescriptionMap(this.props.credentials.role)}
      </Grid>
    );
  }
}

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
  text: {
    color: "black",
    fontFamily: theme.typography.secondary,
    fontSize: 15
  },
  subtext: {
    color: "black",
    fontFamily: theme.typography.secondary,
    fontSize: 10
  },
  copy: {
    fontFamily: theme.typography.secondary,
    textAlign: "center",
    fontSize: 32
  }
});

export default PrescriptionList;
