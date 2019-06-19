import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

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
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
          }}
        />
      </View>

      <View style={styles.rightContent}>
        <Text style={styles.name}>{fullname}</Text>
        <Text style={styles.userInfo}>{email}</Text>
        <Text style={styles.userInfo}>
          {department} / {position}
        </Text>
        <Text style={styles.userInfo}>
          {mobile_no} / {line_ext}
        </Text>
      </View>
    </View>

    // <Card>
    // <View style={styles.container}>
    //   <View style={styles.contentTitle}>
    //     <Text style={styles.textStyle}>NIK</Text>
    //   </View>
    //   <View style={styles.content}>
    //     <Text style={styles.textStyle}>{ucode}</Text>
    //   </View>
    //   <View style={styles.contentTitle}>
    //     <Text style={styles.textStyle}>Name</Text>
    //   </View>
    //   <View style={styles.content}>
    //     <Text style={styles.textStyle}>{fullname}</Text>
    //   </View>
    //   <View style={styles.contentTitle}>
    //     <Text style={styles.textStyle}>Branch</Text>
    //   </View>
    //   <View style={styles.content}>
    //     <Text style={styles.textStyle}>{branch}</Text>
    //   </View>
    //   <View style={styles.contentTitle}>
    //     <Text style={styles.textStyle}>Department</Text>
    //   </View>
    //   <View style={styles.content}>
    //     <Text style={styles.textStyle}>{department}</Text>
    //   </View>
    //   <View style={styles.contentTitle}>
    //     <Text style={styles.textStyle}>Position</Text>
    //   </View>
    //   <View style={styles.content}>
    //     <Text style={styles.textStyle}>{position}</Text>
    //   </View>
    //   <View style={styles.contentTitle}>
    //     <Text style={styles.textStyle}>Email</Text>
    //   </View>
    //   <View style={styles.content}>
    //     <Text style={styles.textStyle}>{email}</Text>
    //   </View>
    //   <View style={styles.contentTitle}>
    //     <Text style={styles.textStyle}>Mobile No.</Text>
    //   </View>
    //   <View style={styles.content}>
    //     <Text style={styles.textStyle}>{mobile_no}</Text>
    //   </View>
    //   <View style={styles.contentTitle}>
    //     <Text style={styles.textStyle}>Line Ext.</Text>
    //   </View>
    //   <View style={styles.content}>
    //     <Text style={styles.textStyle}>{line_ext}</Text>
    //   </View>
    // </View>
    // </Card>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   // alignItems: "center",
  //   flex: 1,
  //   flexDirection: "row",
  //   flexWrap: "wrap"
  //   // borderBottomWidth: 1,
  //   // borderColor: "#CCCCCC"
  //   //borderBottom
  //   // backgroundColor: "blue"
  // },
  // content: {
  //   width: Dimensions.get("window").width / 4 - 10,
  //   padding: 5,
  // },
  // contentTitle: {
  //   width: "30%",
  //   padding: 5
  // },
  // content: {
  //   width: "70%",
  //   padding: 5
  // },
  // textStyle: {
  //   color: "#06397B",
  //   fontSize: 13,
  //   fontWeight: "300"
  // }
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  leftContent: {
    padding: 5,
    width: "30%"
  },
  rightContent: {
    padding: 10,
    width: "70%"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: "#06397B"
  },
  name: {
    fontSize: 14,
    color: "#06397B",
    fontWeight: "600"
  },
  userInfo: {
    fontSize: 12,
    color: "#06397B"
  }
});

export default StaffContactList;
