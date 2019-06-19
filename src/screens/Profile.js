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
import { clearData, getData, setData } from "../utils/Utils";
import Loader from "../components/components/Loader";
import AsyncStorage from "@react-native-community/async-storage";
import Card from "../components/components/Card";
import CardSection from "../components/components/CardSection";
import Button from "../components/components/Button";
import { ServiceLogin } from "../utils/Services";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      FULLNAME: "",
      EMAIL: "",
      DEPARTMENT: "",
      POSITION: ""
    };
  }

  componentDidMount = async () => {
    const Profile  = await getData(Constants.KEY_DATA_USER)
    const { FULLNAME, EMAIL, DEPARTMENT, POSITION } = Profile.profile
    this.setState({
      FULLNAME: FULLNAME,
      EMAIL: EMAIL,
      DEPARTMENT: DEPARTMENT,
      POSITION: POSITION
    })
    console.log("Profile")
    console.log(Profile.profile)
  }

  onButtonPress = async () => {
    this.setState({
      loading: true
    });

    // this.setState({
    //   loading: false
    // });
    // await clearData(Constants.KEY_DATA_USER);
    // await clearData("fcmToken");
    // this.props.navigation.navigate("Login");

    const { uid, password, rememberMe } = await getData(
      Constants.KEY_DATA_USER
    );

    console.log("rememberMe")
    console.log(rememberMe)
    let dataUser = {
      uid: uid,
      password: password,
      registrationId: "",
      rememberMe: rememberMe
    };
    const logout = await ServiceLogin(dataUser, "0");

    if (logout.status === "SUCCESS") {
      this.setState({
        loading: false
      });
      // await setData(Constants.KEY_DATA_LOGIN, JSON.stringify(dataUser))
      // await clearData(Constants.KEY_DATA_USER);
      await clearData("fcmToken");
      this.props.navigation.navigate("Login");
    } else {
      Alert.alert("Error", logout);
    }
  };

  // renderDataProfile = async () => {
  //   const { FULLNAME, EMAIL, DEPARTMENT, POSITION } = await getData(
  //     Constants.KEY_DATA_USER
  //   );
  //   return (
  //     <View style={styles.rightContent}>
  //       <Text style={styles.name}>{FULLNAME}</Text>
  //       <Text style={styles.userInfo}>{EMAIL}</Text>
  //       <Text style={styles.userInfo}>
  //         {DEPARTMENT} / {POSITION}
  //       </Text>
  //     </View>
  //   );
  // };

  render() {
    const { FULLNAME, EMAIL, DEPARTMENT, POSITION } = this.state

    //console.log(FULLNAME)
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
                {DEPARTMENT} / {POSITION}
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

export default Profile;
