import { Card, CardContent } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core"
import ConfirmDialog from "./ConfirmDialog";

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';

import axios from "axios"

import { React, useState, useEffect } from "react"

import "./css/ContactPersons.css"


const ContactPersons = ({data, clean, refresh, ico, token}) => {

    const [newContact, setNewContact] = useState(false);

    const [newContactName, setNewContactName] = useState("");
    const [newContactLastName, setNewContactLastName] = useState("");
    const [newContactEmail, setNewContactEmail] = useState("");
    const [newContactPhoneNumber, setNewContactPhoneNumber] = useState("");

    const [newContactNameError, setNewContactNameError] = useState(false);
    const [newContactLastNameError, setNewContactLastNameError] = useState(false);
    const [newContactEmailError, setNewContactEmailError] = useState(false);
    const [newContactPhoneNumberError, setNewContactPhoneNumberError] = useState(false);

    const [newContactNameErrorMessage, setNewContactNameErrorMessage] = useState("");
    const [newContactLastNameErrorMessage, setNewContactLastNameErrorMessage] = useState("");
    const [newContactEmailErrorMessage, setNewContactEmailErrorMessage] = useState("");
    const [newContactPhoneNumberErrorMessage, setNewContactPhoneNumberErrorMessage] = useState("");

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmTitle, setConfirmTitle] = useState("");
    const [confirmText, setConfirmText] = useState("");
    const [deleteID, setDeleteID] = useState();


    useEffect(() => {
        setNewContact(false);
        cleanForm();
    }, [clean])

    const cleanForm = () => {
        setNewContactName("");
        setNewContactLastName("");
        setNewContactEmail("");
        setNewContactPhoneNumber("");

        setNewContactPhoneNumberError(false);
        setNewContactPhoneNumberErrorMessage("");
        setNewContactEmailError(false);
        setNewContactEmailErrorMessage("");
        setNewContactNameError(false);
        setNewContactNameErrorMessage("");
        setNewContactLastNameError(false);
        setNewContactLastNameErrorMessage("");
    }

    const setConfirmData = (id, name) => {
        setDeleteID(id);
        setConfirmTitle("Opravdu odstranit kontaktní osobu?");
        setConfirmText("Opravdu chcete odstranit " + name + " ze seznamu kontaktních osob?");
        setConfirmOpen(true);
      }

    const handleDelete = (id) => {
        axios.delete("http://127.0.0.1:8000/contact/" + id, {headers:{Authorization: "Token " + token}});
        refresh();
    }

    const handleOnNewContactNameChange = (event) => {
        let value = event.target.value;
        setNewContactName(value);
        if(value.length > 0) {
            setNewContactNameError(false);
            setNewContactNameErrorMessage("");
        } else {
            setNewContactNameError(true);
            setNewContactNameErrorMessage("Jméno nevého kontaktu je povinné");
        }
    }

    const handleOnNewContactLastNameChange = (event) => {
        let value = event.target.value;
        setNewContactLastName(value);
        if(value.length > 0) {
            setNewContactLastNameError(false);
            setNewContactLastNameErrorMessage("");
        } else {
            setNewContactLastNameError(true);
            setNewContactLastNameErrorMessage("Příjmení nevého kontaktu je povinné");
        }
    }

    const handleOnNewContactEmailChange = (event) => {
        let value = event.target.value;
        setNewContactEmail(value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(value.length === 0) {
            setNewContactEmailError(true);
            setNewContactEmailErrorMessage("Email nevého kontaktu je povinen");
        } else if(!value.match(re)){
            setNewContactEmailError(true);
            setNewContactEmailErrorMessage("Email je ve špatném tvaru");
        } else {
            setNewContactEmailError(false);
            setNewContactEmailErrorMessage("");
        }
    }

    const handleOnNewContactPhoneNumberChange = (event) => {
        let value = event.target.value;
        setNewContactPhoneNumber(value);
        if(value.length < 0) {
            setNewContactPhoneNumberError(true);
            setNewContactPhoneNumberErrorMessage("Telefonní číslo nevého kontaktu je povinné");
        } else if(!value.match(/^(\+420)?[1-9][0-9]{2}[0-9]{3}[0-9]{3}$/)){
            setNewContactPhoneNumberError(true);
            setNewContactPhoneNumberErrorMessage("Telefonní číslo je ve špatném tvaru");
        } else {
            setNewContactPhoneNumberError(false);
            setNewContactPhoneNumberErrorMessage("");
        }
    }

    const handleAddNewContactPerson = () => {
        setNewContact(true);
    }

    const closeNewContact = () => {
        setNewContact(false);
        cleanForm();
    }

    const addNewContactPerson = () => {
        if(!newContactEmailError && !newContactLastNameError && !newContactNameError 
            && !newContactPhoneNumberError && newContactEmail.length > 0 
            && newContactLastName.length > 0 && newContactName.length > 0 
            && newContactPhoneNumber.length > 0 ) {
                const data = {
                    "name" : newContactName,
                    "surname" : newContactLastName,
                    "phone" : newContactPhoneNumber,
                    "email" : newContactEmail,
                    "company" : ico
                }
                axios.post("http://127.0.0.1:8000/contact/", data, {headers:{Authorization: "Token " + token}});
                refresh();
                closeNewContact();
            }
    }

    return (
        <Card className="company-details-contact-persons comapny-details-card">
        <CardContent>
            <Typography variant="h5" gutterBottom>
                Kontaktní osoby
                <IconButton className="plus-button" size="small" onClick={handleAddNewContactPerson}><AddIcon/></IconButton>
            </Typography>
            {newContact && <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField label="Jméno" value={newContactName} required
                                    onChange={handleOnNewContactNameChange} 
                                    helperText={newContactNameErrorMessage} error={newContactNameError}></TextField>
                            </TableCell>
                            <TableCell>
                                <TextField label="Příjmení" value={newContactLastName} required
                                    onChange={handleOnNewContactLastNameChange} 
                                    helperText={newContactLastNameErrorMessage} error={newContactLastNameError}></TextField>
                            </TableCell>
                            <TableCell>
                                <TextField label="Email" value={newContactEmail} required
                                    onChange={handleOnNewContactEmailChange}
                                    helperText={newContactEmailErrorMessage} error={newContactEmailError}></TextField>
                            </TableCell>
                            <TableCell>
                                <TextField label="Telefonní číslo" value={newContactPhoneNumber} required
                                    onChange={handleOnNewContactPhoneNumberChange}
                                    helperText={newContactPhoneNumberErrorMessage} error={newContactPhoneNumberError}></TextField>
                            </TableCell>
                            <TableCell>
                                <IconButton className="hide-button-shadows" onClick={addNewContactPerson}>
                                    <AddIcon style={{ fill: "green" }}/>
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={closeNewContact} className="hide-button-shadows">
                                    <CancelIcon style={{ fill: "red" }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table> 
            </TableContainer>}

            <TableContainer>
                <Table>
                    <TableBody>
                        {data.map(person => (
                            <TableRow>
                                <TableCell>{person.name + " " + person.surname}</TableCell>
                                <TableCell>{person.email}</TableCell>
                                <TableCell>{person.phone}</TableCell>
                                <TableCell>
                                    <IconButton size="small" className="delete-button" 
                                        onClick={() => setConfirmData( person.id, person.name + " " + person.surname)}>
                                            <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> 
            </TableContainer>
        </CardContent>
        <ConfirmDialog title={confirmTitle} open={confirmOpen} setOpen={setConfirmOpen} 
            onConfirm={() => handleDelete(deleteID)}>
          {confirmText}
        </ConfirmDialog>
      </Card>
    )
}

export default ContactPersons;