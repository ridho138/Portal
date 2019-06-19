import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from "react-native";
import { Badge } from "react-native-elements";
import {
  serviceGetNotificationsList,
  serviceUpdateNotification
} from "../utils/Services";
import Loader from "../components/components/Loader";
import Card from "../components/components/Card";
import CardSection from "../components/components/CardSection";
import { toDateTime } from "../utils/Utils";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import { fetchNotificationHeader, fetchNotification } from "../actions/index";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DataNotifications: null,
      loading: false,
      refreshing: false
    };
  }

  componentWillMount() {
    this.getNotificationList();
  }

  getNotificationList = async () => {
    //this.props.dispatch(fetchNotificationHeader())
    
    // this.setState({
    //   loading: true
    // });
    const NotificationList = await serviceGetNotificationsList();
    if (NotificationList !== "error") {
      // await AsyncStorage.setItem("KEY_NOTIF", "8")
      this.setState({ DataNotifications: NotificationList });
    }
    this.setState({
      // loading: false,
      refreshing: false
    });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getNotificationList();
  };

  onButtonPress = async item => {
    //alert(item.TITLE);
    this.setState({
      loading: true
    })

    if (item.ISREAD === "0") {
      const updateNotif = await serviceUpdateNotification(item.ID);
      await this.getNotificationList();
      if (!updateNotif.includes("SUCCESS")) {
        Alert.alert(updateNotif);
      }
    }

    this.props.dispatch(fetchNotification(item));

    this.setState({
      loading: false
    })

    this.props.navigation.navigate("News Detail");
  };

  renderNotification = item => {
    const { ISREAD, TITLE, MESSAGE, DATE } = item;

    return (
      <TouchableOpacity
        style={styles.flatlistRow}
        onPress={() => this.onButtonPress(item)}
      >
        <View
          style={
            ISREAD == "0" ? styles.leftContentNRead : styles.leftContentRead
          }
        >
          {/* <Badge status="primary" /> */}
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.title}>{TITLE} </Text>
          <Text style={styles.date}>{toDateTime(DATE)}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  render() {
    console.log("this.state.DataNotifications")
    console.log(this.state.DataNotifications)
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <Loader loading={this.state.loading} />
        <FlatList
          data={this.state.DataNotifications}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => this.renderNotification(item)}
          keyExtractor={item => item.ID.toString()}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  flatlistRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 10
  },
  title: {
    color: "#000",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 14
  },
  description: {
    color: "#000",
    justifyContent: "center",
    fontSize: 15
  },
  date: {
    marginTop: 5,
    color: "grey",
    justifyContent: "center",
    fontSize: 13
  },
  leftContentRead: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#06397B",
    width: 3
  },
  leftContentNRead: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: 3
  },
  rightContent: {
    flexDirection: "column",
    paddingLeft: 5
  }
});

// const mapStateToProps = state => {
//   console.log("state")
//   console.log(state)
//   return {
//     notifHeaderResult: state.dataNotificationHeader.data
//   };
// };

export default connect()(Notification);
