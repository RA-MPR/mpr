import Events from "./Events"
import Orders from "./Orders"
import ContactPersons from "./ContactPersons"
import Notes from "./Notes"
import CompanyInformations from "./CompanyInformations"

import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { Card, CardContent } from "@material-ui/core"

import EditIcon from '@material-ui/icons/Edit';

import { React, useState, useEffect, useRef } from "react"

import axios from "axios"

import "./css/CompanyDetails.css"

const CompanyDetails = ({ico, className, onClose}) => {

    const [company, setCompany] = useState();
    const [contacts, setContacts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [events, setEvents] = useState([]);
    const [notes, setNotes] = useState([]);
    
    const fetchCompany = async () => {
        return await axios.get('http://127.0.0.1:8000/company/'+ico).then(res => res.data);
    }

    const fetchContacts = async () => {
        return await axios.get('http://127.0.0.1:8000/contact').then(res => res.data);
    }

    const fetchOrders = async () => {
        return await axios.get('http://127.0.0.1:8000/order').then(res => res.data);
    }

    const fetchEvents = async () => {
        return await axios.get('http://127.0.0.1:8000/event').then(res => res.data);
    }

    const fetchNotes= async () => {
        return await axios.get('http://127.0.0.1:8000/note').then(res => res.data);
    }
 
    const isMounted = useRef(false);
    useEffect(() => {
        if(isMounted.current){
            const getData = async () => {
                setCompany(await fetchCompany());
                const contactData = await fetchContacts();
                setContacts(contactData.filter(contact => contact.company == ico));
                const ordersData = await fetchOrders();
                setOrders(ordersData.filter(order => order.company.ico == ico));
                const eventsData = await fetchEvents();
                setEvents(eventsData.filter(event => event.company.ico == ico));
                const notesData = await fetchNotes();
                setNotes(notesData.filter(note => note.company.ico == ico));
            } 
            getData();
        }else{
            isMounted.current = true;
        }  
    },[ico])

    

    const handleBack = () => {
        onClose();
    }
    if(ico == ""){
        return (
            <div id="companyDetail"></div>
        )
    }
    return (        
       <Card id="companyDetail" className={className + " company-details comapny-details-card"}>
            {company &&<CardContent>
                 <div className="company-details-header">
                    <div className="left">
                        <Typography id="company-name" variant="h3">{company.name}</Typography>
                        <span className="company-status" >{company.status} <EditIcon className="icon"/></span>
                    </div>
                    
                    <div>
                        <Button className="company-details-cancel-button" onClick={handleBack}>Zrušit</Button>
                        <Button className="company-details-save-button" onClick={handleBack}>Uložit</Button>
                    </div>
                </div>
                <div className="company-details-body">
                    
                    <CompanyInformations companyICO={company.ico} billingAddress={company.billing_address} 
                        contactAddress={company.contact_address} mainPhoneNumber={company.phone_number}/>

                    <ContactPersons data={contacts}/>

                    <div className="grid">
                        <Events data={events}/>
                        <Notes data={notes}/>
                    </div>
                    
                    <Orders data={orders}/>
                    
                </div>
                <div className="company-details-footer">
                    {/* <span className="company-details-created-date">Přidáno: {created}</span> */}
                </div>
            </CardContent>}

        </Card>
    )
}

export default CompanyDetails;