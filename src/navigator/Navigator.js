import React from "react";
import { View, Image } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

import SplashScreen from "../screens/SplashScreen";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Notification from "../screens/Notification";
import Profile from "../screens/Profile";
import Attendance from "../screens/Attendance";
import StaffContact from "../screens/StaffContact";

const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="compass" color={tintColor} size={25} />
        )
      })
    },
    Profile: {
      screen: Profile,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user-circle" color={tintColor} size={25} />
        )
      })
    },
    News: {
      screen: Notification,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="envelope" color={tintColor} size={25} />
        )
      })
    }
  },
  {
    tabBarPosition: "top",
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      activeTintColor: "#FFFFFF",
      inactiveTintColor: "#F8F8F8",
      style: {
        backgroundColor: "#06397B"
      },
      labelStyle: {
        textAlign: "center",
        fontSize: 9
      },
      indicatorStyle: {
        borderBottomColor: "#F8F8F8",
        borderBottomWidth: 1
      }
    }
  }
);

const AppStackNavigator = createStackNavigator(
  {
    // Home: {
    //   screen: Home,
    //   navigationOptions: ({ navigation }) => ({
    //     headerStyle: {
    //       backgroundColor: "#06397B"
    //     },
    //     headerLeft: (
    //       <Image
    //         resizeMode="contain"
    //         style={{ position: "absolute", width: 150, height: 50 }}
    //         source={require("../components/images/logo-white.png")}
    //       />
    //     ),
    //     headerRight: (
    //       <View style={{ flex: 1, flexDirection: "row" }}>
    //         <Icon
    //           style={{ paddingRight: 20 }}
    //           name="user-circle"
    //           size={25}
    //           color="#fff"
    //           onPress={() => navigation.navigate("Profile")}
    //         />
    //         <Icon
    //           style={{ paddingRight: 10 }}
    //           name="bell"
    //           size={25}
    //           color="#fff"
    //           onPress={() => navigation.navigate("Notification")}
    //         />
    //       </View>
    //     )
    //   })
    // },
    // Notification: { screen: Notification },
    // Profile: { screen: Profile },
    Home: {
      screen: TabNavigator,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: "#06397B"
        },
        headerLeft: (
          <Image
            resizeMode="contain"
            style={{ position: "absolute", width: 150, height: 50 }}
            source={require("../components/images/logo-white.png")}
          />
        )
      })
    },
    Attendance: { screen: Attendance },
    StaffContact: { screen: StaffContact }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const routeName = navigation.state.routeName;
      if (routeName != "Home") {
        return {
          headerTitle: routeName,
          headerStyle: {
            backgroundColor: "#06397B"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          }
          // headerRight: (
          //     <View style={{flex: 1, flexDirection: 'row'}}>

          //         <Icon
          //             style={{ paddingRight: 20 }}
          //             name="user-circle"
          //             size={30}
          //             color="#fff"
          //             onPress={() => navigation.navigate('Profile')}
          //         />
          //         <Icon
          //             style={{ paddingRight: 10 }}
          //             name="bell"
          //             size={30}
          //             color="#fff"
          //             onPress={() => navigation.navigate('Notification')}
          //         />

          //     </View>

          // )
        };
      }
    }
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  SplashScreen: { screen: SplashScreen },
  Login: { screen: Login },
  Dashboard: { screen: AppStackNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;
