import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Divider
} from "@material-ui/core";

import axios from "axios";
import { format, parse } from "date-fns";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import cs from "date-fns/locale/cs";

import "./Calendar.css";

import ConfirmDialog from "../CompanyDetails/ConfirmDialog";



const EventsOfTheDay = (props) => {
  const { date, open, setOpen, token } = props;

  const [data, setData] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState(null);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  async function fetchData() {
    await axios
      .get("http://127.0.0.1:8000/user/events?date=" + date, {
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
  }, [refresh]);

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
      });
  };
  const handleStatusEvent = (id, active) => {
    axios
      .put(
        "http://127.0.0.1:8000/event/" + id + "/",
        { is_active: active },
        {
          headers: { Authorization: "Token " + token },
        }
      )
      .then(() => {
        setRefresh((prev) => !prev);
      });
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
      <Dialog open={open} onClose={() => setOpen(false)} className="dialogEventsDay">
        <DialogTitle
          style={{ textTransform: "capitalize" }}
          id="alert-dialog-title"
        >
          <Typography variant="h4">
            {format(parse(date, "yyyy-MM-dd", new Date()), "EEEE dd.MM.yyyy", {
              locale: cs,
            })}
          </Typography>
        </DialogTitle>
        <DialogContent className="eventsDayContent">
          <div className="eventsday-header">
            <Typography variant="h6">Připomínky</Typography>
            <IconButton
              className="plus-button"
              size="small"
            >
              <AddIcon style={{ fill: "white" }} />
            </IconButton>
          </div>
          <Divider/>
          <TableContainer className="eventsday-table">
            <Table>
              <TableBody>
                {data.map((event) => (
                  <TableRow key={event.id}>
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
                            checked={!event.is_active}
                            color="primary"
                            onClick={() =>
                              handleStatusEvent(event.id, !event.is_active)
                            }
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default EventsOfTheDay;