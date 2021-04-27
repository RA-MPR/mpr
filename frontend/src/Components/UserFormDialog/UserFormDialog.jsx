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

const UserFormDialog = ({ open, setOpen, isEditing, userId, token, refreshUsers}) => {

    const [selectedName, setSelectedName] = useState("");
    const [selectedSurname, setSelectedSurname] = useState("");
    const [selectedEmail, setSelectedEmail] = useState("");
    const [selectedPassword, setSelectedPassword] = useState("");
    const [selectedPasswordCheck, setSelectedPasswordCheck] = useState("");
 
    useEffect(() => {
        const getData = async() => {
            if(isEditing && eventId > 0){
                const userToEdit = await fetchUser();
                setEditValues(userToEdit);
            }            
        }
        getData();

    }, [isEditing, eventId]);

    const fetchUser = async() => {
        return axios.get("/api/usert/"+eventUser,
        {headers: { Authorization: "Token " + token }}).then((res) => res.data);
    }

    const setEditValues = (userToEdit) => {
        if(userToEdit !== undefined && userToEdit !== null){
            setSelectedName(userToEdit.name);
        }
    }

    const clearValues = () => {
        setSelectedName("");
    }

    const handleNameChange = (event) => {
        setSelectedName(event.target.value);
    }

    const handleSurnameChange = (event) => {
        setSelectedSurname(event.target.value);
    }
    
    const handleEmailChange = (event) => {
        setSelectedEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setSelectedPassword(event.target.value);
    }

    const handlePasswordCheckChange = (event) => {
        setSelectedPasswordCheck(event.target.value);
    }

    const handleSave = (event) => {
        event.preventDefault();

        if(isEditing){
            axios.put("/api/user/" + userId + "/",{
                name: selectedName,
                surname: selectedSurname
            },{headers: { Authorization: "Token " + token }}
            ).then(() => {
                setOpen(false);
                clearValues();
                if(refreshEvents) refreshEvents((prev) => !prev);
            });
        }else{
            axios.post("/api/user/",{
                name: selectedName,
                surname: selectedSurname
            },{headers: { Authorization: "Token " + token }}
            ).then(() => {
                setOpen(false);
                clearValues();
                if(refreshEvents) refreshEvents((prev) => !prev);
            });
        }
    }

    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} className="dialog-user-form">
                <form onSubmit={handleSave}>
                    <DialogTitle >
                        { !isEditing ? "Nový užívatel" : "Upravit uživatele" }
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
                            required
                            value={selectedEmail}
                            margin='normal'
                            onChange={handleEmailChange}/>
                        <TextField
                            fullWidth
                            label="Heslo"
                            required
                            type="password"
                            value={selectedPassword}
                            margin='normal'
                            onChange={handlePasswordChange}/>
                        <TextField
                            fullWidth
                            label="Potvrzení hesla"
                            required
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
