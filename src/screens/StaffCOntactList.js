import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const StaffContactList = ({ dataStaffContact }) => {
  const {
    ucode,
    fullname,
    branch,
    mobile_no,
    email,
    department,
    position,
    line_ext
  } = dataStaffContact;
  return (
    // <Card>
    <View style={styles.container}>
      <View style={styles.contentTitle}>
        <Text style={styles.textStyle}>NIK</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.textStyle}>{ucode}</Text>
      </View>
      <View style={styles.contentTitle}>
        <Text style={styles.textStyle}>Name</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.textStyle}>{fullname}</Text>
      </View>
      <View style={styles.contentTitle}>
        <Text style={styles.textStyle}>Branch</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.textStyle}>{branch}</Text>
      </View>
      <View style={styles.contentTitle}>
        <Text style={styles.textStyle}>Department</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.textStyle}>{department}</Text>
      </View>
      <View style={styles.contentTitle}>
        <Text style={styles.textStyle}>Position</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.textStyle}>{position}</Text>
      </View>
      <View style={styles.contentTitle}>
        <Text style={styles.textStyle}>Email</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.textStyle}>{email}</Text>
      </View>
      <View style={styles.contentTitle}>
        <Text style={styles.textStyle}>Mobile No.</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.textStyle}>{mobile_no}</Text>
      </View>
      <View style={styles.contentTitle}>
        <Text style={styles.textStyle}>Line Ext.</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.textStyle}>{line_ext}</Text>
      </View>
    </View>
    // </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    // borderBottomWidth: 1,
    // borderColor: "#CCCCCC"
    //borderBottom
    // backgroundColor: "blue"
  },
  // content: {
  //   width: Dimensions.get("window").width / 4 - 10,
  //   padding: 5,
  // },
  contentTitle: {
    width: "30%",
    padding: 5
  },
  content: {
    width: "70%",
    padding: 5
  },
  textStyle: {
    color: "#192C4D",
    fontSize: 13,
    fontWeight: "300"
  }
});

export default StaffContactList;
