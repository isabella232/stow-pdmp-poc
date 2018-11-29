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
      credentials: ""
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("@Stow:credentials").then(credentials => {
      this.setState({
        credentials,
        loading: false
      });
    });
  }

  render() {
    const { navigation } = this.props;

    if (this.state.loading) {
      return <Text>Loading...</Text>;
    }

    let RoleComponent =
      this.state.credentials.role === "doctor"
        ? IssuePrescription
        : PrescriptionList;

    return this.state.credentials ? (
      <RoleComponent
        navigation={navigation}
        credentials={JSON.parse(this.state.credentials)}
      />
    ) : (
      <Register navigation={navigation} />
    );
  }
}

export default AuthContainer;
