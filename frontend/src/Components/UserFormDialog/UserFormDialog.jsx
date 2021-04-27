import React, {useState, useEffect, useRef} from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
  } from "@material-ui/core";

import axios from "axios";

import DateFnsUtils from "@date-io/date-fns";

import csLocale from "date-fns/locale/cs";

const UserFormDialog = ({ open, setOpen, token, refreshUsers}) => {

    const [selectedName, setSelectedName] = useState("");
    const [selectedSurname, setSelectedSurname] = useState("");
    const [selectedEmail, setSelectedEmail] = useState("");
    const [selectedPassword, setSelectedPassword] = useState("");
    const [selectedPasswordCheck, setSelectedPasswordCheck] = useState("");
    const [selectedPhone, setSelectedPhone] = useState("");

    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("")
    const [phoneError, setPhoneError] = useState(false);
    const [phoneErrorMessage, setPhoneErrorMessage] = useState("")


    const clearValues = () => {
        setSelectedName("");
        setSelectedSurname("");
    }

    const handleNameChange = (event) => {
        setSelectedName(event.target.value);
    }

    const handleSurnameChange = (event) => {
        setSelectedSurname(event.target.value);
    }
    
    const handleEmailChange = (event) => {
        setSelectedEmail(event.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setEmailError(false);
        setEmailErrorMessage("");
        if(!event.target.value.match(re)){
            setEmailError(true);
            setEmailErrorMessage("Email je ve špatném tvaru");
        }
    }

    const handlePhoneChange = (event) => {
        setSelectedPhone(event.target.value);
        const re = /^(\+420)?[1-9][0-9]{2}[0-9]{3}[0-9]{3}$/;
        setPhoneError(false);
        setPhoneErrorMessage("");
        if(!event.target.value.match(re)){
            setPhoneError(true);
            setPhoneErrorMessage("Telefónni číslo je ve špatném tvaru");
        }
    }

    const handlePasswordChange = (event) => {
        setSelectedPassword(event.target.value);
    }

    const handlePasswordCheckChange = (event) => {
        setSelectedPasswordCheck(event.target.value);
        setPasswordError(false);
        setPasswordErrorMessage("");
        if(selectedPassword !== event.target.value) {
            setPasswordError(true);
            setPasswordErrorMessage("Heslá se nezhodují");
        }
    }

    const handleSave = (event) => {
        event.preventDefault();

        let error = emailError || passwordError;

        if(!error) {

            axios.post("/api/user/register/",{
                name: selectedName,
                surname: selectedSurname,
                password: selectedPassword,
                password2: selectedPassword,
                phone: selectedPhone,
                email: selectedEmail
            },{headers: { Authorization: "Token " + token }}
            ).then(() => {
                setOpen(false);
                clearValues();
                if(refreshUsers) refreshUsers((prev) => !prev);
            });
            
        }
    }

    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} className="dialog-user-form">
                <form onSubmit={handleSave}>
                    <DialogTitle >
                        Nový užívatel
                    </DialogTitle>
                    <DialogContent className="user-form-content">
                        <TextField
                            fullWidth
                            label="Jméno"
                            required
                            value={selectedName}
                            margin='normal'
                            onChange={handleNameChange}/>
                        <TextField
                            fullWidth
                            label="Příjmení"
                            required
                            value={selectedSurname}
                            margin='normal'
                            onChange={handleSurnameChange}/>
                        <TextField
                            fullWidth
                            label="Email"
                            error={emailError}
                            helperText={emailErrorMessage}
                            required
                            value={selectedEmail}
                            margin='normal'
                            onChange={handleEmailChange}/>
                        <TextField
                            fullWidth
                            label="Telefón"
                            error={phoneError}
                            helperText={phoneErrorMessage}
                            required
                            value={selectedPhone}
                            margin='normal'
                            onChange={handlePhoneChange}/>
                        <TextField
                            fullWidth
                            label="Heslo"
                            required
                            error={passwordError}
                            type="password"
                            value={selectedPassword}
                            margin='normal'
                            onChange={handlePasswordChange}/>
                        <TextField
                            fullWidth
                            label="Potvrzení hesla"
                            required
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            type="password"
                            value={selectedPasswordCheck}
                            margin='normal'
                            onChange={handlePasswordCheckChange}/>
                        <div>
                            <Button
                                onClick={() => {setOpen(false); clearValues()}}
                            >
                                Zrušit
                            </Button>
                            <Button
                                type="submit"
                                color='primary'
                            >
                                Uložit
                            </Button>
                        </div>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    )
}

export default UserFormDialog
