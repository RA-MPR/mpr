import React from "react";
import "./AppBar.css";
import { Link } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ConfirmDialog from "../CompanyDetails/ConfirmDialog";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function App({ removeToken }) {
  const [page, setPage] = React.useState(0);
  const [logoutOpen, setLogoutOpen] = React.useState(false);
  const history = useHistory();

  const handlePage = (event, newPage) => {
    setPage(newPage);
  };

  function handleLogout() {
    history.push("/");
    removeToken();
  }

  return (
    <>
      <ConfirmDialog
        title="Odhlásit?"
        open={logoutOpen}
        setOpen={setLogoutOpen}
        onConfirm={() => handleLogout()}
      >
        Opravdu se chcete odhlásit?
      </ConfirmDialog>
      <div className="AppBar">
        <AppBar position="static" color="transparent">
          <Toolbar className="toolbarContainer">
            <Typography
              variant="h5"
              className="logoAppBar"
              component={Link}
              to="/"
              onClick={() => setPage(0)}
            >
              Mazel+
            </Typography>
            <span className="flexExpand"></span>
            <div>
              <ToggleButtonGroup value={page} exclusive onChange={handlePage}>
                {console.log(window.location.pathname)}
                {window.location.pathname === "/" && (
                  <ToggleButton selected value={0} component={Link} to="/">
                    Firmy
                  </ToggleButton>
                )}
                {window.location.pathname !== "/" && (
                  <ToggleButton
                    selected={false}
                    value={0}
                    component={Link}
                    to="/"
                  >
                    Firmy
                  </ToggleButton>
                )}
                {window.location.pathname === "/calendar" && (
                  <ToggleButton
                    selected
                    value={1}
                    component={Link}
                    to="/calendar"
                  >
                    Kalendář
                  </ToggleButton>
                )}
                {window.location.pathname !== "/calendar" && (
                  <ToggleButton
                    selected={false}
                    value={1}
                    component={Link}
                    to="/calendar"
                  >
                    Kalendář
                  </ToggleButton>
                )}
                {window.location.pathname === "/contacts" && (
                  <ToggleButton
                    selected
                    value={2}
                    component={Link}
                    to="/contacts"
                  >
                    Kontaktní osoby
                  </ToggleButton>
                )}
                {window.location.pathname !== "/contacts" && (
                  <ToggleButton
                    selected={false}
                    value={2}
                    component={Link}
                    to="/contacts"
                  >
                    Kontaktní osoby
                  </ToggleButton>
                )}
              </ToggleButtonGroup>
              <IconButton onClick={() =>setLogoutOpen(true)} style={{ marginLeft: "10px" }}>
                <ExitToAppIcon/>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}

export default App;
