import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import { ServiceLogin } from "../utils/Services";
import Loader from "../components/components/Loader";
import { getData, setData } from "../utils/Utils";
import { Constants } from "../utils/Constants";
import AsyncStorage from "@react-native-community/async-storage";
import firebase from "react-native-firebase";

// create a component
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      password: "",
      registrationId: "",
      loading: false,
      dataUser: null
    };
  }

  async componentDidMount() {
    this.checkPermission();
    console.log("cek -> componentDidMount");
  }


  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    console.log("cek -> checkPermission 1");
    if (enabled) {
      console.log("cek -> checkPermission 2");
      this.getToken();
      
    } else {
      console.log("cek -> checkPermission 3");
      this.requestPermission();
      
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    console.log("cek -> getToken 1");
    if (!fcmToken) {
      console.log("cek -> getToken 2");
      fcmToken = await firebase.iid().getToken();
      this.setState({ registrationId: fcmToken });
      console.log("cek -> getToken 3");
      if (fcmToken) {
        // user has a device token
        console.log("cek -> getToken 4");
        await AsyncStorage.setItem("fcmToken", fcmToken);
        // this.setState({ registrationId: fcmToken });
        console.log("No Token");
        console.log(fcmToken);
      }
    }
  }

  //2
  async requestPermission() {
    try {
      console.log("cek -> getToken 5");
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      console.log("cek -> getToken 6");
      // User has rejected permissions
      console.log("permission rejected");
    }
  }

  onButtonPress = async () => {
    console.log("No Teken");
    console.log(this.state.registrationId);
    this.setState({
      loading: true
    });

    const dataUser = {
      uid: this.state.uid,
      password: this.state.password,
      registrationId: this.state.registrationId
    };

    const login = await ServiceLogin(dataUser);
    // setData(Constants.KEY_USER_ID, dataUser.uid);
    // setData(Constants.KEY_PASSWORD, dataUser.password);
    //alert(login)
    this.setState({
      loading: false
    });
    if (login === "SUCCESS") {
      this.props.navigation.navigate("Home");
    } else {
      Alert.alert("Error",login)
    }
  };

  render() {
    
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Loader loading={this.state.loading} />

        <View style={styles.loginContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("../components/images/logo-dark-bg.png")}
          />
        </View>
        <View style={styles.formContainer}>
          <StatusBar barStyle="light-content" />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCorrect={false}
            keyboardType="numeric"
            returnKeyType="next"
            placeholder="NIK"
            placeholderTextColor="rgba(225,225,225,0.7)"
            onChangeText={value => this.setState({ uid: value })}
          />

          <TextInput
            style={styles.input}
            returnKeyType="go"
            ref={input => (this.passwordInput = input)}
            placeholder="Password"
            placeholderTextColor="rgba(225,225,225,0.7)"
            secureTextEntry
            onChangeText={value => this.setState({ password: value })}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onButtonPress}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#192C4D"
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
  title: {
    color: "#FFF",
    marginTop: 120,
    width: 180,
    textAlign: "center",
    opacity: 0.9
  },
  formContainer: {
    flex: 1,
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
    color: "#fff"
  },
  buttonContainer: {
    backgroundColor: "#997A2D",
    paddingVertical: 15
  },
  buttonText: {
    color: "#192C4D",
    textAlign: "center",
    fontWeight: "700"
  }
});

//make this component available to the app
export default Login;
