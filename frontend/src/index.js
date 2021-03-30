import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppBar from "./Components/AppBar/AppBar";
import Footer from "./Components/Footer/Footer";
import reportWebVitals from "./reportWebVitals";
import CompanyPage from "./Components/CompanyPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

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
  <ThemeProvider theme={theme}>
    <Router>
      <AppBar />
      <Switch>
        <Route path="/calendar">
          <div>Calendar</div>
        </Route>
        <Route path="/contacts">
          <div>Contacts</div>
        </Route>
        <Route path="/matrix">
          <div>Místo pro matici rizik</div>
        </Route>
        <Route path="/" component={CompanyPage}></Route>
      </Switch>
      <Footer />
    </Router>
  </ThemeProvider>
  /*</React.StrictMode>*/,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
