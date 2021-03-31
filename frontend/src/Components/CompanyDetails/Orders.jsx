import { Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { Card, CardContent } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField'

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { React, useState, useEffect } from "react"

import "./css/Orders.css"

const Orders = ({data}) => {

    const [addingOrder, setAddingOrder] = useState(false);

    const handleCancel = () => {
        setAddingOrder(false);
    }

    const handleAddNewOrderForm = () => {
        setAddingOrder(true);
    }
    return (
        <Card className="company-details-orders comapny-details-card">
            <CardContent>
                <Typography variant="h4">
                    Podepsané objednávky
                    <IconButton className="plus-button" onClick={handleAddNewOrderForm}
                     size="small" ><AddIcon/></IconButton>
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {data.map(order => (
                                <TableRow>
                                    {!order.isNewRecord && <TableCell>{order.date}</TableCell>}
                                    {!order.isNewRecord && <TableCell>{order.contract_number}</TableCell>}
                                    {!order.isNewRecord && <TableCell>{order.state}</TableCell>}
                                    {!order.isNewRecord && <TableCell>{order.sum}&nbsp;Kč</TableCell>}
                                    {!order.isNewRecord && <TableCell><IconButton className="delete-button"><DeleteIcon/></IconButton></TableCell>}

                                    {order.isNewRecord && <TableCell>
                                        <TextField className="company-details-info-edit-field" 
                                        defaultValue={order.date} />
                                        </TableCell>}
                                    {order.isNewRecord && <TableCell><TextField className="company-details-info-edit-field" 
                                        defaultValue={order.contract_number}/></TableCell>}
                                    {order.isNewRecord && <TableCell><TextField className="company-details-info-edit-field" 
                                        defaultValue={order.state}/></TableCell>}
                                    {order.isNewRecord && <TableCell><TextField className="company-details-info-edit-field" 
                                        defaultValue={order.sum}/>&nbsp;Kč</TableCell>}
                                    {order.isNewRecord && <TableCell><IconButton className="delete-button"><DeleteIcon/></IconButton></TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {addingOrder && <div className="comapny-details-contact-persons-addition">
                <Button className="company-details-save-button">Uložit</Button>
                <Button className="company-details-cancel-button" onClick={handleCancel}>Zrušit</Button>
            </div> }
            </CardContent>
        </Card>
    )
}

export default Orders;