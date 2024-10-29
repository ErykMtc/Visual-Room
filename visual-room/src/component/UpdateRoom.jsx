import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import moment from "moment";

const UpdateRoom = ({ room, onClose }) => {
  const [name, setName] = useState(room.name);
  const [type, setType] = useState(room.type);
  const [capacity, setCapacity] = useState(room.capacity);

  const axiosPrivate = useAxiosPrivate();

  const updateClick = async (e) => {
  
    var rese = {
        "id": room._id,
        "name": name,
        "type": type,
        "capacity": capacity
    }
  
    const res = await axiosPrivate.put('/room' , rese , {
    }).then((response) => {
    }).catch(function (error) {
      alert('Zmiana niemożliwa');
    });
  }

  return (
    <>
      <div className="calendar-info">
        <h2>Sala {room.name}</h2>

        <span>
          <span>Nazwa:</span>{" "}
          <input
            type="text"
            id="start"
            name="trip-start"
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></input>
        </span>

        <span>
          <span>Typ:</span>{" "}
          <input
            type="text"
            id="start-time"
            name="appt"
            onChange={(e) => setType(e.target.value)}
            value={type}
          ></input>
        </span>

        <span>
          <span>Pojemność:</span>{" "}
          <input
            type="number"
            id="end-time"
            name="appt"
            onChange={(e) => setCapacity(e.target.value)}
            value={capacity}
          ></input>
        </span>


        <span className="calendar-info-btn">
          <button onClick={onClose} id="cancelButton">
            Cancel
          </button>
          <button onClick={(e) => updateClick().then(onClose)} id="cancelButton">
            Aktualizuj
          </button>
        </span>
      </div>

      <div id="modalBackDrop"></div>
    </>
  );
};

export default UpdateRoom;
