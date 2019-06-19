import React, { Component } from "react";
import { View, Image, StyleSheet, KeyboardAvoidingView, Text } from "react-native";
import { getData, setData } from "../utils/Utils";
import { Constants } from "../utils/Constants";

// create a component
class SplashScreen extends Component {
  
  async componentDidMount() {
    const DataLogin = await getData(Constants.KEY_DATA_USER);
    console.log("Halo test")
    console.log(DataLogin)
    setTimeout(() => {
      if ( DataLogin && DataLogin.isLogin === "1") {
        this.props.navigation.navigate("Home");
      } else {
        this.props.navigation.navigate("Login");
      }
    }, 2500);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loginContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("../components/images/logo-white.png")}
          />
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#06397B"
  },
  loginContainer: {
    alignItems: "center",
    // flexGrow: 1,
    flex: 1,
    justifyContent: "center"
  },
  logo: {
    position: "absolute",
    width: 300,
    height: 100
  },
  footerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20
  },
  footerText :{
    color: "white"
  }
});

//make this component available to the app
export default SplashScreen;
