import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { injectContext } from "./store/store";

const MyApp = injectContext(App);

ReactDOM.render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>,
  document.getElementById("root")
);
