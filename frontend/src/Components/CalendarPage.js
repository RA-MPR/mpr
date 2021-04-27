import { Grid, Paper } from "@material-ui/core";
// eslint-disable-next-line
import UpcomingEvents from "./UpcomingEvents/UpcomingEvents";

import {useState } from "react";

import "./CalendarPage.css";
import EventsOfTheDay from "./Calendar/EventsOfTheDay";
import Calendar from "./Calendar/Calendar"

function CalendarPage({token}) {
    const [openDay, setOpenDay] = useState(false);
    const [refreshOrders, setRefreshOrders] = useState(false);
    const [refresh ,setRefresh] = useState(false);
    const [date, setDate] = useState("2021-04-29");
  
   const refreshCalendar = () => {
        setRefresh(!refresh);
    }

    return (
        <div className="root">
            <EventsOfTheDay date={date} token={token} open={openDay} setOpen={setOpenDay} refreshEvents={setRefreshOrders} refreshCalendar={refreshCalendar}/>
            <Grid container justify="center" spacing={2} style={{width:"100%"}}>
            <Grid item xs={8}>
                <Paper style={{ padding: 16 }}>
                <div className="calendar-main-screen">
                    <Calendar token={token} openEventsOfTheDay={setOpenDay} date={setDate} refresh={refresh} />
                </div>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Grid item xs={12}>
                <Paper style={{ padding: 16 }}>
                <UpcomingEvents upcomingRefresh={refreshOrders} token={token} height="80.5vh"/>
                </Paper>
                </Grid>
            </Grid>
            </Grid>
        </div>
    );
}

export default CalendarPage;