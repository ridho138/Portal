import React, { Component } from "react";
import Navigator from "./src/navigator/Navigator";
import { InAppNotificationProvider } from "react-native-in-app-notification";

export default class App extends Component {
  render() {
    return (
      <InAppNotificationProvider>
        <Navigator />
      </InAppNotificationProvider>
    );
  }
}
