import React from "react";
import { useState } from "react";
import NewEventModal from "./NewEventModal";

const EventList = ({ event, onClose }) => {
  const [clicked, setClicked] = useState();
  const [reserv, setReserv] = useState();

  return (
    <>
      <div>
        <div className="calendar-list-info">
          {event.map((d, index) => (
            <div
              className="calendar-event-list"
              key={index}
              onClick={(e) => {
                setClicked(true);
                setReserv(d.id);
              }}
            >
              {d.event} ({d.dates} - {d.datee})
            </div>
          ))}

          <span className="calendar-info-btn">
            <button onClick={onClose} id="cancelButton">
              Cancel
            </button>
          </span>
        </div>

        <div className="calendar-list-back-drop"></div>
      </div>

      {clicked && (
        <NewEventModal
          onClose={() => {
            setClicked(null);
            setReserv(null);
          }}
          reservation={reserv}
        />
      )}
    </>
  );
};

export default EventList;
