import Events from "./Events"
import Orders from "./Orders"
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import DeleteDialog from "./DeleteDialog"
import React from "react"

import "./CompanyDetails.css"

const CompanyDetails = ({companyDetails, contactPersons,  events, orders}) => {

    const {companyName, companyICO, billingAddress, contactAddress, created} = companyDetails;

    const editCompanyDetails = () => {
        // TODO
    }

    return (
        <div className="company-details">
            <div className="company-details-header">
                 <h1 id="company-name">{companyName} - {companyICO}</h1>
                 <DeleteDialog companyName={companyName}/>
            </div>
           <div className="company-details-body">
               <h2>Kontaktní osoba</h2>
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
                

                <h2>Obchodní adresa</h2>
                <span>{billingAddress}</span>

                <h2>Kontaktní adresa</h2>
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