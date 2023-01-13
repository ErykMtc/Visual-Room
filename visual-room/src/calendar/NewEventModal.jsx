import React, { useState, useEffect } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import moment from 'moment';

const NewEventModal = ({ reservation, onClose }) => {
  const [reserv, setReserv] = useState('');
  const [error, setError] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const controller = new AbortController();
    console.log(reservation);
    const res = axiosPrivate.get('/reservation/' + reservation, {
      signal: controller.signal
    }).then((response) => {
      // console.log(response.data);
      setReserv(response.data);
      });
      // console.log(res.data);
    // console.log("aaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbb")
  }, []);

  if(!reserv) return null;

  return(
    <>
      <div className="calendar-info">
        <h2>Rezerwacja sali {reserv.room.name}</h2>
        <span> <span>Data początkowa:</span> {moment(reserv.datestart).format('YYYY-MM-DD HH:mm')}</span>
        <span><span>Data końcowa:</span> {moment(reserv.dateend).format('YYYY-MM-DD HH:mm')}</span>
        <span><span>Grupa studentów:</span> {reserv.studentgroup.name} , rok: {reserv.studentgroup.year}</span>
        <span><span>Ilość studentów:</span> {reserv.studentgroup.amount}</span>

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

        <span className='calendar-info-btn'>
        <button 
          onClick={onClose}
          id="cancelButton">Cancel</button>
        </span>
        
      </div>

      <div id="modalBackDrop"></div>
    </>
  );
};

export default NewEventModal;