import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Card,
  CardContent,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";

import DateFnsUtils from "@date-io/date-fns";
import { format, parse } from "date-fns";
import csLocale from "date-fns/locale/cs";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import axios from "axios";

import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import "./css/Orders.css";

import ConfirmDialog from "./ConfirmDialog";
import AlertDialog from "../CompanyNew/AlertDialog";

const Orders = ({ data, ico, fetchOrder, setOrder, token}) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [type, setType] = React.useState(0);

  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [confirmTitle, setConfirmTitle] = React.useState(null);
  const [confirmText, setConfirmText] = React.useState(null);
  const [deleteType, setDeleteType] = React.useState(0);
  const [deleteID, setDeleteID] = React.useState(-1);

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState(null);

  const setConfirmData = (type, id, contract_number, sum) => {
    setDeleteType(type);
    setDeleteID(id);
    if (type == 0) {
      setConfirmTitle("Opravdu odstranit objednávku?");
      setConfirmText(
        "Opravdu chcete odstranit objednávku " +
          contract_number +
          " s částkou " +
          sum +
          " Kč"
      );
    } else {
      setConfirmTitle("Opravdu odstranit fakturu?");
      setConfirmText(
        "Opravdu chcete odstranit fakturu " +
          contract_number +
          " s částkou " +
          sum +
          " Kč"
      );
    }
    setConfirmOpen(true);
  };

  const showNewOrderRow = () => {
    document.getElementById("addRow").classList.add("showRow");
  };

  const hideNewOrderRow = () => {
    document.getElementById("addRow").classList.remove("showRow");
    document.getElementById("orderNumber").value = "";
    document.getElementById("orderCost").value = "";
    setSelectedDate(new Date());
    setType(0);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChangeType = (event, val) => {
    if (val !== null) setType(val);
  };

  const setOrderIDInvoice = (data, number) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].contract_number == number) {
        return data[i].id;
      }
    }
    setAlertText("Objednávka s číslem " + number + " nebyla nalezena!");
    setAlertOpen(true);
    return null;
  };

  const loadNewData = async () => {
    const ordersData = await fetchOrder();
    setOrder(ordersData.filter((order) => order.company === ico));
  };

  const handleAddOrder = (event) => {
    event.preventDefault();

    var date = parse(event.target.datePicker.value, "dd.MM.yyyy", new Date());
    var formattedDate = format(date, "yyyy-MM-dd");

    if (type == 0) {
      axios
        .post("http://127.0.0.1:8000/order/", {
          date: formattedDate,
          contract_number: event.target.orderNumber.value,
          sum: event.target.orderCost.value,
          company_id: ico,
        }, {headers:{Authorization: "Token " + token}})
        .then(function (response) {
          loadNewData();
        });
    } else {
      var orderId = setOrderIDInvoice(data, event.target.orderNumber.value);
      console.log(orderId);
      if (orderId != null) {
        axios
          .post("http://127.0.0.1:8000/invoice/", {
            date: formattedDate,
            sum: event.target.orderCost.value,
            order_id: orderId,
          }, {headers:{Authorization: "Token " + token}})
          .then(function (response) {
            loadNewData();
          });
      }
    }
  };

  const handleDeleteOrder = (orderId) => {
    axios
      .delete("http://127.0.0.1:8000/order/" + orderId, {headers:{Authorization: "Token " + token}})
      .then(function (response) {
        loadNewData();
      });
  };

  const handleDeleteInvoice = (invoiceId) => {
    axios
      .delete("http://127.0.0.1:8000/invoice/" + invoiceId, {headers:{Authorization: "Token " + token}})
      .then(function (response) {
        loadNewData();
      });
  };

  return (
    <Card className="company-details-orders comapny-details-card">
      <CardContent>
        <ConfirmDialog
          title={confirmTitle}
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={() =>
            deleteType == 0
              ? handleDeleteOrder(deleteID)
              : handleDeleteInvoice(deleteID)
          }
        >
          {confirmText}
        </ConfirmDialog>
        <AlertDialog
          open={alertOpen}
          handleClose={() => setAlertOpen(false)}
          error={alertText}
        />
        <Typography variant="h5">
          Podepsané objednávky
          <IconButton
            className="plus-button"
            size="small"
            onClick={showNewOrderRow}
          >
            <AddIcon />
          </IconButton>
        </Typography>
        <form onSubmit={handleAddOrder}>
          <TableContainer className="addNewRowTable">
            <Table>
              <TableBody>
                <TableRow key={"addRow"} id="addRow" className="orderTableAdd">
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={csLocale}
                  >
                    <TableCell>
                      <KeyboardDatePicker
                        className="datePickerOrder"
                        variant="inline"
                        format="dd.MM.yyyy"
                        id="datePicker"
                        name="datePicker"
                        KeyboardButtonProps={{ size: "small" }}
                        value={selectedDate}
                        onChange={handleDateChange}
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="orderNumber"
                        id="orderNumber"
                        type="number"
                        autoFocus
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <ToggleButtonGroup
                        value={type}
                        exclusive
                        onChange={handleChangeType}
                        className="typeToggle"
                        required
                      >
                        <ToggleButton value={0}>Objednávka</ToggleButton>
                        <ToggleButton value={1}>Faktura</ToggleButton>
                      </ToggleButtonGroup>
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="orderCost"
                        id="orderCost"
                        type="number"
                        autoFocus
                        required
                        helperText="Kč"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton className="delete-button" type="submit">
                        <AddIcon style={{ fill: "green" }} />
                      </IconButton>
                      <IconButton
                        className="delete-button"
                        onClick={hideNewOrderRow}
                      >
                        <CancelIcon style={{ fill: "red" }} />
                      </IconButton>
                    </TableCell>
                  </MuiPickersUtilsProvider>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer className="orderTable">
            <Table>
              {data.map((order) => {
                return (
                  <TableBody>
                    <TableRow key={order.id} className="orderTableRow">
                      <TableCell>
                        {format(
                          parse(order.date, "yyyy-MM-dd", new Date()),
                          "dd.MM.yyyy"
                        )}
                      </TableCell>
                      <TableCell>{order.contract_number}</TableCell>
                      <TableCell>Podepsaná objednávka</TableCell>
                      <TableCell>{order.sum}&nbsp;Kč</TableCell>
                      <TableCell>
                        <IconButton
                          className="delete-button"
                          onClick={() =>
                            setConfirmData(
                              0,
                              order.id,
                              order.contract_number,
                              order.sum
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    {order.Invoice.map((invoice) => {
                      return (
                        <TableRow key={order.contract_number+";"+invoice.id} className="orderTableRow">
                          <TableCell>
                            {format(
                              parse(invoice.date, "yyyy-MM-dd", new Date()),
                              "dd.MM.yyyy"
                            )}
                          </TableCell>
                          <TableCell>{order.contract_number}</TableCell>
                          <TableCell>Zaplacená faktura</TableCell>
                          <TableCell>{invoice.sum}&nbsp;Kč</TableCell>
                          <TableCell>
                            <IconButton
                              className="delete-button"
                              onClick={() =>
                                setConfirmData(
                                  1,
                                  invoice.id,
                                  order.contract_number,
                                  invoice.sum
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                );
              })}
            </Table>
          </TableContainer>
        </form>
      </CardContent>
    </Card>
  );
};

export default Orders;
