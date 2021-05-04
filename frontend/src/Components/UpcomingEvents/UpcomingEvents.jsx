import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Checkbox,
} from "@material-ui/core";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import { format, parse, formatDistanceStrict } from "date-fns";

import axios from "axios";

import "./UpcomingEvents.css";

import ConfirmDialog from "../CompanyDetails/ConfirmDialog";
import EventDialog from "../Calendar/EventDialog";

import CheckBoxIcon from '@material-ui/icons/CheckBox';

const UpcomingEvents = ({
  upcomingRefresh,
  token,
  setRefreshEvents,
  maxHeight,
  height,
}) => {
  const [data, setData] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState(null);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const [eventId, setEventId] = React.useState(-1);
  const [editing, setEditing] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);

  const showNewEventDialog = () => {
    setEditing(false);
    setEventId(-1);
    setOpenForm(true);
  };

  const showEditEventDialog = (item) => {
    setEditing(true);
    setEventId(item.id);
    setOpenForm(true);
  };

  async function fetchData() {
    await axios
      .get("/api/user/events/?is_active=True", {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => {
        res.data.sort(function (a, b) {
          return (
            parse(a.date + " " + a.time, "yyyy-MM-dd HH:mm:ss", new Date()) -
            parse(b.date + " " + b.time, "yyyy-MM-dd HH:mm:ss", new Date())
          );
        });
        setData(res.data);
      });
  }

  React.useEffect(() => {
    fetchData();
  }, [refresh, upcomingRefresh]);

  const handleConfirmOpen = (itemID) => {
    setDeleteID(itemID);
    setConfirmOpen(true);
  };

  const handleDeleteEvent = () => {
    axios
      .delete("/api/event/" + deleteID+"/", {
        headers: { Authorization: "Token " + token },
      })
      .then(() => {
        setRefresh((prev) => !prev);
        if (setRefreshEvents) setRefreshEvents((prev) => !prev);
      });
  };

  const handleDisableEvent = (id) => {
    axios
      .put(
        "/api/event/" + id + "/",
        { is_active: "False" },
        {
          headers: { Authorization: "Token " + token },
        }
      )
      .then(() => {
        setRefresh((prev) => !prev);
        if (setRefreshEvents) setRefreshEvents((prev) => !prev);
      });
  };

  const isClose = (date, time) => {
    var count = formatDistanceStrict(
      parse(date + " " + time, "yyyy-MM-dd HH:mm:ss", new Date()),
      new Date(),
      {
        unit: "day",
        addSuffix: true,
      }
    );
    if (count.includes("ago")) {
      return true;
    }
    return false;
  };

  return (
    <>
      <ConfirmDialog
        title="Odstranění události!"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() => handleDeleteEvent()}
      >
        Chcete tuto událost odstranit ze systému?
      </ConfirmDialog>
      <EventDialog
        eventId={eventId}
        isEditing={editing}
        token={token}
        open={openForm}
        setOpen={setOpenForm}
        refreshEvents={setRefresh}
      />
      <div className="upcoming-header">
        <Typography variant="h5">Připomínky</Typography>
        <IconButton
          className="plus-button"
          size="small"
          onClick={showNewEventDialog}
        >
          <AddIcon style={{ fill: "white" }} />
        </IconButton>
      </div>
      <TableContainer
        className="upcomingevents-table"
        style={{ maxHeight: maxHeight, height: height }}
      >
        <Table>
          <TableBody>
            {data.map((event) => (
              <TableRow
                key={event.id}
                className={isClose(event.date, event.time) ? "close" : ""}
                onClick={() => showEditEventDialog(event)}
              >
                <TableCell>
                  <div className="eventsgrid">
                    <div className="name">
                      <Typography variant="h6">{event.name}</Typography>
                    </div>
                    <div className="date">
                      {format(
                        parse(event.date, "yyyy-MM-dd", new Date()),
                        "dd.MM.yyyy"
                      ) +
                        ", " +
                        format(
                          parse(event.time, "HH:mm:ss", new Date()),
                          "HH:mm"
                        )}
                    </div>
                    <div>
                      <IconButton
                        className="delete-button"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfirmOpen(event.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                    <div className="description">{event.description}</div>
                    <div className="reminder">
                      <Checkbox
                        className="activeCheck"
                        checked={!event.is_active}
                        icon={<CheckBoxIcon />}
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDisableEvent(event.id);
                        }}
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UpcomingEvents;
