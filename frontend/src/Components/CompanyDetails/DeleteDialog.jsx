import { Button, DialogActions, DialogContentText, DialogContent } from "@material-ui/core"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import React from "react"

const DeleteDialog = ({companyName}) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        // TODO
    };

    return (
        <div>
            <Button onClick={handleOpen} className="company-details-delete-button" variant="contained">Smazat</Button>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Potvrzení</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Opravdu chcete zmazat <strong>{companyName}</strong>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete}>Ano</Button>
                    <Button onClick={handleClose}>Ne</Button>
                </DialogActions>
            </Dialog>
        </div>
      
    );
  }
  export default DeleteDialog; 