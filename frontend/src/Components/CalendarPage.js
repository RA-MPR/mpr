import { Grid, Paper } from "@material-ui/core";
// eslint-disable-next-line
import UpcomingEvents from "./UpcomingEvents/UpcomingEvents";

import {useState } from "react";

import "./CalendarPage.css";
import EventsOfTheDay from "./Calendar/EventsOfTheDay";

function CalendarPage({token}) {
    const [openDay, setOpenDay] = useState(false);
    
    const date = "2021-04-29"; //expected format of date for eventsoftheday

    return (
        <div className="root">
            <EventsOfTheDay date={date} token={token} open={openDay} setOpen={setOpenDay}/>
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
                <UpcomingEvents token={token} height="790px"/>
                </Paper>
                </Grid>
            </Grid>
            </Grid>
        </div>
    );
}

export default CalendarPage;