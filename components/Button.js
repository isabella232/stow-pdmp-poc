import React, { Component } from 'react';
import Button from 'react-native-button';
import theme from '@stowprotocol/brand/theme';
import { StyleSheet, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

class AppButton extends Component {
	render() {
		const { onPress, title } = this.props;
		return (
			<Button
		        style={styles.button}
		        onPress={onPress}>
				{title}
			</Button>
		);
	}
}

const styles = StyleSheet.create({
  button: {
  	color: 'white',
  	backgroundColor: theme.palette.secondary.main,
  	fontFamily: theme.typography.secondary,
  	fontSize: 20,
  	paddingTop: 12,
  	paddingBottom: 12,
  	width: width - 60,
  },

});

export default AppButton;