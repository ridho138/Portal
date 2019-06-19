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
import Card from "../components/components/Card";
import CardSection from "../components/components/CardSection";

class NotificationDetail extends Component {
  render() {
    console.log(this.props.notifResult);
    const { ID, TITLE, MESSAGE, DATE, ISREAD } = this.props.notifResult;
    return (
      <Card>
        <CardSection>
          <Text style={styles.title}>{TITLE}</Text>
        </CardSection>
        <CardSection>
          <Text style={styles.message}>{MESSAGE}</Text>
        </CardSection>
        <CardSection>
          <Text>{toDateTime(DATE)}</Text>
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  message: {
    color: "#000"
  }
});

const mapStateToProps = state => {
  return {
    notifResult: state.dataNotification.data
  };
};

export default connect(mapStateToProps)(NotificationDetail);
