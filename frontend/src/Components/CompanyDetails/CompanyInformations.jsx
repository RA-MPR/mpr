import { Card, CardContent } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField'

import { React, useState } from "react"

import axios from "axios"

import "./css/CompanyInformations.css"

const CompanyInformations = ({companyICOData, mainPhoneNumberData, billingAddressData, contactAddressData}) => {

    const [billingAddressError, setBillingAddressError] = useState(false);
    const [contactAddressError, setContactAddressError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [icoError, setIcoError] = useState(false);

    const [billingAddressErrorMessage, setBillingAddressErrorMessage] = useState("");
    const [contactAddressErrorMessage, setContactAddressErrorMessage] = useState("");
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
    const [icoErrorMessage, setIcoErrorMessage] = useState("");

    const [infoEditing, setInfoEditing] = useState(false);

    const [companyICO, setCompanyICO] = useState(companyICOData);
    const [mainPhoneNumber, setMainPhoneNumber] = useState(mainPhoneNumberData);
    const [billingAddress, setBillingAddress] 
        = useState(billingAddressData.street + ", " +  billingAddressData.zip_code + " " 
        + billingAddressData.city + ", " + billingAddressData.country);
    const [contactAddress, setContactAddress] 
        = useState(contactAddressData.street + ", " + contactAddressData.zip_code + " " 
        + contactAddressData.city + ", " + contactAddressData.country);

    const [newCompanyICO, setNewCompanyICO] = useState();
    const [newMainPhoneNumber, setNewMainPhoneNumber] = useState();
    const [newBillingAddress, setNewBillingAddress] = useState();
    const [newContactAddress, setNewContactAddress] = useState();

    const handleCancel = () => {
        setInfoEditing(false);
    }

    const handleSave = () => {
        //TODO Rozumnejsia validacia adresy
        let billingAddressItems = newBillingAddress.split(", ");
        let contactAddressItems = newContactAddress.split(", ");
        let billingAddressTest = billingAddressItems.length === 3;
        let contactAddressTest = contactAddressItems.length === 3;
        // let billingAddressTest = newBillingAddress.match("(\w|\b|[Á-Ž]|[á-ž])+\,\b([0-9]{5})(\w|\b|[Á-Ž]|[á-ž])+\,\b*(\w|\b|[Á-Ž]|[á-ž])+");
        // let contactAddressTest = new RegExp("(\w|\s|[Á-Ž]|[á-ž])+\,\s*([0-9]{5})(\w|\s|[Á-Ž]|[á-ž])+\,\s*(\w|\s|[Á-Ž]|[á-ž])+").test(newContactAddress);
        let phoneTest = new RegExp("^([\+]|00)([0-9]){12}$").test(newMainPhoneNumber);
        let icoTest = new RegExp("[0-9]{8}").test(newCompanyICO);

        if(!billingAddressTest) {
            setBillingAddressErrorMessage("Obchodní adresa musí být ve tvaru \"Ulice, PSČ Město, Stát\"")
            setBillingAddressError(true);
        }

        if(!contactAddressTest) {
            setContactAddressErrorMessage("Kontaktní adresa musí být ve tvaru \"Ulice, PSČ Město, Stát\"")
            setContactAddressError(true);
        }

        if(!phoneTest) {
            setPhoneNumberErrorMessage("Telefónni číslo musí být ve tvaru +xxx xxx xxx xxx, nebo 00xxx xxx xxx")
            setPhoneNumberError(true);
        }

        if(!icoTest) {
            setIcoErrorMessage("ICO musí obsahovat 8 čísel");
            setIcoError(true);
        }

        if(billingAddressTest && contactAddressTest && phoneTest && icoTest) {
            let data = {
                "ico": newCompanyICO,
                "contact_address":{
                    "id": contactAddress.id,
                    "street": contactAddressItems[0],
                    "zip_code": contactAddressItems[1].split(" ")[0],
                    "city": contactAddressItems[1].split(" ")[1],
                    "country": contactAddressItems[2]
                },
                "billing_address":{
                    "id": billingAddress.id,
                    "street": billingAddressItems[0],
                    "zip_code": billingAddressItems[1].split(" ")[0],
                    "city": billingAddressItems[1].split(" ")[1],
                    "country": billingAddressItems[2]
                },
                "phone_number": newMainPhoneNumber                
            }

            axios.put('http://0.0.0.0:8000/company/'+companyICO+"/", data);
            setMainPhoneNumber(newMainPhoneNumber);
            setCompanyICO(newCompanyICO);
            setBillingAddress(newBillingAddress);
            setContactAddress(newContactAddress);
            setInfoEditing(false);
            
        }
    }

    const handleEdit = () => {
        setNewMainPhoneNumber(mainPhoneNumber);
        setNewCompanyICO(companyICO);
        setNewBillingAddress(billingAddress);
        setNewContactAddress(contactAddress);
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
                        value={newCompanyICO} error={icoError} helperText={icoErrorMessage} onChange={e => setNewCompanyICO(e.target.value)} ></TextField>}
                    </div>
                    
                    <div className="main-phone-number">
                        <Typography variant="h5">Hlavní kontaktní číslo</Typography>
                        {!infoEditing && <span className="company-details-info-field">{mainPhoneNumber} </span>}
                        {infoEditing && <TextField className="company-details-info-edit-field" 
                        value={newMainPhoneNumber} error={phoneNumberError} helperText={phoneNumberErrorMessage} onChange={e => setNewMainPhoneNumber(e.target.value)} ></TextField>}
                    </div>
                    
                    <div className="billing-address">
                        <Typography variant="h5">Obchodní adresa</Typography>
                        {!infoEditing && <span className="company-details-info-field">{billingAddress}</span>}
                        {infoEditing && <TextField className="company-details-info-edit-field" 
                        value={newBillingAddress} error={billingAddressError} helperText={billingAddressErrorMessage} onChange={e => setNewBillingAddress(e.target.value)} ></TextField>}
                    </div>
                    
                    <div className="contact-address">
                        <Typography variant="h5">Kontaktní adresa</Typography>
                        {!infoEditing && <span className="company-details-info-field">{contactAddress}</span>}
                        {infoEditing && <TextField className="company-details-info-edit-field" 
                        value={newContactAddress} error={contactAddressError} helperText={contactAddressErrorMessage} onChange={e => setNewContactAddress(e.target.value)} ></TextField>}
                    </div>

                    {!infoEditing && <div className="button-area">
                         <Button className="company-details-info-edit-button" onClick={handleEdit}>Upravit</Button>
                    </div>}
                    {infoEditing && <div className="button-area">
                            <Button className="company-details-cancel-button" onClick={handleCancel}>Zrušit</Button>
                            <Button className="company-details-save-button" onClick={handleSave}>Uložit</Button>
                        </div> }
                </div>
            </CardContent>
        </Card>
    )
}
export default CompanyInformations