import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import moment from "moment";

const UpdateReserv = ({ reservation, onClose }) => {
  const [reserv, setReserv] = useState("");
  const [error, setError] = useState(false);

  const [mainDate, setMainDate] = useState(moment(reservation.datestart).format('YYYY-MM-DD'));
  const [startDate, setStartDate] = useState(moment(reservation.datestart).format('HH:mm'));
  const [endDate, setEndDate] = useState(moment(reservation.dateend).format('HH:mm'));

  const axiosPrivate = useAxiosPrivate();

  const updateClick = async (e) => {
    var temp = mainDate + "T" + startDate;
    var temp2 = mainDate + "T" + endDate;
  
    if(!moment(temp2).isAfter(moment(temp))){
      alert('Złe wartości daty');
      return;
    }
  
    var rese = {
        "id": reservation._id,
        "datestart": temp,
        "dateend": temp2
    }
  
    const controller = new AbortController();
    const res = axiosPrivate.put('/reservation' , rese , {
      signal: controller.signal
    }).then((response) => {
        // mozna dodac pobieranie danych zeby odswierzyc
    }).catch(function (error) {
      alert('Rezerwacja niemożliwa');
    });
  }

  return (
    <>
      <div className="calendar-info">
        <h2>Rezerwacja sali {reservation.room.name}</h2>

        <span>
          <span>Data rezerwacji:</span>{" "}
          <input
            type="date"
            id="start"
            name="trip-start"
            onChange={(e) => setMainDate(e.target.value)}
            value={mainDate}
          ></input>
        </span>

        <span>
          <span>Godzina początkowa:</span>{" "}
          <input
            type="time"
            id="start-time"
            name="appt"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
          ></input>
        </span>

        <span>
          <span>Godzina końcowa:</span>{" "}
          <input
            type="time"
            id="end-time"
            name="appt"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
          ></input>
        </span>

        {/* <button 
          onClick={() => {
            if (title) {
              setError(false);
              onSave(title);
            } else {
              setError(true);
            }
          }} 
          id="saveButton">Save</button> */}

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

export default UpdateReserv;
