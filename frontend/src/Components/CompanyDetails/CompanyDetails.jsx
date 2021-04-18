import Events from "./Events";
import Orders from "./Orders";
import ContactPersons from "./ContactPersons";
import Notes from "./Notes";
import CompanyInformations from "./CompanyInformations";
import StatusChange from "./StatusChange";

import { Button, IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Card, CardContent } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";

import { React, useState, useEffect } from "react";

import axios from "axios";

import "./css/CompanyDetails.css";

import ConfirmDialog from "./ConfirmDialog";
import { format } from "date-fns";

const CompanyDetails = ({
  ico,
  className,
  onClose,
  token,
  setUpcomingRefresh,
  refreshEvents
}) => {
  const [company, setCompany] = useState();
  const [contacts, setContacts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [events, setEvents] = useState([]);
  const [notes, setNotes] = useState([]);
  const [statusChangeDialog, setStatusChangeDialog] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [clean, setClean] = useState(false);
  const [giveUpOpen, setGiveUpOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [ addDate, setAddDate] = useState("");

  const fetchCompany = async () => {
    return await axios
      .get("http://127.0.0.1:8000/company/" + ico, {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => res.data);
  };

  const fetchContacts = async () => {
    return await axios
      .get("http://127.0.0.1:8000/contact", {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => res.data);
  };

  const fetchOrders = async () => {
    return await axios
      .get("http://127.0.0.1:8000/order", {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => res.data);
  };

  const fetchEvents = async () => {
    return await axios
      .get("http://127.0.0.1:8000/event", {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => res.data);
  };

  useEffect(() => {
    const getData = async () => {
        const companyData = await fetchCompany();
        setCompany(companyData);
        const contactData = await fetchContacts();
        setContacts(contactData.filter(contact => contact.company.ico === ico));
        const ordersData = await fetchOrders();
        setOrders(ordersData.filter(order => order.company === ico));
        const eventsData = await fetchEvents();
        setEvents(eventsData.filter(event => event.company == ico));
        setNotes(companyData.notes);
        if(companyData.create_date) {
          setAddDate(format(Date.parse(companyData.create_date), "dd.MM.yyyy"));
        }
    };
    console.log("STAHUJEM DATA");
    getData();
  }, [ico, refresh]);

  const handleBack = () => {
    setClean(!clean);
    onClose();
  };

  const openChangeStatusDialog = () => {
    setStatusChangeDialog(true);
  };

  const closeChangeStatusDialog = () => {
    setStatusChangeDialog(false);
  };

  const refreshDetails = () => {
    setRefresh(!refresh);
  };

  const handleGiveUp = () => {
      console.log("Give up company");
  }

  if (ico === "") {
    console.log("ICO je prazdne");
    return <div id="companyDetail"></div>;
  } else {
    return (
      <>
        {company && (
        <ConfirmDialog
          title={"Vzdát se firmy"}
          open={giveUpOpen}
          setOpen={setGiveUpOpen}
          onConfirm={() =>
            handleGiveUp()
          }
        >
         { "Opravdu se chcete vzdát firmy " + company.name + "?" } 
        </ConfirmDialog>
        )}
        <Card id="companyDetail" className={className + " company-details "}>
          {company && (
            <CardContent>
              <div className="company-details-header">
                <div className="left">
                  <Typography id="company-name" variant="h3">
                    {company.name}
                  </Typography>
                  <span
                    className={
                      (company.status_color === "white"
                        ? "bright-status-borders bright-status-text "
                        : "") +
                      (company.status_color === "yellow"
                        ? "bright-status-text "
                        : "") +
                      "company-status"
                    }
                    style={{ backgroundColor: company.status_color }}
                  >
                    {company.status}
                    <IconButton
                      onClick={openChangeStatusDialog}
                      style={{ backgroundColor: "transparent" }}
                      className="company-status-edit-button"
                    >
                      <EditIcon
                        className={
                          ((company.status_color === "white") |
                          (company.status_color === "yellow")
                            ? "bright-status-text "
                            : "") + "icon"
                        }
                      />
                    </IconButton>
                  </span>
                </div>
                <div>
                  <Button
                    onClick={handleBack}
                    className="company-details-cancel-button"
                  >
                    Zpět
                  </Button>
                  <Button onClick={() => setGiveUpOpen(true)} className="company-details-cancel-button">
                    Odepnout
                  </Button>
                  <Button className="company-details-delete-button">
                    Smazat
                  </Button>
                </div>
              </div>
              <div className="company-details-body">
                <CompanyInformations
                  companyICOData={company.ico}
                  billingAddressData={company.billing_address}
                  contactAddressData={company.contact_address}
                  mainPhoneNumberData={company.phone_number}
                  token={token}
                  noteEditingHandler={setEditing} 
                  notes={notes}
                />

                <ContactPersons
                  data={contacts}
                  clean={clean}
                  ico={ico}
                  refresh={refreshDetails}
                  token={token}
                />

                <div className="grid">
                  <Events
                    data={events}
                    ico={ico}
                    fetchEvents={fetchEvents}
                    setEvents={setEvents}
                    token={token}
                    setUpcomingRefresh={setUpcomingRefresh}
                    refreshEvents={refreshEvents}
                  />
                  <Notes data={notes} 
                    edit={editing} 
                    setNotes={setNotes}/>
                </div>

                <Orders
                  data={orders}
                  ico={company.ico}
                  fetchOrder={fetchOrders}
                  setOrder={setOrders}
                  token={token}
                />
              </div>
              <div className="company-details-footer">
                <span className="company-details-created-date">Přidáno: {addDate}</span>
              </div>
            </CardContent>
          )}
          {company && (
            <StatusChange
              ico={ico}
              companyName={company.name}
              companyStatus={company.status}
              companyStatusColor={company.status_color}
              open={statusChangeDialog}
              onClose={closeChangeStatusDialog}
              refresh={refreshDetails}
              token={token}
            />
          )}
        </Card>
      </>
    );
  }
};

export default CompanyDetails;