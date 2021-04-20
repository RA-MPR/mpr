import { Grid, Paper } from "@material-ui/core";
// eslint-disable-next-line
import UpcomingEvents from "./UpcomingEvents/UpcomingEvents";

import {useState } from "react";

import "./CalendarPage.css";
import EventsOfTheDay from "./Calendar/EventsOfTheDay";
import EventDialog from "./Calendar/EventDialog";

function CalendarPage({token}) {
    const [openDay, setOpenDay] = useState(false);
    const [eventId, setEventId] = useState(-1);
    const [editing, setEditing] = useState(false);
    const [openForm ,setOpenForm] = useState(true);

    const date = "2021-04-29"; //expected format of date for eventsoftheday

    return (
        <div className="root">
            <EventsOfTheDay date={date} token={token} open={openDay} setOpen={setOpenDay}/>
            <EventDialog eventId={eventId} isEditing={editing} date={date} token={token} open={openForm} setOpen={setOpenForm} />
            <Grid container justify="center" spacing={2} style={{width:"100%"}}>
            <Grid item xs={8}>
                <Paper style={{ padding: 16 }}>
                <div className="calendar-main-screen">
                    Kalendář
                </div>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Grid item xs={12}>
                <Paper style={{ padding: 16 }}>
                <UpcomingEvents token={token} height="80.5vh"/>
                </Paper>
                </Grid>
            </Grid>
            </Grid>
        </div>
    );
}

export default CalendarPage;