import { Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { Card, CardContent } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"

import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import "./css/Events.css";

const Events = ({data}) => {

    return (
        <Card className="company-details-events comapny-details-card">
            <CardContent>
                <Typography variant="h4">
                    Události
                    <IconButton className="plus-button" size="small" ><AddIcon/></IconButton>    
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {data.map(event => (
                                <TableRow>
                                    <TableCell>
                                        <div className="grid">
                                            <div className="name">
                                                {event.name}
                                            </div>
                                            <div className="date">
                                                {event.date}
                                            </div>
                                            <div className="delete-button">
                                                <IconButton size="small"><DeleteIcon/></IconButton>
                                            </div>
                                            <div className="description">
                                                {event.description}
                                            </div>
                                            <div className="reminder">
                                                {event.reminder && <IconButton className="reminder-button" size="small"><CheckIcon/></IconButton>}
                                                {!event.reminder &&  <IconButton className="reminder-button" size="small"><CloseIcon/></IconButton>}
                                            </div>
                                        </div>                                        
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}

export default Events;