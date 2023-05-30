import React, { useState, useContext } from "react";
import { CalendarContext } from "./CalendarContext";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { Col, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import './style.css'


const AddEventForm = () => {
  const { addEvent } = useContext(CalendarContext);

  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  const [backgroundColor, setBackgroundColor] = useState("lightpink");

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDaysData = selectedDays.map((day) => ({
      name: day.name,
      avatar: day.avatar,
    }));
    selectedDays.forEach((day) => {
      addEvent(day, startTime, endTime, backgroundColor, description);
    });
    setSelectedDays([]);
    setStartTime("");
    setEndTime("");
    setBackgroundColor("lightpink"); 
    setDescription(""); 
  };

  const handleDayChange = (day) => {
    const isSelected = selectedDays.includes(day);
    let updatedSelectedDays;

    if (isSelected) {
      updatedSelectedDays = selectedDays.filter(
        (selectedDay) => selectedDay !== day
      );
    } else {
      updatedSelectedDays = [...selectedDays, day];
    }

    setSelectedDays(updatedSelectedDays);
  };

  const getAvatarStyle = (day) => {
    return {
      border: selectedDays.includes(day) ? "3px solid black" : undefined,
    };
  };

  const colorOptions = [
    { label: "Pink", value: "lightpink" },
    { label: "Yellow", value: "yellow" },
    { label: "Green", value: "lightgreen" },
    { label: "Blue", value: "lightblue" },
  ];

  const timeOptions = [
    "Please select start time", 
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

  const endTimeOptions = [
    "Please select End time", 
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

  const weekdays = [
    { name: "Mon", avatar: <Avatar>M</Avatar> },
    { name: "Tue", avatar: <Avatar>T</Avatar> },
    { name: "Wed", avatar: <Avatar>W</Avatar> },
    { name: "Thur", avatar: <Avatar>T</Avatar> },
    { name: "Fri", avatar: <Avatar>F</Avatar> },
    { name: "Sat", avatar: <Avatar>S</Avatar> },
    { name: "Sun", avatar: <Avatar>S</Avatar> },
  ];

  return (
    <div className="add-event-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
            <b>
              <small>Period Name</small>
            </b>
          </label>
          <br />
          <TextField
            size="small"
            id="description"
            type="text"
            placeholder="Enter Period Name"
            value={description}
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <br />
        <label>
          <b>
            <small>Repeat on days</small>
          </b>
        </label>
        <div className="repeat-days">
          {weekdays.map((weekday) => (
            <div
              key={weekday.name}
              className={`day-option ${
                selectedDays.includes(weekday.name) ? "selected" : ""
              }`}
              onClick={() => handleDayChange(weekday.name)}
              style={{ margin: "0 5px" }}
            >
              <Avatar style={getAvatarStyle(weekday.name)}>
                {weekday.avatar}
              </Avatar>
            </div>
          ))}
        </div>
        <br />
        <Row className="timeRow">
          <Col>
            <div>
              <label htmlFor="start-time">
                <b>
                  <small>Start Time:</small>
                </b>
              </label>
              <br />
              <select
                className="selectOption"
                id="start-time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </Col>
          <Col className="end-col">
            <div>
              <label htmlFor="end-time">
                <b>
                  <small>End Time:</small>
                </b>
              </label>
              <br />
              <select
                className="selectOption"
                id="end-time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              >
                {endTimeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </Col>
        </Row>

        <br />
        <div className="bgColor">
          <div className="color-palette">
            {colorOptions.map((option) => (
              <div
                key={option.value}
                className={`color-option ${
                  backgroundColor === option.value ? "selected" : ""
                }`}
                style={{ backgroundColor: option.value }}
                onClick={() => setBackgroundColor(option.value)}
              ></div>
            ))}
          </div>
          <Button
            type="submit"
            className="periodBtnOne"
            style={{ borderRadius: 50 }}
            variant="outlined"
          >
            <AddIcon /> Add Period
          </Button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default AddEventForm;
