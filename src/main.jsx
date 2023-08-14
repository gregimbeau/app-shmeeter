import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style/main.scss";
import { Provider } from "jotai";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
