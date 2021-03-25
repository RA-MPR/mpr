import { Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { Card, CardContent } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import "./css/Orders.css"

const Orders = ({data}) => {
    return (
        <Card className="company-details-orders comapny-details-card">
            <CardContent>
                <Typography variant="h4">
                    Podepsané objednávky
                    <IconButton className="plus-button" size="small" ><AddIcon/></IconButton>
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {data.map(order => (
                                <TableRow>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>{order.contractNumber}</TableCell>
                                    <TableCell>{order.state}</TableCell>
                                    <TableCell>{order.sum}&nbsp;Kč</TableCell>
                                    <TableCell><IconButton className="delete-button"><DeleteIcon/></IconButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}

export default Orders;