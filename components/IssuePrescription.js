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
import Button from './Button';
import { Jiro } from 'react-native-textinput-effects';


class IssuePrescription extends Component {
  state = {
    dosage: '',
    substance: '',
    frequency: '',
    timeframe: '',
    timesToRefill: ''
  };

  onChange = prop => text => this.setState({
    [prop]: text
  });

  prescribe = () => this.props.navigation.navigate('ShareRecord', {
    prescription: this.state
  });

  render() {
    return (
      <Grid style={styles.container}>
        <Row style={styles.row}>
          <Text style={styles.copy}>Issue Prescription</Text>
        </Row>
        <Row style={styles.row}>
          <Jiro
            label='dosage'
            style={styles.input}
            borderColor={theme.palette.secondary.main}
            labelStyle={styles.label}
            inputStyle={styles.label}
            onChangeText={this.onChange('dosage')}
          />
        </Row>
        <Row style={styles.row}>
          <Jiro
            label='substance'
            style={styles.input}
            borderColor={theme.palette.secondary.main}
            labelStyle={styles.label}
            inputStyle={styles.label}
            onChangeText={this.onChange('substance')}
          />
        </Row>
        <Row style={styles.row}>
          <Jiro
            label='frequency'
            style={styles.input}
            borderColor={theme.palette.secondary.main}
            labelStyle={styles.label}
            inputStyle={styles.label}
            onChangeText={this.onChange('frequency')}
          />
        </Row>
        <Row style={styles.row}>
          <Jiro
            label='timeframe'
            style={styles.input}
            borderColor={theme.palette.secondary.main}
            labelStyle={styles.label}
            inputStyle={styles.label}
            onChangeText={this.onChange('timeframe')}
          />
        </Row>
        <Row style={styles.row}>
          <Jiro
            label='times to refill'
            style={styles.input}
            borderColor={theme.palette.secondary.main}
            labelStyle={styles.label}
            inputStyle={styles.label}
            onChangeText={this.onChange('timesToRefill')}
          />
        </Row>
        <Row style={styles.row}>
          <Button
            onPress={this.prescribe}
            title="Prescribe"
          />
        </Row>
      </Grid>
    );
  }
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

export default IssuePrescription;
