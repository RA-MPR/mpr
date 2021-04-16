import React, { useState } from "react";
import ReactDOM from "react-dom";
import AppBar from "./Components/AppBar/AppBar";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import NotFound from "./Components/NotFound/NotFound";

import "./index.css";

import CompanyPage from "./Components/CompanyPage";
import ContactPage from "./Components/ContactPage";
import CompanyList from "./Components/CompanyList/CompanyList";

const App = () => {

    const [detailIco, setDetailIco] = useState("");

    //SUPERUSER TOKEN FOR TESTING
    const [token,setToken] = useState("97547bc7c4f22ba4d4365f70889ce812d9445f02");

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

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <AppBar />
                <Switch>
                    <Route path="/calendar">
                    <div>Calendar</div>
                    </Route>
                    <Route path="/contacts">
                        <ContactPage token={token}/>
                    </Route>
                    <Route path="/matrix">
                    <div>Místo pro matici rizik</div>
                    </Route>
                    <Route path="/" exact>
                        <CompanyPage 
                            detailIco={detailIco} 
                            setDetailIco={setDetailIco}
                            token={token} 
                            componentToShow="companyList"/>
                    </Route>
                    <Route path="/company/new" exact>
                        <CompanyPage 
                            detailIco={detailIco} 
                            setDetailIco={setDetailIco}
                            token={token} 
                            componentToShow="companyNew"/>
                    </Route>
                    <Route path="/company/detail" exact>
                        <CompanyPage 
                            detailIco={detailIco} 
                            setDetailIco={setDetailIco}
                            token={token} 
                            componentToShow="companyDetail"/>
                    </Route>
                    <Route component={NotFound}></Route>
                </Switch>
                <Footer />
            </Router>
    </ThemeProvider>
    )
}

export default App
