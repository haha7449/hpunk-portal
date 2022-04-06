import React from "react";
import ReactDOM from "react-dom";
import Main from "./pages/main";
import { Provider } from "react-redux";
import store from "./redux/store";
import initialState from "./redux/initialState";
import storageUtils from "./utils/storageUtils";

initialState.user = storageUtils.getUser() || {};

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("root")
);
