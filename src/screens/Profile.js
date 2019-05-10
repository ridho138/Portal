import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { Constants } from "../utils/Constants";
import { clearData, getData } from "../utils/Utils";
import Loader from "../components/components/Loader";
import AsyncStorage from "@react-native-community/async-storage";
import Card from "../components/components/Card";
import CardSection from "../components/components/CardSection";
import Button from "../components/components/Button";
import { connect } from "react-redux";
import { fetchDataLogin } from "../actions/index";
import { ServiceLogin } from "../utils/Services";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  onButtonPress = async () => {
    this.setState({
      loading: true
    });

    await clearData(Constants.KEY_DATA_USER);
    await clearData("fcmToken");

    const { uid, password, rememberMe } = this.props.dataLogin;

    let dataUser = {
      uid: uid,
      password: password,
      registrationId: "",
      rememberMe: true
    };
    const logout = await ServiceLogin(dataUser, "0");

    if (!rememberMe) {
      dataUser = {
        uid: "",
        password: "",
        registrationId: "",
        rememberMe: false
      };
    }

    if (logout.status === "SUCCESS") {
      this.setState({
        loading: false
      });

      this.props.dispatch(fetchDataLogin(dataUser));

      this.props.navigation.navigate("Login");
    } else {
      Alert.alert("Error", login);
    }
  };

  renderDataProfile = async () => {
    const user = await getData(Constants.KEY_DATA_USER);
    return user;
  };

  render() {
    const { FULLNAME, EMAIL, DEPARTMENT, POSITION } = this.props.dataProfile
    return (
      <Card>
        <CardSection>
          <View style={styles.container}>
            <View style={styles.leftContent}>
              <Image
                style={styles.avatar}
                source={{
                  uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                }}
              />
            </View>
            <View style={styles.rightContent}>
              <Text style={styles.name}>{FULLNAME}</Text>
              <Text style={styles.userInfo}>{EMAIL}</Text>
              <Text style={styles.userInfo}>
                {DEPARTMENT} /{" "}
                {POSITION}
              </Text>
            </View>
          </View>
        </CardSection>
        <CardSection>
          <Button onPress={() => this.onButtonPress()}>LOG OUT</Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  content: {
    //width: Dimensions.get("window").width / 2 - 10,
    padding: 5
  },
  leftContent: {
    padding: 5,
    width: "30%"
  },
  rightContent: {
    padding: 10,
    width: "70%"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: "#06397B"
  },
  name: {
    fontSize: 18,
    color: "#06397B",
    fontWeight: "600"
  },
  userInfo: {
    fontSize: 12,
    color: "#06397B"
  }
});

const mapStateToProps = state => {
  //console.log(state.dataLogin);
  return {
    dataLogin: state.dataLogin.dataLogin,
    dataProfile: state.dataProfile.dataProfile
  };
};

export default connect(mapStateToProps)(Profile);
