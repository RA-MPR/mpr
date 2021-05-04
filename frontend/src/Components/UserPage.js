import { Grid, Paper } from "@material-ui/core";
// eslint-disable-next-line
import UpcomingEvents from "./UpcomingEvents/UpcomingEvents";
import UserList from "./UserList/UserList"; 
import UserFormDialog from "./UserFormDialog/UserFormDialog";
import React, {useState, useEffect, useRef} from 'react'

import "./UserPage.css";
import UserDetail from "./UserDetail/UserDetail";

import {useHistory} from "react-router-dom";

function UserPage({token, componentToShow, userDetailId, setUserDetailId, detailIco, setDetailIco}) {

    const history = useHistory();

    const [userName, setUserName] = useState("");
    const [userSurname, setUserSurname] = useState("");

    const [showDialog, setShowDialog] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const showAddForm = () => {
        setShowDialog(true);
    }

    const showEditForm = (id) => {

    }

    const onShowCompanyDetail = (ico) => {
        if(ico == detailIco){
            history.push('/company/detail');
        }else{
            setDetailIco(ico);
        }
    }
    
    const showUserDetail = (id, name, surname) => {
        setUserName(name);
        setUserSurname(surname);
        if(id === userDetailId){
            history.push('/users/detail');
        }else{
            setUserDetailId(id);
        }
    }

    const showUserList = () => {
        setRefresh(!refresh);
        history.push('/users');
    }

    const isMounted = useRef(false);
    useEffect(() => {
        if(isMounted.current){
            history.push('/users/detail');
        }else{
        isMounted.current = true;
        }
    }, [userDetailId]);

    const isMounted2 = useRef(false);
    useEffect(() => {
        if(isMounted2.current){
        history.push('/company/detail');
        }else{
        isMounted2.current = true;
        }
    }, [detailIco]);

    return (
        <div className="root">
            <Grid container justify="center" spacing={2} style={{width:"100%"}}>
            <Grid item xs={8}>
                <Paper style={{ padding: 16 }}>
                    <div className="user-main-screen">
                        <UserFormDialog token={token} setOpen={setShowDialog} open={showDialog}  refreshUsers={setRefresh} />
                        {componentToShow === "userList" && <UserList token={token} onAdd={showAddForm} onEdit={showEditForm} refresh={refresh} onShowDetail={showUserDetail}/>}
                        {componentToShow === "userDetail" && <UserDetail token={token} onRefresh={refresh} onClose={showUserList} onShowCompanyDetail={onShowCompanyDetail} userId={userDetailId} userName={userName} userSurname={userSurname}/>}
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