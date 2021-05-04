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
import UserPage from "./Components/UserPage";
import MatrixPage from "./Components/MatrixPage";

const App = () => {
  const [detailId, setDetailId] = useState("");
  const [userDetailId, setUserDetailId] = useState("");
  const { token, setToken, removeToken } = useToken();
  const [graphBody, setGraphBody] = useState(true);

  React.useEffect(() => {
    document.title = "Mazel+";
  }, [])

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
        <AppBar token={token} removeToken={removeToken} />
        <Switch>
          <Route path="/calendar">
            <CalendarPage token={token} />
          </Route>
          <Route path="/contacts">
            <ContactPage
              token={token}
              detailId={detailId}
              setDetailId={setDetailId}
            />
          </Route>
          <Route path="/matrix">
            <MatrixPage />
          </Route>
          <Route path="/" exact>
            <CompanyPage
              detailId={detailId}
              setDetailId={setDetailId}
              token={token}
              componentToShow="companyList"
              graphBody={graphBody}
              setGraphBody={setGraphBody}
            />
          </Route>
          <Route path="/company/new" exact>
            <CompanyPage
              detailId={detailId}
              setDetailId={setDetailId}
              token={token}
              componentToShow="companyNew"
              graphBody={graphBody}
              setGraphBody={setGraphBody}
            />
          </Route>
          <Route path="/company/detail" exact>
            <CompanyPage
              detailId={detailId}
              setDetailId={setDetailId}
              token={token}
              componentToShow="companyDetail"
              graphBody={graphBody}
              setGraphBody={setGraphBody}
            />
          </Route>
          <Route path="/users" exact>
            <UserPage
              token={token}
              userDetailId={userDetailId}
              setUserDetailId={setUserDetailId}
              detailId={detailId}
              setDetailId={setDetailId}
              componentToShow="userList"
            />
          </Route>
          <Route path="/users/detail" exact>
            <UserPage
              token={token}
              userDetailId={userDetailId}
              setUserDetailId={setUserDetailId}
              detailId={detailId}
              setDetailId={setDetailId}
              componentToShow="userDetail"
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
