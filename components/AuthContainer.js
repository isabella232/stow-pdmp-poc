import React from "react";
import { Button, View, Text, AsyncStorage } from "react-native";
import Register from "./Register";
import IssuePrescription from "./IssuePrescription";
import PrescriptionList from "./PrescriptionList";
import Home from "./Home";

class AuthContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      credentials: null
    };
  }

  componentDidMount() {
    AsyncStorage.removeItem('@Stow:credentials');
    AsyncStorage.getItem("@Stow:credentials").then(credentials => {
      credentials = JSON.parse(credentials)
      this.setState({
        credentials,
        loading: false
      });
    });
  }

  render() {
    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    
    if (this.state.loading) {
      return <Text>Loading...</Text>;
    }

    const foundCredentials = params && params.credentials ? params.credentials : this.state.credentials;



    let RoleComponent =
      foundCredentials && foundCredentials.role === "doctor"
        ? IssuePrescription
        : PrescriptionList;

    return foundCredentials ? (
      <RoleComponent
        navigation={navigation}
        credentials={foundCredentials}
      />
    ) : (
      <Register navigation={navigation} />
    );
  }
}

export default AuthContainer;
