import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import { Constants } from "../utils/Constants";
import { clearData, getData } from "../utils/Utils";
import Loader from "../components/components/Loader";
import AsyncStorage from "@react-native-community/async-storage";
import Card from "../components/components/Card";
import CardSection from "../components/components/CardSection";
import Button from "../components/components/Button";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataUser: {
        FULLNAME: "-",
        EMAIL: "-",
        DEPARTMENT: "-",
        POSITION: "-"
      }
    };
  }

  async componentWillMount() {
    const user = await getData(Constants.KEY_DATA_USER);
    this.setState({ dataUser: user });
    // console.log(this.state.dataUser.FULLNAME);
    // console.log(this.state.dataUser.EMAIL);
  }

  onButtonPress = async () => {
    this.setState({
      loading: true
    });

    await clearData(Constants.KEY_DATA_USER);
    await clearData("fcmToken");

    this.setState({
      loading: false
    });

    this.props.navigation.navigate("Login");
  };

  renderDataProfile = async () => {
    const user = await getData(Constants.KEY_DATA_USER);
    return user;
  };

  render() {
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
              <Text style={styles.name}>{this.state.dataUser.FULLNAME}</Text>
              <Text style={styles.userInfo}>{this.state.dataUser.EMAIL}</Text>
              <Text style={styles.userInfo}>
                {this.state.dataUser.DEPARTMENT} /{" "}
                {this.state.dataUser.POSITION}
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
    borderColor: "#192C4D"
  },
  name: {
    fontSize: 18,
    color: "#192C4D",
    fontWeight: "600"
  },
  userInfo: {
    fontSize: 12,
    color: "#192C4D"
  }
});

export default Profile;
