import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppBar from "./Components/AppBar/AppBar";
import reportWebVitals from "./reportWebVitals";
import CompanyPage from "./Components/CompanyPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppBar />
      <Switch>
        <Route path="/calendar">
          <div>Calendar</div>
        </Route>
        <Route path="/contacts">
          <div>Contacts</div>
        </Route>
        <Route path="/" component={CompanyPage}></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
