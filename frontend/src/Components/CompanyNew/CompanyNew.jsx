import React from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";
import "./CompanyNew.css";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import ContactList from "./ContactList";
import ContactNew from "./ContactNew";

function NewCompany() {
  const [open, setOpen] = React.useState(false);
  const [contacts, setContacts] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };



  return (
    <div>
    <ContactNew open={open} setOpen={setOpen} contacts={contacts} setContacts={setContacts}/>
      <form>
        <div className="header">
          <Typography variant="h4">Nová firma</Typography>
          <span className="flexExpand"></span>
          <IconButton aria-label="cancel">
            <CancelIcon />
          </IconButton>
        </div>
        <Grid container justify="center" spacing={1} alignItems="center">
          <Grid item xs={2}>
            <TextField
              name="ICO"
              variant="outlined"
              fullWidth
              required
              id="ICO"
              label="IČO"
              type="number"
              autoFocus
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              id="name"
              fullWidth
              label="Jméno firmy"
              name="name"
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              id="contact_adress"
              fullWidth
              label="Kontaktní adresa"
              name="contact_adress"
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              id="billing_adress"
              label="Fakturační adresa"
              fullWidth
              name="billing_adress"
            />
          </Grid>
          <Grid item xs={5}>
            <Paper className="paperContacts">
                <ContactList contacts={contacts} setContacts={setContacts}/>
            </Paper>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" onClick={handleClickOpen}>
              <AddIcon />
            </Button>
          </Grid>
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
