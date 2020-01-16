import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView, Alert } from "react-native";
import { toDateTime } from "../utils/Utils";
import Card from "../components/components/Card";
import CardSection from "../components/components/CardSection";
import { connect } from "react-redux";
import Button from "../components/components/Button";
import { serviceUpdateApproval } from "../utils/Services";
import Loader from "../components/components/Loader";

class ApprovalDetail extends Component {
  constructor(props) {
    super(props);
    //set value in state for initial date
    this.state = {
      loading: false
    };
  }
  onButtonPress = (id, status_approval, status) => {


    Alert.alert(
      'CONFIRMATION',
      `${status} THIS REQUEST?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.onConfirm(id, status_approval, status)},
      ],
      {cancelable: false},
    );

    
  };

  onConfirm = async (id, status_approval, status) => {
    this.setState({
      loading: true
    });
    let approve_type;
    if (status_approval === "PENDING MANAGER") {
      approve_type = "MANAGER";
    } else if (status_approval === "PENDING PIC SUPPORT MANAGER") {
      approve_type = "TAKEOVER MANAGER";
    }
    const update = await serviceUpdateApproval(id, approve_type, status, "", "Form Request");
    this.setState({
      loading: false
    });
    if (update.includes("SUCCESS")) {
      this.props.navigation.navigate("Home");
    } else {
      Alert.alert("Error!", update);
    }
  }

  render() {
    console.log(this.props.notifResult);
    const {
      id,
      request_date,
      request_by,
      remarks,
      takeover,
      category_desc,
      status_approval
    } = this.props.ApproveResult;
    return (
      <ScrollView style={styles.container}>
        <Loader loading={this.state.loading} />
        <Card>
          <CardSection>
            <Text style={styles.title}>{category_desc}</Text>
          </CardSection>
          <CardSection>
            <View style={styles.view01}>
              <Text style={styles.message}>Ticket No. {id}</Text>
              <Text style={styles.message}>Status {status_approval}</Text>
              <Text style={styles.message}>Request By {request_by}</Text>
              <Text style={styles.message}>Takeover by {takeover}</Text>
            </View>
          </CardSection>
          <CardSection>
            <Text style={styles.message}>{remarks}</Text>
          </CardSection>
          <CardSection>
            <Text>{toDateTime(request_date)}</Text>
          </CardSection>
          <CardSection>
            <Button
              onPress={() => this.onButtonPress(id, status_approval, "APPROVE")}
            >
              APPROVE
            </Button>
          </CardSection>
          <CardSection>
            <Button
              onPress={() => this.onButtonPress(id, status_approval, "VOID")}
            >
              VOID
            </Button>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000"
  },
  message: {
    color: "#000"
  }
});

const mapStateToProps = state => {
  return {
    ApproveResult: state.dataApproval.data
  };
};

export default connect(mapStateToProps)(ApprovalDetail);
