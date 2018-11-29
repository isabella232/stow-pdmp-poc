import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Button from './Button';
import theme from '@stowprotocol/brand/theme';
import { Col, Row, Grid } from "react-native-easy-grid";

const goToNext = navigation => () => navigation.navigate('GeneratingAccount');

const Register = ({ navigation }) => (
	<Grid style={styles.root}>
		<Row style={styles.row}>
			<Text style={styles.copy}>
				Welcome to the MetroHeath Prescription Drug Management System powered by blockchain technology!
				To get started, please choose a role below.
			</Text>
		</Row>
		<Row style={styles.heroRow}>
			<Text style={styles.heroText}>
				I am a . . .
			</Text>
		</Row>
		<Row style={styles.row}>
			<Button
			    title='Patient'
			    onPress={goToNext(navigation)}/>
			<Button
			    title='Doctor'
			    onPress={goToNext(navigation)}/>
			<Button
			    title='Pharmacy'
			    onPress={goToNext(navigation)}/>
		</Row>
		<Row></Row>
	</Grid>
);

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: 20,
    paddingTop: 80,
  },
  copy: {
  	fontFamily: theme.typography.primary,
  	fontSize: 20
  },
  heroText: {
  	fontFamily: theme.typography.secondary,
  	fontSize: 20,
  	textAlign: 'center'
  },
  heroRow: {
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center',
  },
   row: {
  	flex: 1,
  	alignItems: 'center',
  	flexDirection: 'column',
  	justifyContent: 'space-between',
  },
});


export default Register;