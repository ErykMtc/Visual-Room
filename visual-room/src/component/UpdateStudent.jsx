import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import moment from "moment";

const UpdateStudent = ({ student, onClose }) => {
  const [reserv, setReserv] = useState("");
  const [error, setError] = useState(false);

  const [name, setName] = useState(student.name);
  const [year, setYear] = useState(student.year);
  const [amount, setAmount] = useState(student.amount);

  const axiosPrivate = useAxiosPrivate();

  const updateClick = async (e) => {
  
    var rese = {
        "id": student._id,
        "name": name,
        "year": year,
        "amount": amount
    }
  
    const res = await axiosPrivate.put('/student' , rese , {
    }).then((response) => {
    }).catch(function (error) {
      alert('Zmiana niemożliwa');
    });
  }

  return (
    <>
      <div className="calendar-info">
        <h2>Student {student.name}</h2>

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
          <span>Rok:</span>{" "}
          <input
            type="number"
            id="start-time"
            name="appt"
            onChange={(e) => setYear(e.target.value)}
            value={year}
          ></input>
        </span>

        <span>
          <span>Ilość:</span>{" "}
          <input
            type="number"
            id="end-time"
            name="appt"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
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

export default UpdateStudent;
