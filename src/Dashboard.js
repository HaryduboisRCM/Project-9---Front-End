import React, { useState, useEffect } from "react";
import Add from "./Add";
import './App.css';


function Dashboard(props) {
  const [events, cEvents] = useState([]);
  const [current, cCurrent] = useState(undefined);

  const refreshList = () => {
    props.client.getEvents().then((response) => cEvents(response.data));
  };

  const removeEvent = (id) => {
    props.client.removeEvent(id).then(() => refreshList());
  };

  const updateEvent = (event) => {
    cCurrent(event);
  };

  useEffect(() => {
    refreshList();
  }, []);

  const buildrows = () => {
    return events.map((current) => {
      return (
        <tr key={current._id}>
          <td>{current.eventName}</td>
          <td>{current.eventLocation}</td>
          <td>{current.eventDetails}</td>
          <td>{current.eventDate}</td>
          <td>{current.price}</td>
          <td>
            <button onClick={() => removeEvent(current._id)}> remove</button>
            <button onClick={() => updateEvent(current)}> update</button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      Upcoming Bands
      <container className = "mainPage">
      <br />
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Location</th>
            <th>Event Details</th>
            <th>Event Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{buildrows()}</tbody>
      </table>
      <br />
      <br />
      <Add
        client={props.client}
        refreshList={() => {
          refreshList();
          cCurrent(undefined);
        }}
        currentEvent={current}
      />
      </container>
    </>
  );
}

export default Dashboard;
