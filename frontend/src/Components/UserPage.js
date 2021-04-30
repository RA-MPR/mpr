import { Grid, Paper } from "@material-ui/core";
// eslint-disable-next-line
import UpcomingEvents from "./UpcomingEvents/UpcomingEvents";
import UserList from "./UserList/UserList"; 
import UserFormDialog from "./UserFormDialog/UserFormDialog";
import React, {useState} from 'react'

import "./UserPage.css";

function UserPage({token}) {

    const [showDialog, setShowDialog] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const showAddForm = () => {
        setShowDialog(true);
    }

    const showEditForm = (id) => {

    }

    return (
        <div className="root">
            <Grid container justify="center" spacing={2} style={{width:"100%"}}>
            <Grid item xs={8}>
                <Paper style={{ padding: 16 }}>
                    <div className="user-main-screen">
                        <UserFormDialog token={token} setOpen={setShowDialog} open={showDialog}  refreshUsers={setRefresh} />
                        <UserList className="user-module" token={token} onAdd={showAddForm} onEdit={showEditForm} refresh={refresh}/>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Grid item xs={12}>
                <Paper style={{ padding: 16 }}>
                <UpcomingEvents token={token} maxHeight="100%" height="calc(-50px + 84vh)"/>
                </Paper>
                </Grid>
            </Grid>
            </Grid>
        </div>
    );
}

export default UserPage;