import React, { useEffect, useState } from 'react';
import moment from 'moment';

const useDate = (events, nav) => {
  const [dateDisplay, setDateDisplay] = useState('');
  const [days, setDays] = useState([]);

  // funkcja porownujaca daty
  const eventForDate = date => {
    var arr = [];

    // daty do stringa w react z mongo format dd-mm-yyyy
    if (events !== null)
      for (let i = 0; i < events.length; i++) {
        // do arr dodac inne dane z pokoju takie jak data i dodac w formacie json
        if(events[i].room === null) console.log(events[i])
        if(moment(events[i].datestart).format('YYYY-MM-DD') === date && events[i].room !== null){
          arr.push({event: events[i].room.name, dates: moment(events[i].datestart).format("HH:mm"), datee: moment(events[i].dateend).format("HH:mm"), id: events[i]._id, idres: events[i].userreserv });

        }
          
      }
    if(arr.length === 0) return null;
    arr.sort((a,b) => a.dates.localeCompare(b.dates));
    return arr;
  }

  // console.log(eventForDate)

  useEffect(() => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dt = new Date();
    // console.log(dt)

    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    setDateDisplay(`${dt.toLocaleDateString('pl-PL', { month: 'long' })} ${year}`);
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);



    // console.log("lala",events.length)

    const daysArr = [];

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      var dayString = `${year}-${month + 1}-${i - paddingDays}`;
      dayString = moment(dayString).format('YYYY-MM-DD');
      // console.log("ggggggggggggg", dayString)

      if (i > paddingDays) {


        // console.log(eventForDate(dayString))

        daysArr.push({
          value: i - paddingDays,
          event: eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString,
        });
        // w else do wyświetlania pustych
      } else {
        daysArr.push({
          value: 'padding',
          event: null,
          isCurrentDay: false,
          date: '',
        });
      }
    }

    setDays(daysArr);
  }, [events, nav]);

  return {
    days,
    dateDisplay,
  };
};

export default useDate;