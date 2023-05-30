import React, { useContext, useState } from "react";
import { CalendarContext } from "./CalendarContext";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import AddEventForm from "./AddEventForm";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { TextField } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import "./style.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const WeeklyCalendar = () => {
  const { events, addEvent, deleteEvent } = useContext(CalendarContext);
  const [open, setOpen] = React.useState(false);
  // const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState({
    backgroundColor: "lightpink",
  });

  const colorOptions = [
    { label: "Pink", value: "lightpink" },
    { label: "Yellow", value: "yellow" },
    { label: "Green", value: "lightgreen" },
    { label: "Blue", value: "lightblue" },
  ];

  const handleBackgroundColorChange = (e) => {
    setSelectedEvent((prevEvent) => ({
      ...prevEvent,
      backgroundColor: e.target.value,
    }));
  };
  const handleClickOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const weekdays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  const times = [
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
  ];

  const getEvents = (day, time) => {
    return events.filter(
      (event) =>
        event.day === day &&
        times.indexOf(event.startTime) <= times.indexOf(time) &&
        times.indexOf(event.endTime) > times.indexOf(time)
    );
  };

  const getEventStyle = (day, time) => {
    const eventsForTime = getEvents(day, time);
    if (eventsForTime.length > 0) {
      const backgroundColor = eventsForTime[0].backgroundColor;
      return { backgroundColor };
    }
    return {};
  };

  const handleDeleteEvent = () => {
    deleteEvent(selectedEvent.id);
    handleClose();
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Project Planning" {...a11yProps(0)} />
            <Tab label="Weekly Planning" {...a11yProps(1)} />
            <Tab label="Planning Insights" {...a11yProps(2)} />
            <div class="search__container">
              <input
                class="search__input"
                type="text"
                placeholder="Search for projects"
              />
            </div>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <h1 className="text-center">Project Planning</h1>
        </TabPanel>
        <TabPanel value={value} index={1} className="table-container">
          <div className="weekly-calendar">
            <div className="weekly-sub">
              <div>
                {" "}
                <p>
                  {" "}
                  <span style={{ fontSize: "20px", fontWeight: "600" }}>
                    April 10-17{" "}
                  </span>{" "}
                  <ArrowBackIosIcon style={{ fontSize: "14px" }} /> Today{" "}
                  <ArrowForwardIosIcon style={{ fontSize: "14px" }} />{" "}
                </p>
              </div>
              <Button
                className="periodBtn"
                style={{ borderRadius: 50 }}
                variant="outlined"
                onClick={() => handleClickOpen(null)}
              >
                <AddIcon /> Add Period
              </Button>
            </div>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleClose}
              >
                {selectedEvent ? "Event Details" : "Add Period"}
              </BootstrapDialogTitle>
              <DialogContent dividers>
                {selectedEvent ? (
                  <div>
                    <div>
                      <label htmlFor="title">
                        {" "}
                        <b>
                          <small>Period Name</small>
                        </b>
                      </label>
                      <br />
                      <TextField
                        size="small"
                        type="text"
                        id="title"
                        fullWidth
                        value={selectedEvent.description || ""}
                        onChange={(e) =>
                          setSelectedEvent((prevEvent) => ({
                            ...prevEvent,
                            repeat: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <Row className="timeRow">
                      <Col>
                        <div>
                          <label htmlFor="startTime">
                            {" "}
                            <b>
                              <small>Start Time:</small>
                            </b>
                          </label>
                          <br />
                          <TextField
                            size="small"
                            type="text"
                            id="startTime"
                            value={selectedEvent.startTime || ""}
                            onChange={(e) =>
                              setSelectedEvent((prevEvent) => ({
                                ...prevEvent,
                                startTime: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </Col>
                      <Col className="end-col">
                        <div>
                          <label htmlFor="endTime">
                            {" "}
                            <b>
                              <small>End Time:</small>
                            </b>
                          </label>
                          <br />
                          <TextField
                            size="small"
                            type="text"
                            id="endTime"
                            value={selectedEvent.endTime || ""}
                            onChange={(e) =>
                              setSelectedEvent((prevEvent) => ({
                                ...prevEvent,
                                endTime: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </Col>
                    </Row>

                    <div>
                      <br />
                      <div className="bgColor">
                        <div className="color-palette">
                          {colorOptions.map((option) => (
                            <div
                              key={option.value}
                              className={`color-option ${
                                selectedEvent.backgroundColor === option.value
                                  ? "selected"
                                  : ""
                              }`}
                              style={{ backgroundColor: option.value }}
                              onClick={() =>
                                handleBackgroundColorChange(option.value)
                              }
                            ></div>
                          ))}
                        </div>

                        <Button
                          variant="outlined"
                          className="periodBtnOne"
                          style={{ borderRadius: 50 }}
                          onClick={() => handleDeleteEvent()}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <AddEventForm />
                )}
              </DialogContent>
            </BootstrapDialog>
            <div className="table-style">
              <table className="calendar-table">
                <thead>
                  <tr>
                    <th></th>
                    {weekdays.map((day) => (
                      <th key={day}>
                        <small>{day}</small>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {times.map((time) => (
                    <tr key={time}>
                      <td>{time}</td>
                      {weekdays.map((day) => (
                        <td
                          key={`${day}-${time}`}
                          style={getEventStyle(day, time)}
                          onClick={() => {
                            const eventsForTime = getEvents(day, time);
                            if (eventsForTime.length > 0) {
                              handleClickOpen(eventsForTime[0]);
                            } else {
                              handleClickOpen(null);
                            }
                          }}
                        >
                          {getEvents(day, time).map((event, index) => (
                            <div key={event.id}>
                              <small>
                                <b>{`Activity ${index + 1}`}</b>
                              </small>
                              <br />
                              <small>{event.description}</small>
                              <br />
                              <small>
                                {event.startTime} - {event.endTime}
                              </small>
                            </div>
                          ))}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h1 className="text-center">Planning Insights</h1>
        </TabPanel>
      </Box>
    </div>
  );
};

export default WeeklyCalendar;
