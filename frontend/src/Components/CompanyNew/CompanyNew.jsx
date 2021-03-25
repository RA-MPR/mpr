import React from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import "./CompanyNew.css";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import AlertDialog from "./AlertDialog";
import SuccessDialog from "./SuccessDialog";
import StatusPicker from "./StatusPicker";

function NewCompany({ onCloseForm, className }) {
  const [openAlert, setOpenAlert] = React.useState(false);

  const [openSuccess, setOpenSuccess] = React.useState(false);

  const [color, setColor] = React.useState("white");

  const [customStatus, setCustomStatus] = React.useState(true);

  const [checkedBilling, setCheckedBilling] = React.useState(false);

  const [statusValue, setStatusValue] = React.useState("Osloveno");

  const [errorMessage, setErrorMessage] = React.useState("");

  const handleChange = (event) => {
    setStatusValue(event.target.value);
    if (event.target.value === "Custom") {
      setCustomStatus(false);
    } else {
      setCustomStatus(true);
    }
  };

  const handleClickOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleClickOpenSuccess = () => {
    setOpenSuccess(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleColor = (event, value) => {
    setColor(value);
  };

  const toggleChecked = (e) => {
    setCheckedBilling((prev) => !prev);
    console.log(checkedBilling);
  };

  const handleCreate = (event) => {
    event.preventDefault();

    var contactAddress = {
      street: event.target.streetContact.value,
      zip_code: event.target.zipContact.value,
      city: event.target.cityContact.value,
      country: event.target.countryContact.value,
    };
    var billingAddress = contactAddress;
    if (!checkedBilling) {
      billingAddress = {
        street: event.target.street.value,
        zip_code: event.target.zip.value,
        city: event.target.city.value,
        country: event.target.country.value,
      };
    }
    var status = statusValue;
    if (status === "Custom") {
      status = event.target.statusText.value;
      // TODO status colors
    }
    axios
      .post("http://127.0.0.1:8000/company/", {
        ico: event.target.ICO.value,
        name: event.target.name.value,
        status: status,
        contact_address: contactAddress,
        billing_address: billingAddress,
        phone_number: event.target.tel.value,
      })
      .then(function (response) {
        console.log(response.data);
        handleClickOpenSuccess();
        // success, TODO redirect to detail page
      })
      .catch(function (error) {
        if (error.response) {
          var first = Object.keys(error.response.data)[0];
          setErrorMessage(error.response.data[first][0]);
        }
        handleClickOpenAlert();
      });
  };

  return (
    <div id="companyNew" className={className}>
      <AlertDialog
        open={openAlert}
        handleClose={handleCloseAlert}
        error={errorMessage}
      />
      <SuccessDialog open={openSuccess} handleClose={handleCloseSuccess} />
      <form onSubmit={handleCreate}>
        <div className="header">
          <Typography variant="h4">Nová firma</Typography>
          <span className="flexExpand"></span>
          <IconButton aria-label="cancel" onClick={onCloseForm}>
            <CancelIcon />
          </IconButton>
        </div>
        <Grid container justify="center" spacing={1} alignItems="center">
          <Grid item xs={4}>
            <TextField
              name="ICO"
              required
              id="ICO"
              label="IČO"
              type="number"
              autoFocus
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="tel"
              id="tel"
              label="Telefon"
              type="number"
              autoFocus
              fullWidth
            />
          </Grid>
          <Grid item xs={7}>
            <TextField id="name" fullWidth label="Jméno firmy" name="name" />
          </Grid>

          <Grid
            container
            xs={7}
            justify="center"
            spacing={1}
            alignItems="center"
          >
            <Grid item xs={6} style={{ paddingTop: 28 }}>
              <Grid item xs={12}>
                <Typography variant="h6">Kontaktní adresa</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="streetContact"
                  label="Ulice"
                  name="streetContact"
                  fullWidth
                />
                <TextField
                  id="zipContact"
                  label="PSČ"
                  name="zipContact"
                  fullWidth
                />
                <TextField
                  id="cityContact"
                  label="Město"
                  name="cityContact"
                  fullWidth
                />
                <TextField
                  id="countryContact"
                  label="Země"
                  name="countryContact"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid item xs={12}>
                <Typography variant="h6">Fakturační adresa</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={checkedBilling}
                      onChange={toggleChecked}
                    />
                  }
                  label="Stejná jako kontaktní"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={checkedBilling}
                  id="street"
                  label="Ulice"
                  name="street"
                  fullWidth
                />
                <TextField
                  disabled={checkedBilling}
                  id="zip"
                  label="PSČ"
                  name="zip"
                  fullWidth
                />
                <TextField
                  disabled={checkedBilling}
                  id="city"
                  label="Město"
                  name="city"
                  fullWidth
                />
                <TextField
                  disabled={checkedBilling}
                  id="country"
                  label="Země"
                  name="country"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7}>
            <InputLabel id="statusLabel">Stav</InputLabel>
            <TextField
              style={{ width: 120 }}
              id="status"
              value={statusValue}
              labelId="statusLabel"
              select
              onChange={handleChange}
            >
              <MenuItem value="Osloveno">Osloveno</MenuItem>
              <MenuItem value="Uzavřeno">Uzavřeno</MenuItem>
              <MenuItem value="Odmítnuto">Odmítnuto</MenuItem>
              <MenuItem value="Custom">Vlastní</MenuItem>
            </TextField>
          </Grid>
          <StatusPicker customStatus={customStatus} color={color} handleColor={handleColor}/>
        </Grid>
        <div className="footer">
          <Button type="submit" variant="contained" color="primary">
            Vytvořit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewCompany;
