import React from 'react';
import { Button, View, Text, AsyncStorage } from 'react-native';
import Register from './Register';
import Home from './Home'

class AuthContainer extends React.Component {

  constructor(props) {
    super();
    this.state = {
      loading: true,
      key: ''
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('@Stow:ethereumPrivateKey')
    .then((key) => {
      this.setState({
        key,
        loading: false
      });
    });
  }  

  render() {
    const { navigation } = this.props;

    if (this.state.loading) {
      return <Text>Loading...</Text>;
    }

    return this.state.key ? 
      <Home navigation={navigation} /> : 
      <Register navigation={navigation}/>;
  }
}

export default AuthContainer;