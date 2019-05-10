import React, { Component } from "react";
import { View, Image, StyleSheet, KeyboardAvoidingView } from "react-native";
import { getData, setData } from "../utils/Utils";
import { Constants } from "../utils/Constants";

// create a component
class SplashScreen extends Component {
  
  async componentDidMount() {
    const cekUser = await getData(Constants.KEY_DATA_USER);
    console.log("Halo test")
    console.log(cekUser)
    setTimeout(() => {
      if (cekUser) {
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
  }
});

//make this component available to the app
export default SplashScreen;
