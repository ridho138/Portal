import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert
} from "react-native";
import Card from "../components/components/Card";
import CardSection from "../components/components/CardSection";
import DatePicker from "react-native-datepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/components/Button";
import AttendanceDetail from "./AttendanceDetail";
import Loader from "../components/components/Loader";
import { serviceGetAttendaceList } from "../utils/Services";
import moment from "moment";

class Attendance extends Component {
  constructor(props) {
    super(props);
    //set value in state for initial date
    this.state = {
      dateFrom: moment(new Date()).format("YYYY-MM-DD"),
      dateTo: moment(new Date()).format("YYYY-MM-DD"),
      loading: false,
      dataAbsen: null,
      late: 0
    };
  }

  componentDidMount() {
    this.onButtonPress();
  }

  onButtonPress = async () => {
    this.setState({
      loading: true
    });

    const { dateFrom, dateTo } = this.state;
    let diff = moment(dateTo).diff(moment(dateFrom), "days");

    if (dateFrom !== "" && dateTo !== "") {
      if (diff < 31) {
        const getDataAbsen = await serviceGetAttendaceList(dateFrom, dateTo);
        // alert(getDataAbsen)
        if (getDataAbsen !== "error") {
          let late = 0;
          getDataAbsen.map(data => {
            if (data.istelat === "Late") {
              late += 1;
            }
          });
          this.setState({
            dataAbsen: getDataAbsen,
            late: late
          });
        }
      } else {
        Alert.alert("Info", "Maksimum periode absen adalah 31 hari");
      }
    } else {
      Alert.alert("Error", "Date Tidak Boleh Kosong");
    }

    this.setState({
      loading: false
    });
  };

  renderDataAbsen = () => {
    // return <AttendanceDetail key={data.tanggal} dataAbsen={data} />;
    if (this.state.dataAbsen !== null) {
      if (this.state.dataAbsen.length !== 0) {
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
    }
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Loader loading={this.state.loading} />
        <View style={{ flex: 2 }}>
          <Card>
            <CardSection>
              <View style={styles.datePickerContainer}>
                <View style={styles.datePickerContent}>
                  <DatePicker
                    customStyles={{
                      dateInput: {
                        borderRadius: 5,
                        borderColor: "#06397B"
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
                      dateInput: {
                        borderRadius: 5,
                        borderColor: "#06397B"
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
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Card>
            <CardSection>
              <Text style={styles.textStyle}>
                Total Late : {this.state.late}
              </Text>
            </CardSection>
          </Card>
        </View>
        <View style={{ flex: 7 }}>{this.renderDataAbsen()}</View>

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
    backgroundColor: "#fff",
    paddingVertical: 15
  },
  buttonText: {
    color: "#06397B",
    textAlign: "center",
    fontWeight: "700"
  },
  textStyle: {
    color: "#06397B",
    fontSize: 13,
    fontWeight: "300"
  }
});

export default Attendance;
