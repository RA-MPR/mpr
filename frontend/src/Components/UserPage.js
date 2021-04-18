import { Grid, Paper } from "@material-ui/core";
// eslint-disable-next-line
import UpcomingEvents from "./UpcomingEvents/UpcomingEvents";

import "./UserPage.css";

function UserPage({token}) {

    return (
        <div className="root">
            <Grid container justify="center" spacing={2} style={{width:"100%"}}>
            <Grid item xs={8}>
                <Paper style={{ padding: 16 }}>
                <div className="user-main-screen">
                    Seznam obchodníků
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

export default UserPage;