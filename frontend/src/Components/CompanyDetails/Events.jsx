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

import csLocale from "date-fns/locale/cs";

import "./css/Events.css";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from "@material-ui/pickers"

const Events = ({data}) => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [reminder, setReminder] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleReminderChange = (event) => {
        setReminder(event.target.checked);
    }

    const showNewEvent = () => {
        document.getElementById("eventName").value = "";
        document.getElementById("eventDesc").value = "";
        setSelectedDate(new Date());
        setSelectedTime(new Date());
        setReminder(false);
        document.getElementById("addEvent").classList.add("show");
    }

    const hideNewEvent = () => {
        document.getElementById("addEvent").classList.remove("show");
    }

    return (
        <Card className="company-details-events comapny-details-card">
            <CardContent>
                <Typography variant="h4">
                    Události
                    <IconButton className="plus-button" size="small" onClick={showNewEvent}><AddIcon/></IconButton>    
                </Typography>
                <TableContainer>
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
                                                        checked={reminder}
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
                                                <Button variant="contained" color="primary">
                                                    Uložit
                                                </Button>
                                            </div>
                                        </div>         
                                    </TableCell>
                                </MuiPickersUtilsProvider>
                            </TableRow>
                            {data.map(event => (
                                <TableRow>
                                    <TableCell>
                                        <div className="grid">
                                            <div className="name">
                                                <Typography variant="h6">
                                                    {event.name}
                                                </Typography>
                                            </div>
                                            <div className="date">
                                                {event.date + " " + event.time}
                                            </div>
                                            <div className="delete-button">
                                                <IconButton size="small"><DeleteIcon/></IconButton>
                                            </div>
                                            <div className="description">
                                                {event.description}
                                            </div>
                                            <div className="reminder">
                                                {event.reminder && <IconButton className="reminder-button" size="small"><CheckIcon/></IconButton>}
                                                {!event.reminder &&  <IconButton className="reminder-button" size="small"><CloseIcon/></IconButton>}
                                            </div>
                                        </div>                                        
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}

export default Events;