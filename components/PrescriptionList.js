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
import {grantPermission} from './../services/grantPermission'

class PrescriptionList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      prescriptions: []
    };
    this.prescriptionMap = this.prescriptionMap.bind(this);
    this.share = this.share.bind(this);
    this.handlePharmacy = this.handlePharmacy.bind(this);
    this.handlePatient = this.handlePatient.bind(this);
  }

  handlePharmacy() {
    let permissions;
    return fetch(
      `https://qastg.api.stow-protocol.com/users/${
        this.props.credentials.ethereumAddress
      }/permissions`
      ).then(response => {
        return response.json()
      })
      .then(allPermissions => {
        permissions = allPermissions.asViewer;
        let promises = permissions.map(permissions => {
            return fetch(
              `https://qastg.api.stow-protocol.com/records/${
                permission.dataHash
              }`
            )
            .then(response => {
              return response.json()
            });
          })
        return Promise.all(promises)
      })
      .then(viewerRecords => {
        return viewerRecords.map((viewerRecord, i) => Object.assign(viewerRecord, {dataUri: permissions[i].dataUril}))
      })
  }

  handlePatient() {
    return fetch(
      `https://qastg.api.stow-protocol.com/records?owner=${
        '0xa82ae2ac8d0c0f5399a68c44492cbc03f49a903d'
      }`
    ).then(response => response.json());
  }

  componentDidMount() {
    let roleFunction =
      this.props.credentials.role === "patient"
        ? this.handlePatient
        : this.handlePharmacy;
    roleFunction()
      .then(prescriptions => {
        // can edit this mapping once we have data to play with
        prescriptions = prescriptions.map(prescription => {
          prescription.metadata = JSON.parse(prescription.metadata);
          return prescription;
        });
        this.setState({ prescriptions });
      });
    }

  share() {}

  prescriptionMap(role) {
    return this.state.prescriptions.map(prescription => {
      return (
        <Row
          style={styles.row}
          key={prescription.dataHash}
          onPress={() =>
            this.props.navigation.navigate("Prescription", {
              prescription,
              credentials: this.props.credentials
            })
          }
        >
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
