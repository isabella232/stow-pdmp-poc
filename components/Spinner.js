import React, { Component } from 'react';

import {
	StyleSheet, 
	Image, 
	Animated, 
	Easing, 
} from 'react-native';

class Spinner extends Component {
	spin = '0deg';

	componentDidMount() {
		this.startAnimation();
	}

	startAnimation = () => {
		const { shouldSpin } = this.props;

		const spinValue = new Animated.Value(0);

		Animated.timing(
		    spinValue,
		  {
		    toValue: 3,
		    duration: 6000,
		    easing: Easing.linear
		  }
		).start((o) => {
			if (shouldSpin) {
				this.startAnimation();
			}
		});

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



