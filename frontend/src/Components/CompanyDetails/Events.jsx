import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Button from "@material-ui/core/Button"

import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"

import "./Events.css"

const Events = ({data}) => {

    const addEvent = () => {

    }

    return (
        <div className="events">
            <h2>Aktivity</h2>
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
            <Button className="company-details-add-event-button" variant="contained" onClick={addEvent}>+ Nová</Button>
        </div>
    )
}

export default Events;