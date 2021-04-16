import { Grid, Paper } from "@material-ui/core";
// eslint-disable-next-line
import ContactList from "./ContactList/ContactList";
import UpcomingEvents from "./UpcomingEvents/UpcomingEvents";

import {useState } from "react";

import "./ContactPage.css";

function ContactPage({token}) {

    

    return (
        <div className="root">
            <Grid container justify="center" spacing={2} style={{width:"100%"}}>
            <Grid item xs={8}>
                <Paper style={{ padding: 16 }}>
                <div className="contact-main-screen">
                    <ContactList className="contact-module" token={token}/>
                </div>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Grid item xs={12}>
                <Paper style={{ padding: 16 }}>
                    <h1>Graf</h1>
                </Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper style={{ padding: 16 }}>
                <UpcomingEvents token={token} />
                </Paper>
                </Grid>
            </Grid>
            </Grid>
        </div>
    );
}

export default ContactPage;