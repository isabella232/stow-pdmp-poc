import React from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

const Register = ({}) => (
	<View>
		<Text>I am a . . .</Text>
		<Button 
			title='Patient'
			onPress={() => {}}
		/>
		<Button 
			title='Doctor'
			onPress={() => {}}
		/>
		<Button 
			title='Pharmacy'
			onPress={() => {}}
		/>
	</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});


export default Register;