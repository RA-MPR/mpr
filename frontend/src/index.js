import React from "react";
import ReactDOM from "react-dom";
import AppBar from "./Components/AppBar/AppBar";
import Footer from "./Components/Footer/Footer";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import NotFound from "./Components/NotFound/NotFound";

import "./index.css";

import App from "./App";

const theme = createMuiTheme({
  palette: {
     primary: {
        main: "#109cf1" // This is an orange looking color
               },
     secondary: {
        main: "#ffcc80" //Another orange-ish color
                }
           }
});

ReactDOM.render(
  //<React.StrictMode>
  <App/>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
