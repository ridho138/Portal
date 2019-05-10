import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from "react-native";
import { serviceGetNotificationsList } from "../utils/Services";
import Loader from "../components/components/Loader";
import { toDateTime } from "../utils/Utils";
import { connect } from "react-redux";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DataNotifications: null,
      loading: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getNotificationList();
  }

  getNotificationList = async () => {
    // this.setState({
    //   loading: true
    // });
    const NotificationList = await serviceGetNotificationsList(this.props.dataLogin);
    if (NotificationList !== "error") {
      this.setState({ DataNotifications: NotificationList });
    }
    this.setState({
      // loading: false,
      refreshing: false
    });
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getNotificationList();
  }

  onButtonPress = item => {
    alert(item.TITLE);
  };

  render() {
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
          renderItem={({ item }) => (
            <View style={styles.flatlistRow}>
              <Text style={styles.title}>{item.TITLE} </Text>
              <Text style={styles.description}>{item.MESSAGE}</Text>
              <Text style={styles.date}>{toDateTime(item.DATE)}</Text>
            </View>
          )}
          keyExtractor={item => item.ID.toString()}
        />
      </ScrollView>
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
    color: "#06397B",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: 16
  },
  description: {
    color: "#06397B",
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


const mapStateToProps = state => {
  //console.log(state.dataLogin);
  return {
    dataLogin: state.dataLogin.dataLogin
  };
};

export default connect(mapStateToProps) (Notification);
