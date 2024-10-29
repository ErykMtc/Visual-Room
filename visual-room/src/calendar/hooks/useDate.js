import React, { useEffect, useState } from 'react';
import moment from 'moment';

const useDate = (events, nav) => {
  const [dateDisplay, setDateDisplay] = useState('');
  const [days, setDays] = useState([]);

  const eventForDate = date => {
    var arr = [];

    if (events !== null)
      for (let i = 0; i < events.length; i++) {
        if(events[i].room === null) console.log(events[i])
        if(moment(events[i].datestart).format('YYYY-MM-DD') === date && events[i].room !== null){
          arr.push({event: events[i].room.name, dates: moment(events[i].datestart).format("HH:mm"), datee: moment(events[i].dateend).format("HH:mm"), id: events[i]._id, idres: events[i].userreserv });
        }
          
      }
    if(arr.length === 0) return null;
    arr.sort((a,b) => a.dates.localeCompare(b.dates));
    return arr;
  }

  useEffect(() => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dt = new Date();

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

    const daysArr = [];

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      var dayString = `${year}-${month + 1}-${i - paddingDays}`;
      dayString = moment(dayString).format('YYYY-MM-DD');

      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          event: eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString,
        });
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