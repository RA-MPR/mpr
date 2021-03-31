import { Card, CardContent } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField'

import { React, useState, useEffect } from "react"

import axios from "axios"

import "./css/CompanyInformations.css"

const CompanyInformations = ({companyICO, mainPhoneNumber, billingAddress, contactAddress}) => {

    const [infoEditing, setInfoEditing] = useState(false);
    const [newCompanyICO, setNewCompanyICO] = useState(companyICO);
    const [newMainPhoneNumber, setNewMainPhoneNumber] = useState(mainPhoneNumber);
    const [newBillingAddress, setNewBillingAddress] 
        = useState(billingAddress.street + ", " +  billingAddress.zip_code + " " 
        + billingAddress.city + ", " + billingAddress.country);
    const [newContactAddress, setNewContactAddress] 
        = useState(contactAddress.street + ", " + contactAddress.zip_code + " " 
        + contactAddress.city + ", " + contactAddress.country);

    const handleCancel = () => {
        setNewBillingAddress(billingAddress.street + ", " +  billingAddress.zip_code + " " 
            + billingAddress.city + ", " + billingAddress.country);
        setNewContactAddress(contactAddress.street + ", " + contactAddress.zip_code + " " 
            + contactAddress.city + ", " + contactAddress.country);
        setNewCompanyICO(companyICO);
        setNewMainPhoneNumber(mainPhoneNumber);
        setInfoEditing(false);
    }

    const handleSave = () => {
        //TODO Parse address

        console.log(newBillingAddress);

        // axios.put('http://127.0.0.1:8000/company', {data});
        // setInfoEditing(false);
    }

    const handleEdit = () => {
        setInfoEditing(true);
    }

    return (
        <Card className="company-details-info comapny-details-card">
            <CardContent>
                <div className="grid">
                    <div className="ico">
                        <Typography variant="h5">IČO</Typography>
                        {!infoEditing && <span className="company-details-info-field">{companyICO}</span>}
                        {infoEditing && <TextField className="company-details-info-edit-field" 
                        value={newCompanyICO} onChange={e => setNewCompanyICO(e.target.value)} ></TextField>}
                    </div>
                    
                    <div className="main-phone-number">
                        <Typography variant="h5">Hlavní kontaktní číslo</Typography>
                        {!infoEditing && <span className="company-details-info-field">{mainPhoneNumber} </span>}
                        {infoEditing && <TextField className="company-details-info-edit-field" 
                        value={newMainPhoneNumber} onChange={e => setNewMainPhoneNumber(e.target.value)} ></TextField>}
                    </div>
                    
                    <div className="billing-address">
                        <Typography variant="h5">Obchodní adresa</Typography>
                        {!infoEditing && <span className="company-details-info-field">{billingAddress.street}, &nbsp;
                        {billingAddress.zip_code}&nbsp; {billingAddress.city},&nbsp; {billingAddress.country}</span>}
                        {infoEditing && <TextField className="company-details-info-edit-field" 
                        value={newBillingAddress} onChange={e => setNewBillingAddress(e.target.value)} ></TextField>}
                    </div>
                    
                    <div className="contact-address">
                        <Typography variant="h5">Kontaktní adresa</Typography>
                        {!infoEditing && <span className="company-details-info-field">{contactAddress.street}, &nbsp;
                        {contactAddress.zip_code}&nbsp; {contactAddress.city},&nbsp; {contactAddress.country}</span>}
                        {infoEditing && <TextField className="company-details-info-edit-field" 
                        value={newContactAddress} onChange={e => setNewContactAddress(e.target.value)} ></TextField>}
                    </div>

                    {!infoEditing && <div className="button-area">
                         <Button className="company-details-info-edit-button" onClick={handleEdit}>Upravit</Button>
                    </div>}
                    {infoEditing && <div className="button-area">
                            <Button className="company-details-cancel-button" onClick={handleCancel}>Zrušit</Button>
                            <Button className="company-details-save-button">Uložit</Button>
                        </div> }
                </div>
            </CardContent>
        </Card>
    )
}
export default CompanyInformations