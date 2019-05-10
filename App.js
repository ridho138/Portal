import React, { Component } from "react";
import Navigator from "./src/navigator/Navigator";
import { Provider } from "react-redux";
import store from "./src/store/Store";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
