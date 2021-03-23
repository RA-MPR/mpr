import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import "./CompanyNew.css";

const ContactNew = ({ open, setOpen, contacts, setContacts }) => {
  const name = React.useRef();
  const surname = React.useRef();
  const email = React.useRef();
  const tel = React.useRef();

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setOpen(false);
    setContacts([...contacts, {name: name.current.value,
                                surname: surname.current.value,
                                email: email.current.value,
                                tel: tel.current.value}]);
  };
  return (
    <div>
      <form onSubmit={handleAdd}>
        <Dialog
          open={open}
          aria-labelledby="form-dialog-title"
          disablePortal
        >
          <DialogTitle id="form-dialog-title">Přidat kontaktní osobu</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              variant="outlined"
              margin="dense"
              id="name"
              fullWidth
              label="Jméno"
              name="name"
              inputRef={name}
            />
            <TextField
              required
              variant="outlined"
              margin="dense"
              id="surname"
              fullWidth
              label="Příjmení"
              name="surname"
              inputRef={surname}
            />
            <TextField
              variant="outlined"
              margin="dense"
              id="email"
              label="E-mail"
              type="email"
              fullWidth
              inputRef={email}
            />
            <TextField
              variant="outlined"
              margin="dense"
              id="tel"
              label="Telefon"
              type="number"
              fullWidth
              inputRef={tel}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Zrušit
            </Button>
            <Button type="submit" color="primary">
              Přidat
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
};

export default ContactNew;
