import { Dialog, DialogContent } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { Grid } from "@material-ui/core"
import { Button } from "@material-ui/core"
import { TextField } from "@material-ui/core"
import { Select, MenuItem } from "@material-ui/core"
import { useState, useEffect, useRef } from "react"

import axios from "axios"

import "./css/StatusChange.css"

const StatusChange = ({ico, companyName, companyStatus, companyStatusColor, open, onClose}) => {

const [status, setStatus] = useState("Osloveno");
const [statusColor, setStatusColor] = useState("orange");
const customStatusPicker = useRef();

const [newStatus, setNewStatus] = useState("Vlastní");

const knownStatuses = ["Osloveno", "Uzavřeno", "Odmítnuto"]

const close = () => {
    onClose();
}

useEffect(() => {
    if(open) {
        if(!knownStatuses.includes(companyStatus)) {
            setNewStatus(companyStatus);
            setStatus("Vlastní");
            setStatusColor(companyStatusColor);
        } else {
            setStatus(companyStatus);
            setStatusColor(companyStatusColor);
            setNewStatus("Vlastní");

        }
    }
     
}, [open])



const saveAndClose = () => {

    if(status === "Vlastní") {
        axios.put('http://0.0.0.0:8000/company/'+ico+"/", {
            "status": newStatus,
            "status_color": statusColor
        });
    } else {
        axios.put('http://0.0.0.0:8000/company/'+ico+"/", {
            "status": status,
            "status_color": statusColor
        });
    }
 
    close()
}

const handleOnChangeStatus = (event) => {
    setStatus("Vlastní");
    setStatusColor("white");
    customStatusPicker.current.classList.add("hide");
    switch (event.target.value) {
        case "Osloveno":
            setStatus("Osloveno");
            setStatusColor("orange");
            break;
        case "Uzavřeno":
            setStatus("Uzavřeno");
            setStatusColor("green");
            break;
        case "Odmítnuto":
            setStatus("Odmítnuto");
            setStatusColor("red");
            break;

        case "Vlastní":
            customStatusPicker.current.classList.remove("hide");
            setStatus("Vlastní");
            setStatusColor("white");
            break;
  
    }
}

return (

        <Dialog id="company-status-change" open={open} fullWidth  maxWidth="md">
            <DialogContent className="content"> 
                <Typography variant="h3">Změna stavu</Typography>
                <Grid container >
                    <Grid item xs={6}>
                    <Typography variant="h5">{companyName}</Typography>
                        <Select className="status-picker" value={status} 
                            onChange={handleOnChangeStatus} style={{backgroundColor: statusColor}}>
                            <MenuItem selected value="Osloveno" style={{backgroundColor: "orange"}}>
                                Osloveno
                            </MenuItem>
                            <MenuItem value="Uzavřeno" style={{backgroundColor: "green"}}>
                                Uzavřeno
                            </MenuItem>
                            <MenuItem value="Odmítnuto" style={{backgroundColor: "red"}}>
                                Odmítnuto
                            </MenuItem>
                            <MenuItem value="Vlastní" >
                                {newStatus}
                            </MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6} container direction="row" alignItems="center" justify="flex-end">
                        <Button onClick={onClose} className="cancel-button">Zrušit</Button>
                        <Button onClick={saveAndClose} className="save-button">Uložit</Button>
                    </Grid>
                </Grid>
                <div id="custom-status" ref={customStatusPicker} className={!knownStatuses.includes(companyStatus)? "":"hide"}>
                    <Typography variant="h4">Nový stav</Typography>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="h5">Název</Typography>
                            <TextField value={newStatus} onChange={e => setNewStatus(e.target.value)} className="new-status-name"></TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5">Barva</Typography>
                            <Grid container className="new-status-colors-buttons" spacing={1}>
                                <Grid item xs={3}>
                                    <Button onClick={() => setStatusColor("white")} 
                                        style={{backgroundColor: "white", color: "blue", border: "2px blue solid"}}>
                                        Bílá
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button onClick={() => setStatusColor("yellow")} 
                                    style={{backgroundColor: "yellow", color: "blue"}}>
                                        Žlutá
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button onClick={() => setStatusColor("green")} style={{backgroundColor: "green"}}>
                                        Zelená
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button onClick={() => setStatusColor("purple")} style={{backgroundColor: "purple"}}>
                                        Fialová
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button onClick={() => setStatusColor("orange")} style={{backgroundColor: "orange"}}>
                                        Oranžová
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button onClick={() => setStatusColor("red")} style={{backgroundColor: "red"}}>
                                        Červená
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button onClick={() => setStatusColor("blue")} style={{backgroundColor: "blue"}}>
                                        Modrá
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button onClick={() => setStatusColor("pink")} style={{backgroundColor: "pink"}}>
                                        Růžová
                                    </Button>
                                </Grid>
                                {/* <Grid item container direction="row" alignItems="center" justify="flex-end">
                                    <Button className="add-button">Přidat</Button>
                                </Grid> */}
                                
                            </Grid>
                        </Grid>
                    </Grid>        
                </div>
                       
            </DialogContent>

        </Dialog>
    )
} 
export default StatusChange;