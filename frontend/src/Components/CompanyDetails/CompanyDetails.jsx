import Events from "./Events"
import Orders from "./Orders"
import ContactPersons from "./ContactPersons"
import Notes from "./Notes"
import CompanyInformations from "./CompanyInformations"

import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { Card, CardContent } from "@material-ui/core"

import EditIcon from '@material-ui/icons/Edit';

import React from "react"

import "./css/CompanyDetails.css"


const CompanyDetails = ({companyDetails, contactPersons, notes,  events, orders}) => {

    const {companyName, companyICO, billingAddress, contactAddress, mainPhoneNumber, created, status, statusColor} = companyDetails;


    const handleBack = () => {
        // TODO
    }

    return (
        <Card className="company-details comapny-details-card">
            <CardContent>
                <div className="company-details-header">
                    <div className="left">
                        <Typography id="company-name" variant="h3">{companyName}</Typography>
                        <span className="company-status" style={{backgroundColor: statusColor}}>{status} <EditIcon className="icon"/></span>
                    </div>
                    
                    <div>
                        <Button className="company-details-cancel-button" onClick={handleBack}>Zrušit</Button>
                        <Button className="company-details-save-button" onClick={handleBack}>Uložit</Button>
                    </div>
                </div>
                <div className="company-details-body">
                    
                    <CompanyInformations companyICO={companyICO} billingAddress={billingAddress} 
                        contactAddress={contactAddress} mainPhoneNumber={mainPhoneNumber}/>

                    <ContactPersons data={contactPersons}/>

                    <div className="grid">
                        <Events data={events}/>
                        <Notes data={notes}/>
                    </div>
                    
                    <Orders data={orders}/>
                    
                </div>
                <div className="company-details-footer">
                    <span className="company-details-created-date">Přidáno: {created}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default CompanyDetails;