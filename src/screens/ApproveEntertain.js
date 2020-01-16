import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  TextInput
} from "react-native";
import { toDateTime } from "../utils/Utils";
import Card from "../components/components/Card";
import CardSection from "../components/components/CardSection";
import { connect } from "react-redux";
import Button from "../components/components/Button";
import { serviceUpdateApproval } from "../utils/Services";
import Loader from "../components/components/Loader";
import NumberFormat from "react-number-format";
import { ConfirmDialog } from "react-native-simple-dialogs";

class ApprovalEntertain extends Component {
  constructor(props) {
    super(props);
    //set value in state for initial date
    this.state = {
      loading: false,
      dialogVisible: false,
      voidReason: ""
    };
  }
  onButtonPress = (status) => {
    Alert.alert(
      "Confirmation",
      `${status} this request?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => this.onConfirm(status)
        }
      ],
      { cancelable: false }
    );
  };

  onConfirm = async (status) => {
    const { id } = this.props.ApproveResult;
    const { voidReason } = this.state;
    this.setState({
      loading: true,
      dialogVisible: false
    });

    const update = await serviceUpdateApproval(
      id,
      "MANAGER",
      status,
      voidReason,
      "Form Entertain"
    );
    this.setState({
      loading: false
    });
    if (update.includes("SUCCESS")) {
      this.props.navigation.navigate("Home");
    } else {
      Alert.alert("Error!", update);
    }
  };

  setModalVisible = visible => {
    this.setState({ dialogVisible: visible });
  };

  render() {
    console.log(this.props.notifResult);
    const {
      id,
      request_date,
      request_by,
      remarks,
      amount
    } = this.props.ApproveResult;
    return (
      <ScrollView style={styles.container}>
        <Loader loading={this.state.loading} />
        <ConfirmDialog
          title="Void this request?"
          visible={this.state.dialogVisible}
          animationType="fade"
          onTouchOutside={() => this.setState({ dialogVisible: true })}
          positiveButton={{
            title: "OK",
            onPress: () => this.onConfirm("VOID")
          }}
          negativeButton={{
            title: "Cancel",
            onPress: () => this.setState({ dialogVisible: false })
          }}
        >
          <View>
            <TextInput
              style={{ borderBottomColor: "grey", borderBottomWidth: 1 }}
              placeholder="Reason"
              onChangeText={value => {
                this.setState({ voidReason: value });
              }}
            />
          </View>
        </ConfirmDialog>
        <Card>
          <CardSection>
            <View style={styles.view01}>
              <Text style={styles.message}>Ticket No. {id}</Text>
              <Text style={styles.message}>Request By {request_by}</Text>
            </View>
          </CardSection>
          <CardSection>
            <View style={styles.view01}>
              <Text style={styles.message}>{remarks}</Text>
              <Text style={styles.message}>Amount: {amount}</Text>
              {/* <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /> */}
            </View>
          </CardSection>
          <CardSection>
            <Text>{toDateTime(request_date)}</Text>
          </CardSection>
          <CardSection>
            <Button onPress={() => this.onButtonPress("APPROVE")}>
              APPROVE
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={() => this.setModalVisible(true)}>VOID</Button>
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

export default connect(mapStateToProps)(ApprovalEntertain);
