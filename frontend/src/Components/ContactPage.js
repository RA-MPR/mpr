import { Grid, Paper } from "@material-ui/core";
// eslint-disable-next-line
import ContactList from "./ContactList/ContactList";

import {useState } from "react";

import "./ContactPage.css";

function ContactPage() {

    //SUPERUSER TOKEN FOR TESTING
    const [token,setToken] = useState("e8998b44fb91858489c28d07b2dee64b7db21f63");

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
                    <h1>připomínky</h1>
                </Paper>
                </Grid>
            </Grid>
            </Grid>
        </div>
    );
}

export default ContactPage;