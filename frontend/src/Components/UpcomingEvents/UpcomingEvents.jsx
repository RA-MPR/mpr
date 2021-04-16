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

const UpcomingEvents = ({ upcomingRefresh, token, setRefreshEvents, user }) => {
  const [data, setData] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState(null);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [active, setActive] = React.useState(false); //event bude mít field active (true/false)

  const showNewEventDialog = () => {
    console.log("TODO Show new event");
  };

  async function fetchData() {
    await axios
      .get("http://127.0.0.1:8000/event", {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => {
        res.data.sort(function (a, b) {
          return (
            parse(a.date, "yyyy-MM-dd", new Date()) -
            parse(b.date, "yyyy-MM-dd", new Date())
          );
        });
        setData(res.data);
      });
  }

  React.useEffect(() => {
    fetchData();
  }, [refresh, upcomingRefresh]);

  const handleAddEvent = () => {
    console.log("TODO handleAddEvent");
  };

  const handleConfirmOpen = (itemID) => {
    setDeleteID(itemID);
    setConfirmOpen(true);
  };

  const handleDeleteEvent = () => {
    axios
      .delete("http://127.0.0.1:8000/event/" + deleteID, {
        headers: { Authorization: "Token " + token },
      })
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
      <form onSubmit={handleAddEvent}>
        <TableContainer className="upcomingevents-table">
          <Table>
            <TableBody>
              {data.map((event) => (
                <TableRow
                  key={event.id}
                  className={isClose(event.date, event.time) ? "close" : ""}
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
                          onClick={() => {
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
                          checked={active}
                          color="primary"
                          onChange={() => setActive(!active)}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </form>
    </>
  );
};

export default UpcomingEvents;
