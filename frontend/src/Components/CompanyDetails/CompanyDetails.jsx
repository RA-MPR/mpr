import Events from "./Events"
import Orders from "./Orders"
import ContactPersons from "./ContactPersons"
import Notes from "./Notes"
import CompanyInformations from "./CompanyInformations"
import StatusChange from "./StatusChange"

import { Button, IconButton } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { Card, CardContent } from "@material-ui/core"

import EditIcon from '@material-ui/icons/Edit'

import { React, useState, useEffect, useRef } from "react"

import axios from "axios"

import "./css/CompanyDetails.css"

const CompanyDetails = ({ico, className, onClose}) => {

    const [company, setCompany] = useState();
    const [contacts, setContacts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [events, setEvents] = useState([]);
    const [notes, setNotes] = useState([]);
    const [statusChangeDialog, setStatusChangeDialog] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [clean, setClean] = useState(false);
    
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
                setContacts(contactData.filter(contact => contact.company.ico === ico));
                const ordersData = await fetchOrders();
                setOrders(ordersData.filter(order => order.company === ico));
                const eventsData = await fetchEvents();
                setEvents(eventsData.filter(event => event.company == ico));
                // const notesData = await fetchNotes();
                // setNotes(notesData.filter(note => note.company.ico == ico));
            } 
            
            getData();
        }else{
            isMounted.current = true;
        }  
    },[ico, refresh])

    const handleBack = () => {
        setClean(!clean);
        onClose();
    }

    const openChangeStatusDialog = () => {
        setStatusChangeDialog(true);
    }

    const closeChangeStatusDialog = () => {
        setStatusChangeDialog(false);
    }

    const refreshDetails = () => {
        setRefresh(!refresh);
    }

    if(ico === ""){
        return (
            <div id="companyDetail"></div>
        )
    }
    return (        
       <Card id="companyDetail" className={className + " company-details "}>
            {company &&<CardContent>
                 <div className="company-details-header">
                    <div className="left">
                        <Typography id="company-name" variant="h3">{company.name}</Typography>
                        <span className={(company.status_color === "white" ? "bright-status-borders bright-status-text " : "")
                                        + (company.status_color === "yellow" ? "bright-status-text " : "") 
                                        + "company-status"} style={{backgroundColor:company.status_color}}>
                            {company.status}
                            <IconButton onClick={openChangeStatusDialog} 
                                style={{ backgroundColor: 'transparent' }} 
                                className="company-status-edit-button" >
                                <EditIcon className={(company.status_color === "white" | company.status_color === "yellow"  ? "bright-status-text " : "")
                                 + "icon"}/>
                            </IconButton>
                        </span>
                        
                    </div>
                    <div>
                        <Button onClick={handleBack} className="company-details-cancel-button" >Zpět</Button>
                        <Button className="company-details-delete-button" >Smazat</Button>
                    </div>
                </div>
                <div className="company-details-body">
                    
                    <CompanyInformations companyICOData={company.ico} billingAddressData={company.billing_address} 
                        contactAddressData={company.contact_address} mainPhoneNumberData={company.phone_number}/>
                    
                    <ContactPersons data={contacts} clean={clean} ico={ico} refresh={refreshDetails}/>

                    <div className="grid">
                        <Events data={events} ico={ico} fetchEvents={fetchEvents} setEvents={setEvents}/>
                        <Notes data={notes}/>
                    </div>
                    
                    <Orders data={orders} ico={company.ico} fetchOrder={fetchOrders} setOrder={setOrders}/>
                    
                </div>
                <div className="company-details-footer">
                    {/* <span className="company-details-created-date">Přidáno: {created}</span> */}
                </div>
            </CardContent>}
            {company && <StatusChange ico={ico} companyName={company.name} 
                companyStatus={company.status} companyStatusColor={company.status_color}
                open={statusChangeDialog} onClose={closeChangeStatusDialog} refresh={refreshDetails} />}
        </Card>
    )
}

export default CompanyDetails;