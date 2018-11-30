import React from 'react';
import { Button, View, Text, AsyncStorage } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; 
import AuthContainer from './components/AuthContainer';
import GeneratingAccount from './components/GeneratingAccount';
import Register from './components/Register';
import Home from './components/Home';
import IssuePrescription from './components/IssuePrescription';
import ShareRecord from './components/ShareRecord';
import RecordProcessing from './components/RecordProcessing';
import PrescriptionList from './components/PrescriptionList';
import Prescription from './components/Prescription';

const RootStack = createStackNavigator(
  {
    AuthContainer: {
      screen: AuthContainer,
    },
    GeneratingAccount: {
      screen: GeneratingAccount
    },
    Register: {
      screen: Register
    },
    Home: {
      screen: Home
    },
    IssuePrescription: {
      screen: IssuePrescription
    },
    ShareRecord: {
      screen: ShareRecord
    },
    RecordProcessing: {
      screen: RecordProcessing
    },    
    Prescription: {
      screen: Prescription
    }
  },
  {
    initialRouteName: 'AuthContainer',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

