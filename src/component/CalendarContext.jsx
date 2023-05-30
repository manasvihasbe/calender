import React, { createContext, useState } from "react";

const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const addEvent = (day, startTime, endTime, backgroundColor, description) => {
    const newEvent = {
      id: Date.now(),
      day,
      startTime,
      endTime,
      backgroundColor, 
      title: `Activity ${events.length + 1}`,
      description,
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  return (
    <CalendarContext.Provider value={{ events, addEvent, deleteEvent }}>
      {children}
    </CalendarContext.Provider>
  );
};

export { CalendarContext, CalendarProvider };
