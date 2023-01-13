import React from 'react';

const CalendarHeader = ({ myReserv, allReserv, onNext, onBack, dateDisplay }) => {
  return(
    <div className="plan-header">
      <div className="monthDisplay">{dateDisplay}</div>
      <div>
        <button onClick={myReserv} id="backButton">Moje</button>
        <button onClick={allReserv} id="nextButton">Całość</button>
      </div>
      <div>
        <button onClick={onBack} id="backButton">Back</button>
        <button onClick={onNext} id="nextButton">Next</button>
      </div>
    </div>
  );
};

export default CalendarHeader;