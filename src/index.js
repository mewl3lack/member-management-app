import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./style/theme";
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />{" "}
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
