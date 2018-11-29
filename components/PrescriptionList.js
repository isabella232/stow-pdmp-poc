import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Animated,
  Easing
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import theme from "@stowprotocol/brand/theme";
import Button from "react-native-button";

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
      `https://qastg.api.stow-protocol.com/records?owner=${"0xa82ae2ac8d0c0f5399a68c44492cbc03f49a903d"}`
    )
      .then(response => response.json())
      .then(prescriptions => {
        // can edit this mapping once we have data to play with
        prescriptions = prescriptions.map(prescription => {
          prescription.metadata = JSON.parse(prescription.metadata);
          prescription.metadata.substance = "hugs";
          prescription.metadata.date = "2014-11-03T19:38:34.203Z";
          prescription.metadata.dosage = "30mg";
          prescription.metadata.frequency = "once a day";
          prescription.metadata.duration = "for three weeks";
          prescription.metadata.refills = "1";
          return prescription;
        });
        this.setState({ prescriptions });
      });
  }

  share() {}

  prescriptionMap(role) {
    return this.state.prescriptions.map(prescription => {
      return (
        <Row style={styles.row} key={prescription.dataHash} onPress={() =>
              this.props.navigation.navigate("Prescription", { prescription })
            }>
          <Col>
            <Text style={styles.text}>{prescription.metadata.substance}</Text>
            <Text style={styles.subtext}>
              {new Date(prescription.metadata.date).toString()}
            </Text>
          </Col>
          <Col>
            {
              // share function needs to be done Fill here is for pharmacy
            }
            <Button style={styles.button} onPress={this.share}>
              {role === "patient" ? "Share" : "Fill"}
            </Button>
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
  },
  button: {
    color: "white",
    backgroundColor: theme.palette.secondary.main,
    fontFamily: theme.typography.secondary,
    fontSize: 10,
    paddingTop: 12,
    paddingBottom: 12,
    width: width - 230,
    marginLeft: 20
  }
});

export default PrescriptionList;
