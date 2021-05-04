import Events from "./Events";
import Orders from "./Orders";
import ContactPersons from "./ContactPersons";
import Notes from "./Notes";
import CompanyInformations from "./CompanyInformations";
import StatusChange from "./StatusChange";

import { Button, IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Card, CardContent } from "@material-ui/core";
import { TextField } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";

import { React, useState, useEffect } from "react";

import axios from "axios";

import "./css/CompanyDetails.css";

import ConfirmDialog from "./ConfirmDialog";
import { format } from "date-fns";

import { useHistory } from "react-router-dom";

const CompanyDetails = ({
  id,
  className,
  onClose,
  token,
  setUpcomingRefresh,
  setRefreshOrders,
  refreshEvents,
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
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [addDate, setAddDate] = useState("");
  const [admin, setAdmin] = useState(false);

  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyNameError, setNewCompanyNameError] = useState(false);
  const [newCompanyNameErrorMessage, setNewCompanyNameErrorMessage] = useState("");

  const history = useHistory();

  const fetchAdmin = async () => {
    await axios
      .get("/api/user/admin", {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => {
        setAdmin(res.data["is_admin"]);
      });
  };

  useEffect(() => {
    const getAdmin = async () => {
      await fetchAdmin();
    };
    getAdmin();
  }, []);

  const fetchCompany = async () => {
    return await axios
      .get("/api/company/" + id, {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => res.data);
  };

  const fetchContacts = async () => {
    return await axios
      .get("/api/contact", {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => res.data);
  };

  const fetchOrders = async () => {
    return await axios
      .get("/api/order", {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => res.data);
  };

  const fetchEvents = async () => {
    return await axios
      .get("/api/event", {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => res.data);
  };

  useEffect(() => {
    const getData = async () => {
      const companyData = await fetchCompany();
      setCompany(companyData);
      const contactData = await fetchContacts();
      setContacts(contactData.filter((contact) => contact.company.id === id));
      const ordersData = await fetchOrders();
      setOrders(ordersData.filter((order) => order.company === id));
      const eventsData = await fetchEvents();
      setEvents(eventsData.filter((event) => event.company === id));
      setNotes(companyData.notes);
      setNewCompanyName(companyData.name)
      if (companyData.create_date) {
        setAddDate(format(Date.parse(companyData.create_date), "dd.MM.yyyy"));
      }
    };
    getData();
  }, [id, refresh]);

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
    axios
      .put("/api/company/" + company.id +"/", {user: null},{
        headers: { Authorization: "Token " + token },
      })
      .then(function (response) {
        history.replace("/");
      });
  };

  const handleDeleteCompany = () => {
    axios
      .delete("/api/company/" + company.id, {
        headers: { Authorization: "Token " + token },
      })
      .then(function (response) {
        history.replace("/");
      });
  };

  const handleNewCompanyNameChange = (event) => {
    setNewCompanyNameError(false);
    setNewCompanyNameErrorMessage("");
    setNewCompanyName(event.target.value);
    if(event.target.value.length == 0) {
      setNewCompanyNameError(true);
      setNewCompanyNameErrorMessage("Název firmy je povinný");
    }
  }

  if (id === "") {
    return <div id="companyDetail"></div>;
  } else {
    return (
      <>
        {company && (
          <ConfirmDialog
            title={"Vzdát se firmy"}
            open={giveUpOpen}
            setOpen={setGiveUpOpen}
            onConfirm={() => handleGiveUp()}
          >
            {"Opravdu se chcete vzdát firmy " + company.name + "?"}
          </ConfirmDialog>
        )}
        {company && (
          <ConfirmDialog
            title={"Smazat firmu"}
            open={deleteOpen}
            setOpen={setDeleteOpen}
            onConfirm={() => handleDeleteCompany()}
          >
            {"Opravdu chcete smazat firmu " + company.name + "?"}
          </ConfirmDialog>
        )}
        <Card id="companyDetail" className={className + " company-details "}>
          {company && (
            <CardContent>
              <div className="company-details-header">
                <div className="left">
                  {!editing && <Typography id="company-name" variant="h3">
                    {company.name}
                  </Typography>}
                  {editing && 
                    <TextField 
                        label="Název firmy*"
                        value={newCompanyName} 
                        error={newCompanyNameError} 
                        helperText={newCompanyNameErrorMessage}
                        onChange={handleNewCompanyNameChange}
                        />}
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
                  <Button
                    onClick={() => setGiveUpOpen(true)}
                    className="company-details-cancel-button"
                  >
                    Odepnout
                  </Button>
                  {admin && (
                    <Button
                      onClick={() => setDeleteOpen(true)}
                      className="company-details-delete-button"
                    >
                      Smazat
                    </Button>
                  )}
                </div>
              </div>
              <div className="company-details-body">
                <CompanyInformations
                  companyICOData={company.ico}
                  billingAddressData={company.billing_address}
                  contactAddressData={company.contact_address}
                  mainPhoneNumberData={company.phone_number}
                  companyName={newCompanyName}
                  token={token}
                  noteEditingHandler={setEditing}
                  notes={notes}
                  refresh={refreshDetails}
                />

                <ContactPersons
                  data={contacts}
                  clean={clean}
                  id={id}
                  refresh={refreshDetails}
                  token={token}
                />

                <div className="grid">
                  <Events
                    data={events}
                    id={id}
                    fetchEvents={fetchEvents}
                    setEvents={setEvents}
                    token={token}
                    setUpcomingRefresh={setUpcomingRefresh}
                    refreshEvents={refreshEvents}
                  />
                  <Notes data={notes} edit={editing} setNotes={setNotes} />
                </div>

                <Orders
                  data={orders}
                  id={company.id}
                  fetchOrder={fetchOrders}
                  setOrder={setOrders}
                  token={token}
                  setRefreshOrders={setRefreshOrders}
                />
              </div>
              <div className="company-details-footer">
                <span className="company-details-created-date">
                  Přidáno: {addDate}
                </span>
              </div>
            </CardContent>
          )}
          {company && (
            <StatusChange
              id={id}
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
