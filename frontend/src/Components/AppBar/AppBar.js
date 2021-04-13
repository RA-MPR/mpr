import React from "react";
import "./AppBar.css";
import { Link } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

function App() {
  const [page, setPage] = React.useState(0);

  const handlePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="AppBar">
        <AppBar position="static" color="transparent">
          <Toolbar className="toolbarContainer">
            <Typography variant="h5" className="logoAppBar" component={Link} to="/" onClick={() => setPage(0)}>Mazel+</Typography>
            <span className="flexExpand"></span>
            <ToggleButtonGroup
              value={page}
              exclusive
              onChange={handlePage}
            >
              {console.log(window.location.pathname)}
              {window.location.pathname === "/" &&
              <ToggleButton selected value={0} component={Link} to="/">
                Firmy
              </ToggleButton>}
              {window.location.pathname !== "/" &&
              <ToggleButton selected={false} value={0} component={Link} to="/">
                Firmy
              </ToggleButton>}
              {window.location.pathname === "/calendar" &&
              <ToggleButton selected value={1} component={Link} to="/calendar">
                Kalendář
              </ToggleButton>}
              {window.location.pathname !== "/calendar" &&
              <ToggleButton selected={false} value={1} component={Link} to="/calendar">
                Kalendář
              </ToggleButton>}
              {window.location.pathname === "/contacts" && 
              <ToggleButton selected value={2} component={Link} to="/contacts">
                Kontaktní osoby
              </ToggleButton>}
              {window.location.pathname !== "/contacts" && 
              <ToggleButton selected={false} value={2} component={Link} to="/contacts">
                Kontaktní osoby
              </ToggleButton>}
            </ToggleButtonGroup>
          </Toolbar>
        </AppBar>
    </div>
  );
}

export default App;
