import React from "react";
import "./AppBar.css";
import { Link } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { AppBar, Toolbar } from "@material-ui/core";
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

function App() {
  const [alignment, setPage] = React.useState(0);

  const handlePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="AppBar">
        <AppBar position="static" color="transparent">
          <Toolbar className="toolbarContainer">
            <BusinessCenterIcon/>
            <span className="flexExpand"></span>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handlePage}
            >
              <ToggleButton value={0} component={Link} to="/">
                Firmy
              </ToggleButton>
              <ToggleButton value={1} component={Link} to="/calendar">
                Kalendář
              </ToggleButton>
              <ToggleButton value={2} component={Link} to="/contacts">
                Kontaktní osoby
              </ToggleButton>
            </ToggleButtonGroup>
          </Toolbar>
        </AppBar>
    </div>
  );
}

export default App;
