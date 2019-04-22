import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { serviceGetNotificationsList } from "../utils/Services";
import Loader from "../components/components/Loader";
import { toDateTime } from "../utils/Utils";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DataNotifications: null,
      loading: false
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true
    });
    const NotificationList = await serviceGetNotificationsList();
    if (NotificationList !== "error") {
      this.setState({ DataNotifications: NotificationList });
    }
    this.setState({
      loading: false
    });
  }

  onButtonPress = item => {
    alert(item.TITLE);
  };

  render() {
    return (
      <View>
        <Loader loading={this.state.loading} />
        <FlatList
          data={this.state.DataNotifications}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.flatlistRow}>
              <Text style={styles.title}>{item.TITLE} </Text>
              <Text style={styles.description}>{item.MESSAGE}</Text>
              <Text style={styles.date}>{toDateTime(item.DATE)}</Text>
            </View>
          )}
          keyExtractor={item => item.ID.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flatlistRow: {
    flexDirection: "column",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 10
  },
  title: {
    color: "#192C4D",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: 16
  },
  description: {
    color: "#192C4D",
    justifyContent: "center",
    fontSize: 15
  },
  date: {
    marginTop: 5,
    color: "grey",
    justifyContent: "center",
    fontSize: 13
  }
});

export default Notification;
