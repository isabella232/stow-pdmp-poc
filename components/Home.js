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

  componentDidMount() {
    AsyncStorage.getItem('key')
    .then((key) => {
      this.setState({
        key,
        loading: false
      });
    });
  }  

  render() {
    console.log(this.state.loading)
    if (this.state.loading) {
      return <Text>Loading...</Text>;
    }
    console.log(this.state.key)
    return this.state.key ? ( <Text> Got some data! </Text> ) : <Register/>;
  }
}

export default Home;