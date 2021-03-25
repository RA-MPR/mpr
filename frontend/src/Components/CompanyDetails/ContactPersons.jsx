import { Card, CardContent } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core"

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import "./css/ContactPersons.css"

const ContactPersons = ({data}) => {

    const handleDelete = (id) => {

    }

    return (
        <Card className="company-details-contact-persons comapny-details-card">
        <CardContent>
            <Typography variant="h4" gutterBottom>
                Kontaktní osoby
                <IconButton className="plus-button" size="small" ><AddIcon/></IconButton>
            </Typography>
            <TableContainer>
                <Table>
                    <TableBody>
                        {data.map(person => (
                            <TableRow>
                                <TableCell>{person.name}</TableCell>
                                <TableCell>{person.email}</TableCell>
                                <TableCell>{person.phoneNumber}</TableCell>
                                <TableCell><IconButton size="small" className="delete-button" onClick={handleDelete(person.id)}><DeleteIcon/></IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> 
            </TableContainer>
        </CardContent>
      </Card>
    )
}

export default ContactPersons;