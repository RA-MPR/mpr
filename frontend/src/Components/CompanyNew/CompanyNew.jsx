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

function NewCompany({ onCloseForm, className, onShowCompanyDetail, token }) {
  const [openAlert, setOpenAlert] = React.useState(false);

  const [openSuccess, setOpenSuccess] = React.useState(false);

  const [color, setColor] = React.useState("orange");

  const [customStatus, setCustomStatus] = React.useState(true);

  const [checkedBilling, setCheckedBilling] = React.useState(false);

  const [statusValue, setStatusValue] = React.useState("orange");

  const [statusTextVal, setStatusTextVal] = React.useState("Osloveno");

  const [errorMessage, setErrorMessage] = React.useState("");

  const [responseICO, setResponseICO] = React.useState("");

  const [errorICO, setErrorICO] = React.useState("");

  const [errorTel, setErrorTel] = React.useState("");

  const [errorZipContact, setErrorZipContact] = React.useState("");

  const [errorZipBilling, setErrorZipBilling] = React.useState("");

  const handleChange = (event) => {
    setStatusValue(event.target.value);
    setStatusTextVal(event.currentTarget.innerText);

    if (event.target.value === "Custom") {
      setCustomStatus(false);
      setColor("white");
    } else {
      setCustomStatus(true);
      setColor(event.target.value);
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
    onShowCompanyDetail(responseICO);
  };

  const handleColor = (event, value) => {
    if (value) setColor(value);
  };

  const toggleChecked = (e) => {
    setCheckedBilling((prev) => !prev);
    if (!checkedBilling) {
      setErrorZipBilling("");
    }
  };

  const telRegex = /^(\+420)?[1-9][0-9]{2}[0-9]{3}[0-9]{3}$/;
  const telRegex2 = /^[1-9][0-9]{2}[0-9]{3}[0-9]{3}$/;

  const icoValidate = (icoValue) => {
    var ico = icoValue.replace(/ /g, "");
    if (!ico) {
      setErrorICO("Vyžadováno");
      return false;
    }
    if (ico.length !== 8) {
      setErrorICO("IČO nemá správnou délku");
      return false;
    } else {
      setErrorICO("");
      return true;
    }
  };

  const phoneValidate = (telValue) => {
    var phoneNumber = telValue.replace(/ /g, "");
    if (phoneNumber.length !== 0) {
      if (telRegex.test(phoneNumber)) {
        setErrorTel("");
        return true;
      }
      if (telRegex2.test(phoneNumber)) {
        phoneNumber = "+420" + phoneNumber;
        setErrorTel("");
        return true;
      } else {
        setErrorTel("Špatný formát (+420987654321)");
        return false;
      }
    }
    return true;
  };

  const zipRegex = /^[0-9]{5}$/;

  const zipValidate = (zipValue, setErrorZip) => {
    var zipNumber = zipValue.replace(/ /g, "");
    if (setErrorZip === setErrorZipBilling && checkedBilling) {
      setErrorZip("");
      return true;
    }
    if (zipNumber.length !== 0) {
      if (zipRegex.test(zipNumber)) {
        setErrorZip("");
        return true;
      } else {
        setErrorZip("PSČ se musí skládat z 5ti číslic");
        return false;
      }
    }
    return true;
  };

  const handleCreate = (event) => {
    event.preventDefault();

    var ico = event.target.ICO.value.replace(/ /g, "");
    if (!icoValidate(ico)) {
      setErrorMessage("Špatně zadané IČO");
      handleClickOpenAlert();
      return;
    }

    var phoneNumber = event.target.tel.value.replace(/ /g, "");
    if (!phoneValidate(phoneNumber)) {
      setErrorMessage('Telefonní číslo musí být ve formátu "+420987654321"');
      handleClickOpenAlert();
      return;
    }

    var contactZip = event.target.zipContact.value.replace(/ /g, "");
    var billingZip = event.target.zipBilling.value.replace(/ /g, "");

    if (
      !zipValidate(contactZip, setErrorZipContact) ||
      !zipValidate(billingZip, setErrorZipBilling)
    ) {
      setErrorMessage("PSČ se musí skládat z 5ti číslic");
      handleClickOpenAlert();
      return;
    }

    var contactAddress = {
      street: event.target.streetContact.value,
      zip_code: contactZip,
      city: event.target.cityContact.value,
      country: event.target.countryContact.value,
    };
    var billingAddress = contactAddress;
    if (!checkedBilling) {
      billingAddress = {
        street: event.target.streetBilling.value,
        zip_code: billingZip,
        city: event.target.cityBilling.value,
        country: event.target.countryBilling.value,
      };
    }

    var statusText = statusTextVal;
    if (!customStatus) {
      statusText = event.target.statusText.value;
    }

    axios
      .post("/api/company/", {
        ico: ico,
        name: event.target.name.value,
        status: statusText,
        status_color: color,
        contact_address: contactAddress,
        billing_address: billingAddress,
        phone_number: phoneNumber,
      },{headers:{Authorization: "Token " + token}})
      .then(function (response) {
        setResponseICO(response.data["ico"]);
        handleClickOpenSuccess();
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
          <IconButton className="cancelButton" onClick={onCloseForm}>
            <CancelIcon />
          </IconButton>
        </div>
        <Grid container justify="center" spacing={1} alignItems="center">
          <Grid item xs={3}>
            <TextField
              name="ICO"
              required
              id="ICO"
              label="IČO"
              type="number"
              autoFocus
              fullWidth
              error={errorICO !== "" ? true : false}
              helperText={errorICO}
              onBlur={(e) => icoValidate(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="tel"
              id="tel"
              label="Telefon"
              fullWidth
              error={errorTel !== "" ? true : false}
              helperText={errorTel}
              onBlur={(e) => phoneValidate(e.target.value)}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField id="name" fullWidth label="Jméno firmy" name="name" />
          </Grid>

          <Grid item xs={7}>
            <Grid container spacing={1}>
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
                    type="number"
                    error={errorZipContact !== "" ? true : false}
                    helperText={errorZipContact}
                    onBlur={(e) =>
                      zipValidate(e.target.value, setErrorZipContact)
                    }
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
                    id="streetBilling"
                    label="Ulice"
                    name="streetBilling"
                    fullWidth
                  />
                  <TextField
                    disabled={checkedBilling}
                    id="zipBilling"
                    label="PSČ"
                    name="zipBilling"
                    fullWidth
                    type="number"
                    error={errorZipBilling !== "" ? true : false}
                    helperText={errorZipBilling}
                    onBlur={(e) =>
                      zipValidate(e.target.value, setErrorZipBilling)
                    }
                  />
                  <TextField
                    disabled={checkedBilling}
                    id="cityBilling"
                    label="Město"
                    name="cityBilling"
                    fullWidth
                  />
                  <TextField
                    disabled={checkedBilling}
                    id="countryBilling"
                    label="Země"
                    name="countryBilling"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7}>
            <InputLabel id="statusLabel">Stav</InputLabel>
            <TextField
              className="statusTextField"
              style={{ backgroundColor: color }}
              id="status"
              value={statusValue}
              labelid="statusLabel"
              select
              onChange={handleChange}
              required
            >
              <MenuItem
                value="orange"
                style={{ backgroundColor: "orange" }}
                selected
              >
                Osloveno
              </MenuItem>
              <MenuItem value="green" style={{ backgroundColor: "green" }}>
                Uzavřeno
              </MenuItem>
              <MenuItem value="red" style={{ backgroundColor: "red" }}>
                Odmítnuto
              </MenuItem>
              <MenuItem value="Custom">Vlastní</MenuItem>
            </TextField>
          </Grid>
          <StatusPicker
            customStatus={customStatus}
            color={color}
            handleColor={handleColor}
          />
        </Grid>

        <div className="footer">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ color: "white" }}
          >
            Vytvořit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewCompany;
