import React, { useState } from "react";

function Add(props) {
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    let result;
    if (props.currentEvent) {
      result = props.client.updateEvent(
        props.currentEvent._id,
        e.target.eName.value,
        e.target.eLocation.value,
        e.target.eDetails.value,
        e.target.eDate.value,
        e.target.price.value
      );
    } else {
      result = props.client.addEvent(
        e.target.eName.value, 
        e.target.eLocation.value,
        e.target.eDetails.value, 
        e.target.eDate.value, 
        e.target.price.value);
    }
    result
      .then(() => {
        cDisabled(false);
        document.getElementById("addForm").reset();
        props.refreshList();
      })
      .catch(() => {
        alert("an error occured, please try again");
        cDisabled(false);
      });
  };

  return (
    <>
      <br />
      {props.currentEvent ? "Update" : "Add"}
      <br />
      <br />

      <form onSubmit={(e) => submitHandler(e)} id="addForm">
        Event Name: <br />
        <input
          type="text"
          defaultValue={props.currentEvent?.eventName}
          name="eName"
          disabled={disabled}
        />
        <br />       
        <br />
        Event Location: <br />
        <input
          type="text"
          defaultValue={props.currentEvent?.eventLocation}
          name="eLocation"
          disabled={disabled}
        />
        <br />       
        <br />
        Event Details: <br />
        <input
          type="text"
          defaultValue={props.currentEvent?.eventDetails}
          name="eDetails"
          disabled={disabled}
        />
        <br/>
        <br />  
        Event Date: DD/MM/YYY <br />        
        <input
          type="text"
          defaultValue={props.currentEvent?.eventDate}
          name="eDate"
          disabled={disabled}
        />
         <br />     
         <br />
        Price:
        <br />
        <br />
        <input
          type="text"
          defaultValue={props.currentEvent?.price}
          name="price"
          disabled={disabled}
        />
        <br />
        <br />
        <button type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </button>
      </form>
    </>
  );
}

export default Add;
