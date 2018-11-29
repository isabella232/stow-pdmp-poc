import React from 'react';
import { Button, View, Text, AsyncStorage } from 'react-native';
import Register from './Register';

class Home extends React.Component {

  constructor(props) {
    super();
    this.state = {
      loading: true,
      key: ''
    };
  }

  loadKey() {
    return AsyncStorage.getItem('key');
  }

  componentDidMount() {
    this.loadKey()
    .then((key) => {
      this.setState({
        key,
        loading: 'false'
      });
    });
  }  

  render() {
    if (this.state.loading === 'true') {
      return <Text>Loading...</Text>;
    }
    return this.state.key ? ( <Text> Got some data! </Text> ) : <Register/>;
  }
}

export default Home;