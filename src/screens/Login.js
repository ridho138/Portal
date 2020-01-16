import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions
} from "react-native";
import TextInput from "react-native-textinput-with-icons";
import { ServiceLogin } from "../utils/Services";
import Loader from "../components/components/Loader";
import { getData, setData } from "../utils/Utils";
import { Constants } from "../utils/Constants";
import AsyncStorage from "@react-native-community/async-storage";
import firebase from "react-native-firebase";
import { CheckBox } from "react-native-elements";

// create a component
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      password: "",
      registrationId: "",
      loading: false,
      dataUser: null,
      checked: false,
      viewPassword: false
    };
  }

  async componentDidMount() {
    this.checkPermission();
    console.log("cek -> componentDidMount");

    const dataLogin = await getData(Constants.KEY_DATA_USER);
    console.log("dataLogin");
    console.log(dataLogin);
    if (dataLogin) {
      if (dataLogin.rememberMe) {
        this.setState({
          uid: dataLogin.uid,
          password: dataLogin.password,
          checked: dataLogin.rememberMe
        });
      }
    }
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
    await AsyncStorage.removeItem("fcmToken");
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    console.log("cek -> getToken 1");
    if (!fcmToken) {
      console.log("cek -> getToken 2");
      fcmToken = await firebase.iid().getToken();
      //this.setState({ registrationId: fcmToken });
      console.log("cek -> getToken 3");
      if (fcmToken) {
        // user has a device token
        console.log("cek -> getToken 4");
        await AsyncStorage.setItem("fcmToken", fcmToken);
        this.setState({ registrationId: fcmToken });
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
    this.setState({
      loading: true
    });

    const { uid, password, registrationId, checked } = this.state;

    if (uid !== "" && password !== "") {
      const dataUser = {
        uid: uid,
        password: password,
        registrationId: registrationId,
        rememberMe: checked
      };
      //console.log(dataUser);
      const login = await ServiceLogin(dataUser, "1");
      this.setState({
        loading: false
      });
      console.log("login.profile")
      console.log(login.profile)
      if (login.status === "SUCCESS") {
        this.props.navigation.navigate("Home");
      } else {
        Alert.alert("Error", login.status);
      }
    } else {
      this.setState({
        loading: false
      });
      Alert.alert("Error", "NIK and/or Password cannot be empty.");
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
            source={require("../components/images/logo-white.png")}
          />
        </View>
        <View style={styles.formContainer}>
          <StatusBar barStyle="light-content" />

          <TextInput
            style={styles.input}
            autoCorrect={false}
            keyboardType="numeric"
            label="NIK"
            labelColor="#fff"
            color="#fff"
            activeColor="#fff"
            underlineColor="#fff"
            leftIcon="user"
            leftIconType="awesome"
            leftIconSize={30}
            leftIconColor="#fff"
            onChangeText={value => this.setState({ uid: value })}
            value={this.state.uid}
          />

          <TextInput
            style={styles.input}
            label="Password"
            labelColor="#fff"
            color="#fff"
            activeColor="#fff"
            underlineColor="#fff"
            leftIcon="lock"
            leftIconType="awesome"
            leftIconSize={30}
            leftIconColor="#fff"
            rightIcon={this.state.viewPassword ? "eye" : "eye-slash"}
            rightIconType="awesome"
            rightIconSize={20}
            rightIconColor="#ccc"
            onPressRightIcon={() => {
              this.state.viewPassword
                ? this.setState({ viewPassword: false })
                : this.setState({ viewPassword: true });
            }}
            secureTextEntry={!this.state.viewPassword}
            onChangeText={value => this.setState({ password: value })}
            value={this.state.password}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              width: Dimensions.get("window").width - 50
            }}
          >
            <CheckBox
              title="Remember me"
              checked={this.state.checked}
              containerStyle={{ backgroundColor: undefined, borderWidth: 0 }}
              textStyle={{ color: "#fff" }}
              checkedColor="#fff"
              uncheckedColor="#fff"
              onPress={() => this.setState({ checked: !this.state.checked })}
            />
          </View>

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
    backgroundColor: "#06397B"
  },
  loginContainer: {
    alignItems: "center",
    // flexGrow: 1,
    flex: 1,
    justifyContent: "flex-end"
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
    flex: 2,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  input: {
    height: 60,
    width: Dimensions.get("window").width - 50
    // backgroundColor: "#fff",
    // marginBottom: 30,
    // padding: 10,
    // color: "#000",
    // borderRadius: 30
  },
  buttonContainer: {
    backgroundColor: "#997A2D",
    borderRadius: 30,
    paddingVertical: 8,
    width: 150,
    elevation: 5
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
});

//make this component available to the app
export default Login;
