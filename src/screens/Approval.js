import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Image,
  RefreshControl,
  Alert
} from "react-native";
import { serviceGetApprovalList } from "../utils/Services";
import Loader from "../components/components/Loader";
import { toDateTime } from "../utils/Utils";
import { connect } from "react-redux";
import { fetchApproval } from "../actions/index";
import Card from "../components/components/Card";
import CardSection from "../components/components/CardSection";
import Icon from "react-native-vector-icons/FontAwesome";
import RadioGroup from "react-native-radio-buttons-group";

class Approval extends Component {
  constructor(props) {
    super(props);
    //set value in state for initial date
    this.state = {
      dataApproval: [],
      loading: false,
      refreshing: false,
      keyword: ""
    };
  }

  componentDidMount() {
    this.onSearchPress();
  }

  getApprovalList = async () => {
    const { keyword } = this.state;
    
    const approvalList = await serviceGetApprovalList(keyword);
    if (approvalList !== "error") {
      this.setState({ dataApproval: approvalList });
    }
    this.setState({
      loading: false,
      refreshing: false
    });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getApprovalList();
  };

  onButtonPress = item => {
    this.props.dispatch(fetchApproval(item));
    if (item.TYPE === "FORM REQUEST") {
      this.props.navigation.navigate("Approval Request");
    } else if (item.TYPE === "FORM ENTERTAIN") {
      this.props.navigation.navigate("Approval Entertain");
    }
  };


  onSearchPress = () => {
    this.setState({
      loading: true
    });
    this.getApprovalList();
  };

  render() {
    console.log("renderrrrr");
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
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
                onPress={() => this.onSearchPress()}
              />
            </View>
          </CardSection>
          
        </Card>
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
            data={this.state.dataApproval}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.container}
                onPress={() => this.onButtonPress(item)}
              >
                <View style={styles.content}>
                  {/* <Text style={styles.txtType}>{item.category_desc}</Text> */}
                  <Text style={styles.txtContent}>{item.TYPE}</Text>
                  <Text style={styles.txtContent}>Ticket No : {item.id}</Text>
                  <Text style={styles.txtContent}>
                    Request By : {item.request_by}
                  </Text>
                  <Text style={styles.txtDate}>
                    {toDateTime(item.request_date)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottomWidth: 1,
    borderColor: "#ddd"
  },
  content: {
    padding: 10,
    width: "80%"
  },
  txtType: {
    color: "#000",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 14
  },
  txtContent: {
    color: "#000",
    justifyContent: "center",
    fontSize: 12
  },
  txtDate: {
    color: "grey",
    fontSize: 12
  },
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

export default connect()(Approval);
