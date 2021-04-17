import React, { useState } from "react";
import AppBar from "./Components/AppBar/AppBar";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import NotFound from "./Components/NotFound/NotFound";

import "./index.css";

import CompanyPage from "./Components/CompanyPage";
import ContactPage from "./Components/ContactPage";
import CalendarPage from "./Components/CalendarPage";

import useToken from "./Components/Auth/useToken";
import Login from "./Components/Auth/Login";

const App = () => {
  const [detailIco, setDetailIco] = useState("");

  const { token, setToken, removeToken } = useToken();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#109cf1", // This is an orange looking color
      },
      secondary: {
        main: "#ffcc80", //Another orange-ish color
      },
    },
  });

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar removeToken={removeToken}/>
        <Switch>
          <Route path="/calendar">
            <CalendarPage token={token} />
          </Route>
          <Route path="/contacts">
            <ContactPage token={token} />
          </Route>
          <Route path="/matrix">
            <div>Místo pro matici rizik</div>
          </Route>
          <Route path="/" exact>
            <CompanyPage
              detailIco={detailIco}
              setDetailIco={setDetailIco}
              token={token}
              componentToShow="companyList"
            />
          </Route>
          <Route path="/company/new" exact>
            <CompanyPage
              detailIco={detailIco}
              setDetailIco={setDetailIco}
              token={token}
              componentToShow="companyNew"
            />
          </Route>
          <Route path="/company/detail" exact>
            <CompanyPage
              detailIco={detailIco}
              setDetailIco={setDetailIco}
              token={token}
              componentToShow="companyDetail"
            />
          </Route>
          <Route component={NotFound}></Route>
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
