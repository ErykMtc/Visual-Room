import React from 'react';
import { useState } from 'react';
import NewEventModal from './NewEventModal';
import EventList from './EventList';

const Day = ({ day, onClick }) => {


  const [clicked, setClicked] = useState();
  const [allEvent, setAllEvent] = useState();
  const [reserv, setReserv] = useState();

  const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;
  
  return (
    <>
    <div onClick={onClick} className={className}>
      {day.value === 'padding' ? '' : day.value}

        {day.event && day.event.map((d, index) => {
          if(index < 3) return <div onClick={(e) => {
              setClicked(true);
              setReserv(d.id);
            }} key={index} className={'event' + (!d.idres ? '' : '-other-reserv')}>{d.event} ({d.dates} - {d.datee})</div>
          if(index === 3) return <span className='' onClick={(e) => {
            setAllEvent(true);
          }}>Pokaż więcej...</span>
          return <></>
          })}
    </div>

{
  clicked && 
  <NewEventModal
    onClose={() => {
      setClicked(null);
      setReserv(null);
    }}
    reservation = {reserv}
  />
}

{
  allEvent && 
  <EventList
    onClose={() => {
      setAllEvent(null);
    }}
    event = {day.event}
  />
}
</>
  );
};

export default Day;