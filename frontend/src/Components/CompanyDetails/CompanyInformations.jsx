import { Card, CardContent } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField'

import { React, useState, useEffect } from "react"

import axios from "axios"

import "./css/CompanyInformations.css"

const CompanyInformations = ({companyICOData, mainPhoneNumberData, billingAddressData, contactAddressData}) => {

    const [billingAddressZipError, setBillingAddressZipError] = useState(false);
    const [contactAddressZipError, setContactAddressZipError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [icoError, setIcoError] = useState(false);

    const [billingAddressZipErrorMessage, setBillingAddressZipErrorMessage] = useState("");
    const [contactAddressZipErrorMessage, setContactAddressZipErrorMessage] = useState("");
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
    const [icoErrorMessage, setIcoErrorMessage] = useState("");

    const [infoEditing, setInfoEditing] = useState(false);

    const [companyICO, setCompanyICO] = useState("");
    const [mainPhoneNumber, setMainPhoneNumber] = useState("");
    const [billingAddress, setBillingAddress] = useState();
    const [contactAddress, setContactAddress] = useState();

    const [newCompanyICO, setNewCompanyICO] = useState("");
    const [newMainPhoneNumber, setNewMainPhoneNumber] = useState("");
    
    const [newBillingAddressZip, setNewBillingAddressZip] = useState("");
    const [newBillingAddressStreet, setNewBillingAddressStreet] = useState("");
    const [newBillingAddressCity, setNewBillingAddressCity] = useState("");
    const [newBillingAddressCountry, setNewBillingAddressCountry] = useState("");
    
    const [newContactAddressZip, setNewContactAddressZip] = useState("");
    const [newContactAddressStreet, setNewContactAddressStreet] = useState("");
    const [newContactAddressCity, setNewContactAddressCity] = useState("");
    const [newContactAddressCountry, setNewContactAddressCountry] = useState("");
   

    const validateAndChangeContactAddressZip = (value) => {
        setNewContactAddressZip(value);
        if(!value.match("^[0-9]{5}$|^$")) {
            setContactAddressZipErrorMessage("PSČ se musí skládat z 5ti číslic");
            setContactAddressZipError(true);
        } else {
            setContactAddressZipErrorMessage("");
            setContactAddressZipError(false);
        }
    }

    const validateAndChangeBillingAddressZip = (value) => {
        setNewBillingAddressZip(value);
        if(!value.match("^[0-9]{5}$|^$")) {
            setBillingAddressZipErrorMessage("PSČ se musí skládat z 5ti číslic");
            setBillingAddressZipError(true);
        } else {
            setBillingAddressZipErrorMessage("");
            setBillingAddressZipError(false);
        }
    }

    const validateAndChangePhoneNumber = (value) => {
        setNewMainPhoneNumber(value);
        if(!value.match("^([\+]|00)([0-9]){12}$|^$")) {
            setPhoneNumberErrorMessage("Telefónni číslo musí být ve tvaru +xxx xxx xxx xxx, nebo 00xxx xxx xxx");
            setPhoneNumberError(true);
        } else {
            setPhoneNumberErrorMessage("");
            setPhoneNumberError(false);
        }
    }

    const validateAndChangeCompanyIco = (value) => {
        setNewCompanyICO(value);
        if(!value.match("^[0-9]{8}$")) {
            setIcoErrorMessage("ICO musí obsahovat 8 čísel");
            setIcoError(true);
        } else {
            setIcoErrorMessage("");
            setIcoError(false);
        }
    }


    useEffect(() => {
        setCompanyICO(companyICOData);
        setMainPhoneNumber(mainPhoneNumberData);

        setInfoEditing(false);

        if(billingAddressData) {
            setBillingAddress([
                billingAddressData.id,
                billingAddressData.street,
                billingAddressData.zip_code,
                billingAddressData.city,
                billingAddressData.country
            ]);
        } else {
            setBillingAddress(null);
        }
        
        if(contactAddressData) {
            setContactAddress([
                contactAddressData.id,
                contactAddressData.street,
                contactAddressData.zip_code,
                contactAddressData.city,
                contactAddressData.country
            ]);
        } else {
            setContactAddress(null);
        }
        
        
    },[companyICOData, mainPhoneNumberData, billingAddressData, contactAddressData])

    const handleCancel = () => {
        setContactAddressZipErrorMessage("");
        setContactAddressZipError(false);
        setBillingAddressZipErrorMessage("");
        setBillingAddressZipError(false);
        setPhoneNumberErrorMessage("");
        setPhoneNumberError(false);
        setIcoErrorMessage("");
        setIcoError(false);
        setInfoEditing(false);
    }

    const handleSave = () => {
        //TODO Rozumnejsia validacia adresy
        let contactAddressZipTest = newContactAddressZip.match("^[0-9]{5}$|^$");
        let billingAddressZipTest = newBillingAddressZip.match("^[0-9]{5}$|^$");
        let phoneTest = newMainPhoneNumber.match("^([\+]|00)([0-9]){12}$|^$");
        let icoTest = newCompanyICO.match("[0-9]{8}");

        if(billingAddressZipTest && contactAddressZipTest && phoneTest && icoTest) {
            let data = {
                "ico": newCompanyICO,
                "phone_number": newMainPhoneNumber                
            }

            // Firma nemala zadanu obchodnu adresu
            if(billingAddressData == null) {
                // Bola nastavena obchodna adresa
                if(newBillingAddressStreet != "" || newBillingAddressCity != "" 
                    || newBillingAddressZip != "" || newBillingAddressCountry != "") {
                    data["billing_address"] = {
                        "city": newBillingAddressCity,
                        "street": newBillingAddressStreet,
                        "country": newBillingAddressCountry,
                        "zip_code" : newBillingAddressZip
                    }
                    setBillingAddress([
                        newBillingAddressStreet,
                        newBillingAddressZip,
                        newBillingAddressCity,
                        newBillingAddressCountry
                    ]);
                }
            } else { // Firma ma nastavenu obchodnu adresu
                data["billing_address"] = {
                    "id": billingAddressData.id,
                    "city": newBillingAddressCity,
                    "street": newBillingAddressStreet,
                    "country": newBillingAddressCountry,
                    "zip_code" : newBillingAddressZip
                }
                setBillingAddress([
                    billingAddressData.id, 
                    newBillingAddressStreet,
                    newBillingAddressZip,
                    newBillingAddressCity,
                    newBillingAddressCountry
                ]);
            }

            // Firma nema nastavenu kontaktnu adresu
            if(contactAddressData == null) {
                // Bola nastavena kontaktna adresa
                if(newContactAddressStreet != "" || newContactAddressCity != "" 
                    || newContactAddressZip != "" || newContactAddressCountry != "") {
                    data["contact_address"] = {
                        "city": newContactAddressCity,
                        "street": newContactAddressStreet,
                        "country": newContactAddressCountry,
                        "zip_code" : newContactAddressZip
                    }
                    setContactAddress([
                        newContactAddressStreet,
                        newContactAddressZip,
                        newContactAddressCity,
                        newContactAddressCountry
                    ]);
                }
            } else { // Firma ma nastavenu kontaktnu adresu
                data["contact_address"] = {
                    "id": contactAddressData.id,
                    "city": newContactAddressCity,
                    "street": newContactAddressStreet,
                    "country": newContactAddressCountry,
                    "zip_code" : newContactAddressZip
                }

                setContactAddress([
                    contactAddressData.id,
                    newContactAddressStreet,
                    newContactAddressZip,
                    newContactAddressCity,
                    newContactAddressCountry
                ]);
            }

            axios.put('http://0.0.0.0:8000/company/'+companyICO+"/", data);
            setMainPhoneNumber(newMainPhoneNumber);
            setCompanyICO(newCompanyICO);

            setInfoEditing(false);
            
        }
    }

    const handleEdit = () => {
        setNewMainPhoneNumber(mainPhoneNumber);
        setNewCompanyICO(companyICO);

        if(billingAddress) {
            setNewBillingAddressStreet(billingAddress[1]);
            setNewBillingAddressZip(billingAddress[2]);
            setNewBillingAddressCity(billingAddress[3]);
            setNewBillingAddressCountry(billingAddress[4]);
        } else {
            setNewBillingAddressStreet("");
            setNewBillingAddressZip("");
            setNewBillingAddressCity("");
            setNewBillingAddressCountry("");
        }
        
        if(contactAddress) {
            setNewContactAddressStreet(contactAddress[1]);
            setNewContactAddressZip(contactAddress[2]);
            setNewContactAddressCity(contactAddress[3]);
            setNewContactAddressCountry(contactAddress[4]);
        } else {
            setNewContactAddressStreet("");
            setNewContactAddressZip("");
            setNewContactAddressCity("");
            setNewContactAddressCountry("");
        }
        

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
                        value={newCompanyICO} error={icoError} helperText={icoErrorMessage} 
                        onChange={e => validateAndChangeCompanyIco(e.target.value)} ></TextField>}
                    </div>
                    
                    <div className="main-phone-number">
                        <Typography variant="h5">Hlavní kontaktní číslo</Typography>
                        {!infoEditing && <span className="company-details-info-field">{mainPhoneNumber} </span>}
                        {infoEditing && <TextField className="company-details-info-edit-field" 
                        value={newMainPhoneNumber} error={phoneNumberError} helperText={phoneNumberErrorMessage} 
                        onChange={e => validateAndChangePhoneNumber(e.target.value)} ></TextField>}
                    </div>
                    
                    <div className="billing-address">
                        <Typography variant="h5">Obchodní adresa</Typography>
                        {!infoEditing && billingAddress && <span className="company-details-info-field">{billingAddress[1]+ " " 
                            +  billingAddress[2] + " " + billingAddress[3] + " " + billingAddress[4]}</span>}
                        {infoEditing && <div> 
                            <TextField className="company-details-info-edit-field" label="Ulice"
                                value={newBillingAddressStreet} onChange={e => setNewBillingAddressStreet(e.target.value)} />
                            <TextField className="company-details-info-edit-field" label="PSČ"
                                value={newBillingAddressZip} error={billingAddressZipError} helperText={billingAddressZipErrorMessage} 
                                onChange={e => validateAndChangeBillingAddressZip(e.target.value)} />
                            <TextField className="company-details-info-edit-field" label="Město"
                                value={newBillingAddressCity} onChange={e => setNewBillingAddressCity(e.target.value)} />
                            <TextField className="company-details-info-edit-field" label="Země"
                                value={newBillingAddressCountry} onChange={e => setNewBillingAddressCountry(e.target.value)} />
                            
                            </div>}
                    </div>
                    
                    <div className="contact-address">
                        <Typography variant="h5">Kontaktní adresa</Typography>
                        {!infoEditing && contactAddress && <span className="company-details-info-field">{contactAddress[1]+ " " 
                            +  contactAddress[2] + " " + contactAddress[3] + " " + contactAddress[4]}</span>}
                        {infoEditing && <div> 
                            <TextField className="company-details-info-edit-field" label="Ulice"
                                value={newContactAddressStreet} onChange={e => setNewContactAddressStreet(e.target.value)} />
                            <TextField className="company-details-info-edit-field" label="PSČ"
                                value={newContactAddressZip} error={contactAddressZipError} helperText={contactAddressZipErrorMessage} 
                                onChange={e => validateAndChangeContactAddressZip(e.target.value)} />
                            <TextField className="company-details-info-edit-field" label="Město"
                                value={newContactAddressCity} onChange={e => setNewContactAddressCity(e.target.value)} />
                            <TextField className="company-details-info-edit-field" label="Země"
                                value={newContactAddressCountry} onChange={e => setNewContactAddressCountry(e.target.value)} />
                        </div> }
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