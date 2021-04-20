import React, {useState, useEffect, useRef} from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Switch,
    FormControlLabel,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
  } from "@material-ui/core";

import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers"

import axios from "axios";

import DateFnsUtils from "@date-io/date-fns";
import { format, parse } from "date-fns";

import csLocale from "date-fns/locale/cs";

const EventDialog = ({date, open, setOpen, isEditing, eventId, token, refreshEvents}) => {

    const [companies, setCompanies] = useState([]);
    const [selectedName, setSelectedName] = useState("");
    const [selectedDesc, setSelectedDesc] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [selectedCompany, setSelectedCompany] = useState("");
    const [reminder, setReminder] = useState(true);

    const isMounted = useRef(false);
    useEffect(() => {
        const getData = async() => {
            const companiesFromServer = await fetchCompanies();
            if(isEditing && eventId > 0){
                const eventToEdit = await fetchEvent();
                setEditValues(eventToEdit);
            }
            
            setCompanies(companiesFromServer);
            
        }
        getData();

    }, [isEditing, eventId]);

    const fetchEvent = async() => {
        return axios.get("http://127.0.0.1:8000/event/"+eventId,
        {headers: { Authorization: "Token " + token }}).then((res) => res.data);
    }

    const fetchCompanies = async() => {
        return axios.get("http://127.0.0.1:8000/user/companies",
        {headers: { Authorization: "Token " + token }}).then((res) => res.data);
    }

    const setEditValues = (eventToEdit) => {
        if(eventToEdit !== undefined && eventToEdit !== null){
            setSelectedName(eventToEdit.name);
            setSelectedDesc(eventToEdit.description);
            setSelectedDate(eventToEdit.date);
            setSelectedTime(parse(eventToEdit.time, "HH:mm:ss", new Date()));
            setReminder(eventToEdit.reminder);
            setSelectedCompany(eventToEdit.company);
        }
    }

    const clearValues = () => {
        setSelectedName("");
        setSelectedDesc("");
        setSelectedDate(new Date());
        setSelectedTime(new Date());
        setReminder(true);
        setSelectedCompany("");
    }

    const handleNameChange = (event) => {
        setSelectedName(event.target.value);
    }

    const handleDescChange = (event) => {
        setSelectedDesc(event.target.value);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    
    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleReminderChange = () => {
        setReminder(!reminder);
    };

    const handleCompanyChange = (event) => {
        setSelectedCompany(event.target.value);
    }

    const handleSave = (event) => {
        event.preventDefault();

        if(isEditing){
            axios.put("http://127.0.0.1:8000/event/" + eventId + "/",{
                name: selectedName,
                description: selectedDesc,
                date: format(parse(event.target.datePicker.value, "dd.MM.yyyy", new Date()), "yyyy-MM-dd"),
                time: event.target.timePicker.value + ":00",
                company: selectedCompany,
                reminder: reminder
            },{headers: { Authorization: "Token " + token }}
            ).then(() => {
                setOpen(false);
                clearValues();
                if(refreshEvents) refreshEvents((prev) => !prev);
            });
        }else{
            axios.post("http://127.0.0.1:8000/event/",{
                name: selectedName,
                description: selectedDesc,
                date: format(parse(event.target.datePicker.value, "dd.MM.yyyy", new Date()), "yyyy-MM-dd"),
                time: event.target.timePicker.value + ":00",
                company: selectedCompany,
                reminder: reminder
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
            <Dialog open={open} onClose={() => setOpen(false)} className="dialog-event-form">
                <form onSubmit={handleSave}>
                    <DialogTitle >
                        { !isEditing ? "Nová událost" : "Upravit událost" }
                    </DialogTitle>
                    <DialogContent className="event-form-content">
                        <TextField
                            fullWidth
                            label="Název"
                            required
                            value={selectedName}
                            margin='normal'
                            onChange={handleNameChange}/>
                        <TextField
                            fullWidth
                            label="Popis"
                            required
                            value={selectedDesc}
                            margin='normal'
                            onChange={handleDescChange}/>
                        <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={csLocale}
                        >
                            <KeyboardDatePicker
                                className="date-picker-event"
                                variant="inline"
                                format="dd.MM.yyyy"
                                id="datePicker"
                                name="datePicker"
                                KeyboardButtonProps={{ size: "small" }}
                                value={selectedDate}
                                onChange={handleDateChange}
                                required
                                fullWidth
                                margin='normal'
                            />
                            <KeyboardTimePicker
                                className="date-picker-event"
                                variant="inline"
                                format="HH:mm"
                                ampm={false}
                                id="timePicker"
                                name="timePicker"
                                KeyboardButtonProps={{ size: "small" }}
                                value={selectedTime}
                                onChange={handleTimeChange}
                                required
                                fullWidth
                                margin='normal'
                            />
                        </MuiPickersUtilsProvider>
                        <FormControl fullWidth>
                            <InputLabel>Firma*</InputLabel>
                            <Select
                                required
                                id="company"
                                name="company"
                                onChange={handleCompanyChange}
                                value={selectedCompany}
                                fullWidth
                            >
                                {companies.map((company) => (
                                    <MenuItem key={company.ico} value={company.ico}>{company.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className="switch-buttons">
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={reminder}
                                    onChange={handleReminderChange}
                                    name="reminder"
                                    color="primary"
                                />
                                }
                                label="Upozornění"
                            />
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
                        </div>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    )
}

export default EventDialog
