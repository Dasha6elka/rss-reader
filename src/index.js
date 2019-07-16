import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import "normalize.css";
import JssProvider from "./components/JssProvider";

ReactDOM.render(
  <JssProvider>
    <App />
  </JssProvider>,
  document.getElementById("root")
);
