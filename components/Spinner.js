import React, { Component } from 'react';

import {
	StyleSheet, 
	Image, 
	Animated, 
	Easing, 
} from 'react-native';

class Spinner extends Component {
	constructor() {
		super();
		const spinValue = new Animated.Value(0);

		Animated.timing(
		    spinValue,
		  {
		    toValue: 3,
		    duration: 6000,
		    easing: Easing.linear
		  }
		).start();

		this.spin = spinValue.interpolate({
		  inputRange: [0, 1],
		  outputRange: ['0deg', '360deg']
		});
	}

	render() {
		return (
			<Animated.Image 
				style={{
				  	height: 200,
				  	width: 200,
				  	transform: [{rotate: this.spin}]
				  }} 
				source={require('./../assets/images/logo-filled.png')}
			/>
		);
	}
}

export default Spinner;



