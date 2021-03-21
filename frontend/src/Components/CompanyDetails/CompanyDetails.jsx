import Events from "./Events"
import Orders from "./Orders"
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import DeleteDialog from "./DeleteDialog"
import React from "react"
import Typography from "@material-ui/core/Typography"

import "./CompanyDetails.css"

const CompanyDetails = ({companyDetails, contactPersons,  events, orders}) => {

    const {companyName, companyICO, billingAddress, contactAddress, created} = companyDetails;

    const editCompanyDetails = () => {
        // TODO
    }

    return (
        <div className="company-details">
            <div className="company-details-header">
                <Typography id="company-name" variant="h3">{companyName} - {companyICO}</Typography>
                 <DeleteDialog companyName={companyName}/>
            </div>
           <div className="company-details-body">
                <Typography variant="h4">Kontaktní osoba</Typography>
               
               <TableContainer>
                   <Table className="company-details-contact-persons">
                       <TableBody>
                           {contactPersons.map(person => (
                                <TableRow>
                                    <TableCell>{person.name}</TableCell>
                                    <TableCell>{person.phoneNumber}</TableCell>
                                    <TableCell>{person.email}</TableCell>
                                </TableRow>
                            ))}
                       </TableBody>
                    </Table> 
                </TableContainer>
                
                <Typography variant="h4">Obchodní adresa</Typography>
                <span>{billingAddress}</span>

                <Typography variant="h4">Kontaktní adresa</Typography>
                <span>{contactAddress}</span>
            
            </div>

                <div className="comapy-details-body-footer">
                    <Button className="company-details-edit-button" onClick={editCompanyDetails}>Upravit</Button>
                </div>

                <Events data={events}/>
                
                <span className="company-details-created-date">Vytvořeno dne {created}</span>

                <Orders data={orders}/>

        </div>
    )
}

export default CompanyDetails;