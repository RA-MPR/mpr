import React, {useState} from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Card,
    CardContent,
    Checkbox,
    Button
} from "@material-ui/core";

import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import FormControlLabel from '@material-ui/core/FormControlLabel';

import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import DateFnsUtils from "@date-io/date-fns";
import { format, parse } from "date-fns";

import csLocale from "date-fns/locale/cs";

import axios from "axios";

import ConfirmDialog from "./ConfirmDialog";

import "./css/Events.css";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from "@material-ui/pickers"

const Events = ({data, ico, fetchEvents, setEvents, token, refreshUpcoming}) => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [checked, setChecked] = useState(false);
    const [deleteId, setDeleteId] = useState(-1);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleConfirmOpen = (eventId) => {
        setDeleteId(eventId);
        setConfirmOpen(true);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleReminderChange = (event) => {
        setChecked(event.target.checked);
    }

    const showNewEvent = () => {
        document.getElementById("eventName").value = "";
        document.getElementById("eventDesc").value = "";
        setSelectedDate(new Date());
        setSelectedTime(new Date());
        setChecked(false);
        document.getElementById("addEvent").classList.add("show");
    }

    const hideNewEvent = () => {
        document.getElementById("addEvent").classList.remove("show");
    }

    const loadNewData = async() => {
        const eventsData = await fetchEvents();
        setEvents(eventsData.filter((event) => event.company === ico));
    }

    const handleAddEvent = (event) => {
        event.preventDefault();

        var date = parse(event.target.datePicker.value, "dd.MM.yyyy", new Date());
        var formattedDate = format(date, "yyyy-MM-dd");

        axios.post("http://127.0.0.1:8000/event/", {
            name: event.target.eventName.value,
            date: formattedDate,
            time: event.target.timePicker.value+":00",
            description: event.target.eventDesc.value,
            company: ico,
            reminder: checked
        },{headers:{Authorization: "Token " + token}})
        .then(function (response) {
            hideNewEvent();
            loadNewData();
            refreshUpcoming((prev) => !prev);
        })
    }

    const handleDeleteEvent = () => {
        axios.delete("http://127.0.0.1:8000/event/"+deleteId, {headers:{Authorization: "Token " + token}})
        .then(function (response){
            loadNewData();
            refreshUpcoming((prev) => !prev);
        })
    }

    return (
        <Card className="company-details-events comapny-details-card">
            <CardContent>
                <ConfirmDialog
                    title="Odstranění události!"
                    open={confirmOpen}
                    setOpen={setConfirmOpen}
                    onConfirm={() =>
                        handleDeleteEvent()
                    }
                >
                    Chcete tuto událost odstranit ze systému?
                </ConfirmDialog>
                <Typography variant="h5">
                    Události
                    <IconButton className="plus-button" size="small" onClick={showNewEvent}><AddIcon/></IconButton>    
                </Typography>
                <form onSubmit={handleAddEvent}>
                    <TableContainer className="events-table">
                        <Table>
                            <TableBody>
                                <TableRow key={"addEvent"} id="addEvent" className="eventAdd">
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                        locale={csLocale}
                                    >
                                        <TableCell>
                                            <div className="new-grid">
                                                <div className="name">
                                                    <TextField
                                                        label="Název"
                                                        name="eventName"
                                                        id="eventName"
                                                        autoFocus
                                                        required
                                                    />
                                                </div>
                                                <div className="date">
                                                    <KeyboardDatePicker
                                                        className="datePickerEvent"
                                                        variant="inline"
                                                        format="dd.MM.yyyy"
                                                        id="datePicker"
                                                        name="datePicker"
                                                        KeyboardButtonProps={{ size: "small" }}
                                                        value={selectedDate}
                                                        onChange={handleDateChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="description">
                                                    <TextField
                                                        label="Popis"
                                                        name="eventDesc"
                                                        id="eventDesc"
                                                        autoFocus
                                                        required
                                                    />
                                                </div>
                                                <div className="time">
                                                    <KeyboardTimePicker
                                                        className="datePickerEvent"
                                                        variant="inline"
                                                        ampm={false}
                                                        id="timePicker"
                                                        name="timePicker"
                                                        KeyboardButtonProps={{ size: "small" }}
                                                        value={selectedTime}
                                                        onChange={handleTimeChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="check-reminder">
                                                    <FormControlLabel
                                                        control={
                                                        <Checkbox
                                                            checked={checked}
                                                            onChange={handleReminderChange}
                                                            color="primary"
                                                            size="medium"
                                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                                        />
                                                        }
                                                        label="Připomínka"
                                                    />
                                                </div>
                                                <div className="new-event-buttons">
                                                    <Button variant="contained" style={{ backgroundColor:"#ff5757", color:"white"}} onClick={hideNewEvent}>
                                                        Zrušit
                                                    </Button>
                                                    <Button type="submit" variant="contained" color="primary">
                                                        Uložit
                                                    </Button>
                                                </div>
                                            </div>         
                                        </TableCell>
                                    </MuiPickersUtilsProvider>
                                </TableRow>
                                {data.map(event => (
                                    <TableRow key={event.id}>
                                        <TableCell>
                                            <div className="grid">
                                                <div className="name">
                                                    <Typography variant="h6">
                                                        {event.name}
                                                    </Typography>
                                                </div>
                                                <div className="date">
                                                    {format(parse(event.date, "yyyy-MM-dd", new Date()), "dd.MM.yyyy") + ", " +
                                                     format(parse(event.time, "HH:mm:ss", new Date()), "HH:mm")}
                                                </div>
                                                <div >
                                                    <IconButton className="delete-button" size="small" onClick={() => {handleConfirmOpen(event.id)}}><DeleteIcon/></IconButton>
                                                </div>
                                                <div className="description">
                                                    {event.description}
                                                </div>
                                                <div className="reminder">
                                                    {event.reminder && <IconButton className="checked-button" size="small"><CheckIcon/></IconButton>}
                                                    {!event.reminder &&  <IconButton className="checked-button" size="small"><CloseIcon/></IconButton>}
                                                </div>
                                            </div>                                        
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </form>
            </CardContent>
        </Card>
    )
}

export default Events;