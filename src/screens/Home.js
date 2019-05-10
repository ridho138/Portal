import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Loader from "../components/components/Loader";
import firebase from "react-native-firebase";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  async componentDidMount() {
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body } = notification;
        this.showAlert(title, body);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
        const { screen } = notificationOpen.notification.data;
        this.props.navigation.navigate("News");
        //this.showAlert(title, screen);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      const { screen } = notificationOpen.notification.data;
      this.props.navigation.navigate("News");
      //this.showAlert('Test', screen);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  onMenuPress = key => {
    if (key !== "") {
      this.props.navigation.navigate(key);
    } else {
      this.showAlert("Coming Soon!", "This feature still under construction.");
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.onMenuPress("")}
          >
            <View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 15
                }}
              >
                <Icon name="line-chart" color="#06397B" size={30}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap"
                }}
              >
                <Text style={styles.textTitle}>Daily Production</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.onMenuPress("")}
          >
            <View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 15
                }}
              >
                <Icon name="bar-chart" color="#06397B" size={30}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.textTitle}>Daily Claim</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.onMenuPress("Attendance")}
          >
            <View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 15
                }}
              >
                <Icon name="calendar" color="#06397B" size={30}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.textTitle}>Attendance</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.onMenuPress("StaffContact")}
          >
            <View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 15
                }}
              >
                <Icon name="address-book" color="#06397B" size={30}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.textTitle}>Staff Contact</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.onMenuPress("")}
          >
            <View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 15
                }}
              >
                <Icon name="building" color="#06397B" size={30}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap"
                }}
              >
                <Text style={styles.textTitle}>Branch</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.onMenuPress("")}
          >
            <View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 15
                }}
              >
                <Icon name="users" color="#06397B" size={30}>
                  {/* <Text>Daily Production</Text>     */}
                </Icon>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap"
                }}
              >
                <Text style={styles.textTitle}>Claim Partner</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 10,
            //margin: 10,
            flex: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          
          <Image
            style={{ flex: 1, width: "100%", borderRadius: 25 }}
            source={require("../components/images/image-2.jpg")}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#F5FCFF",
    backgroundColor: "#ffffff",
    paddingTop: 25,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  card: {
    // shadowColor: "#06397B",
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    backgroundColor: "#ffffff",
    padding: 5,
    margin: 5,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 5,
    width: Dimensions.get("window").width / 3 - 10,
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  textTitle: {
    color: "#06397B",
    fontSize: 9
  }
});

export default Home;
