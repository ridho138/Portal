import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput
} from "react-native";
import Card from "../components/components/Card";
import CardSection from "../components/components/CardSection";
import DatePicker from "react-native-datepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/components/Button";
import StaffCOntactList from "./StaffCOntactList";
import Loader from "../components/components/Loader";
import { serviceGetStaffContactList } from "../utils/Services";
import { connect } from "react-redux";

class Attendance extends Component {
  constructor(props) {
    super(props);
    //set value in state for initial date
    this.state = {
      keyword: "",
      loading: false,
      dataStaffContact: null
    };
  }

  onButtonPress = async () => {
    this.setState({
      loading: true
    });

    const { keyword } = this.state;
    const getDataStaffContact = await serviceGetStaffContactList(keyword, this.props.dataLogin);
    //alert(getDataStaffContact[0].fullname);
    if (getDataStaffContact !== "error") {
      this.setState({
        dataStaffContact: getDataStaffContact
      });
    }

    this.setState({
      loading: false
    });
  };

  renderDataStaffContact = () => {
    // return <AttendanceDetail key={data.tanggal} dataAbsen={data} />;
    if (this.state.dataStaffContact !== null) {
      return (
        <FlatList
          //style={{ paddingBottom: 20 }}
          data={this.state.dataStaffContact}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card>
              <CardSection>
                <StaffCOntactList key={item.ucode} dataStaffContact={item} />
              </CardSection>
            </Card>
          )}
          keyExtractor={item => item.ucode}
        />
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Loader loading={this.state.loading} />
        {/* <View style={{ flex: 1 }}> */}
        <Card>
          <CardSection>
            <View style={styles.searchSection}>
              <Icon
                style={styles.searchIcon}
                name="search"
                size={20}
                color="#ddd"
              />
              <TextInput
                style={styles.input}
                placeholder="Keyword"
                onChangeText={value => {
                  this.setState({ keyword: value });
                }}
                underlineColorAndroid="transparent"
              />
              <Icon
                style={styles.searchIcon}
                name="arrow-right"
                size={25}
                color="#06397B"
                onPress={() => this.onButtonPress()}
              />
            </View>
          </CardSection>
        </Card>
        {/* </View> */}
        <View style={{ flex: 4 }}>{this.renderDataStaffContact()}</View>

        {/* <ScrollView style={{ paddingBottom: 15 }}>
          {this.renderDataAbsen()}
        </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  searchIcon: {
    padding: 10
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#06397B"
  }
});

const mapStateToProps = state => {
  //console.log(state.dataLogin);
  return {
    dataLogin: state.dataLogin.dataLogin
  };
};

export default connect(mapStateToProps) (Attendance);
