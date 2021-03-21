import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"

const Events = ({data}) => {

    const addEvent = () => {

    }

    return (
        <div>
            <div className="events">
                <Typography variant="h4">Aktivity</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Datum</TableCell>
                                <TableCell>Název</TableCell>
                                <TableCell>Popis</TableCell>
                                <TableCell>Připomínka</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(event => (
                                <TableRow>
                                    <TableCell>{event.date}</TableCell>
                                    <TableCell>{event.name}</TableCell>
                                    <TableCell>{event.description}</TableCell>
                                    <TableCell>
                                        {event.reminder && <CheckIcon/>}
                                        {!event.reminder && <CloseIcon/>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className="company-details-event-footer">
                <Button className="company-details-add-event-button" variant="contained" onClick={addEvent}>+ Nová</Button>
            </div>
        </div>
    )
}

export default Events;