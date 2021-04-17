import React from "react";
import Button from "@material-ui/core/Button";
import { Grid, InputAdornment, TextField, Typography } from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";
import axios from "axios";
import AlertDialog from "../CompanyNew/AlertDialog";

export default function Login({ setToken }) {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/user/login/", {
        username: event.target.email.value,
        password: event.target.password.value,
      })
      .then(function (response) {
        setToken(response.data["token"]);
      })
      .catch(function (error) {
        if (error.response) {
          var first = Object.keys(error.response.data)[0];
          setErrorMessage(error.response.data[first][0]);
        }
        setOpenAlert(true);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <AlertDialog
        open={openAlert}
        handleClose={() => setOpenAlert(false)}
        error={errorMessage}
      />
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid
          container
          item
          xs={12}
          sm={12}
          alignItems="center"
          direction="column"
          justify="space-between"
          style={{ padding: 10 }}
        >
          <div />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 400,
              minWidth: 300,
            }}
          >
            <Typography variant="h4">Přihlášení</Typography>
            <TextField
              label="Email"
              margin="normal"
              required
              id="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Heslo"
              margin="normal"
              required
              id="password"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded />
                  </InputAdornment>
                ),
              }}
            />
            <div style={{ height: 20 }} />
            <Button
              id="login"
              color="primary"
              variant="contained"
              type="submit"
            >
              Přihlásit se
            </Button>
            <div style={{ height: 20 }} />
          </div>
          <div />
        </Grid>
      </Grid>
    </form>
  );
}
