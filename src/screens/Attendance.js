import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";
import Card from "../components/components/Card";
import CardSection from "../components/components/CardSection";
import DatePicker from "react-native-datepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/components/Button";
import AttendanceDetail from "./AttendanceDetail";
import Loader from "../components/components/Loader";
import { serviceGetAttendaceList } from "../utils/Services";

class Attendance extends Component {
  constructor(props) {
    super(props);
    //set value in state for initial date
    this.state = {
      dateFrom: "",
      dateTo: "",
      loading: false,
      dataAbsen: null
    };
  }

  onButtonPress = async () => {
    this.setState({
      loading: true
    });

    const { dateFrom, dateTo } = this.state;
    if (dateFrom !== "" || dateTo !== "") {
      const getDataAbsen = await serviceGetAttendaceList(dateFrom, dateTo);
      // alert(getDataAbsen)
      if (getDataAbsen !== "error") {
        this.setState({
          dataAbsen: getDataAbsen
        });
      }
    } else {
      alert("Date Tidak Boleh Kosong");
    }

    this.setState({
      loading: false
    });
  };

  renderDataAbsen = () => {
    // return <AttendanceDetail key={data.tanggal} dataAbsen={data} />;
    if (this.state.dataAbsen !== null) {
      return (
        <Card>
          <CardSection>
            <FlatList
              //style={{ paddingBottom: 20 }}
              data={this.state.dataAbsen}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <AttendanceDetail key={item.tanggal} dataAbsen={item} />
              )}
              keyExtractor={item => item.tanggal}
            />
          </CardSection>
        </Card>
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Loader loading={this.state.loading} />
        <View style={{ flex: 1 }}>
          <Card>
            <CardSection>
              <View style={styles.datePickerContainer}>
                <View style={styles.datePickerContent}>
                  <DatePicker
                    customStyles={{
                      dateInput:{
                        borderRadius:5,
                        borderColor:'#192C4D',
                      }
                    }}
                    date={this.state.dateFrom} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="Date From"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    onDateChange={date => {
                      this.setState({ dateFrom: date });
                    }}
                  />
                </View>
                <View style={styles.datePickerContent}>
                  <DatePicker
                    customStyles={{
                      dateInput:{
                        borderRadius:5,
                        borderColor:'#192C4D',
                      }
                    }}
                    date={this.state.dateTo} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="Date To"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    onDateChange={date => {
                      this.setState({ dateTo: date });
                    }}
                  />
                </View>
              </View>
            </CardSection>
            <CardSection>
              <Button onPress={() => this.onButtonPress()}>SEARCH</Button>
            </CardSection>
          </Card>
        </View>
        <View style={{ flex: 4 }}>{this.renderDataAbsen()}</View>

        {/* <ScrollView style={{ paddingBottom: 15 }}>
          {this.renderDataAbsen()}
        </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    //alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 25,
    flexDirection: "row",
    flexWrap: "wrap",
    //padding: 5,
    justifyContent: "center"
  },
  datePickerContainer: {
    flex: 1,
    flexDirection: "row",
    // flexWrap: "wrap",
    alignItems: "center"
    // justifyContent: "center"
  },
  datePickerContent: {
    flex: 1,
    alignItems: "center"
  },
  buttonContainer: {
    backgroundColor: "#997A2D",
    paddingVertical: 15
  },
  buttonText: {
    color: "#192C4D",
    textAlign: "center",
    fontWeight: "700"
  }
});

export default Attendance;
