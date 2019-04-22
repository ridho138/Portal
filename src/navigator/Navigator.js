import React from "react";
import { View } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

import SplashScreen from "../screens/SplashScreen"
import Login from "../screens/Login";
import Home from "../screens/Home";
import Notification from "../screens/Notification";
import Profile from "../screens/Profile";
import Attendance from "../screens/Attendance";
import StaffContact from "../screens/StaffContact";

const AppStackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        headerRight: (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Icon
              style={{ paddingRight: 20 }}
              name="user-circle"
              size={25}
              color="#E1C064"
              onPress={() => navigation.navigate("Profile")}
            />
            <Icon
              style={{ paddingRight: 10 }}
              name="bell"
              size={25}
              color="#E1C064"
              onPress={() => navigation.navigate("Notification")}
            />
          </View>
        )
      })
    },
    Notification: { screen: Notification },
    Profile: { screen: Profile },
    Attendance: { screen: Attendance },
    StaffContact: { screen: StaffContact }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const routeName = navigation.state.routeName;
      return {
        headerTitle: routeName,
        headerStyle: {
          backgroundColor: "#192C4D"
        },
        headerTintColor: "#E1C064",
        headerTitleStyle: {
          fontWeight: "bold"
        }
        // headerRight: (
        //     <View style={{flex: 1, flexDirection: 'row'}}>

        //         <Icon
        //             style={{ paddingRight: 20 }}
        //             name="user-circle"
        //             size={25}
        //             color="#E1C064"
        //             onPress={() => navigation.navigate('Profile')}
        //         />
        //         <Icon
        //             style={{ paddingRight: 10 }}
        //             name="bell"
        //             size={25}
        //             color="#E1C064"
        //             onPress={() => navigation.navigate('Notification')}
        //         />

        //     </View>

        // )
      };
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
