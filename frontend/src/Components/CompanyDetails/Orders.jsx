import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"

const Orders = ({data}) => {
    return (
        <div className="orders">
            <Typography variant="h4">Podepsané objednávky</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Datum</TableCell>
                            <TableCell>Číslo smlouvy</TableCell>
                            <TableCell>Částka</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(order => (
                            <TableRow>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.contractNumber}</TableCell>
                                <TableCell>{order.sum}&nbsp;CZK</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </div>
    )
}

export default Orders;