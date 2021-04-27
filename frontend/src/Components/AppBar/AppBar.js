import React from "react";
import "./AppBar.css";
import { Link } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ConfirmDialog from "../CompanyDetails/ConfirmDialog";
import axios from "axios";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function App({ token, removeToken }) {
  const [page, setPage] = React.useState(0);
  const [admin, setAdmin] = React.useState(false);
  const [logoutOpen, setLogoutOpen] = React.useState(false);
  const history = useHistory();

  const handlePage = (event, newPage) => {
    setPage(newPage);
  };

  function handleLogout() {
    history.push("/");
    removeToken();
  }

  const fetchAdmin = async () => {
    await axios
      .get("/api/user/admin", {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => {
        setAdmin(res.data["is_admin"]);
      });
  };

  React.useEffect(() => {
    const getAdmin = async () => {
      const admin = await fetchAdmin();
    };
    getAdmin();
  }, []);

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
                {window.location.pathname === "/users" && admin && (
                  <ToggleButton
                    selected
                    value={3}
                    component={Link}
                    to="/users"
                  >
                    Obchodníci
                  </ToggleButton>
                )}
                {window.location.pathname !== "/users" && admin && (
                  <ToggleButton
                    selected={false}
                    value={3}
                    component={Link}
                    to="/users"
                  >
                    Obchodníci
                  </ToggleButton>
                )}
              </ToggleButtonGroup>
              <IconButton
                onClick={() => setLogoutOpen(true)}
                style={{ marginLeft: "10px" }}
              >
                <ExitToAppIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}

export default App;
