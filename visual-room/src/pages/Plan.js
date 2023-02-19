import { Link, useMatch, useResolvedPath } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRef, useState, useEffect, useContext } from 'react';
import CalendarHeader from "../calendar/CalendarHeader";
import Day from "../calendar/Day";
import NewEventModal from "../calendar/NewEventModal";
import DeleteEventModal from "../calendar/EventList";
import useDate from "../calendar/hooks/useDate";
import './Plan.css';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function Plan() {

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();


  const [nav, setNav] = useState(0);
  const [displayEvents, SetDisplayEvents] = useState(null);
  // const [events, setEvents] = useState(
  //   localStorage.getItem('events') ?
  //     JSON.parse(localStorage.getItem('events')) :
  //     []
  // );

  const [events, setEvents] = useState(null);
  const [allEvents, setAllEvents] = useState(null);
  const [stud, setStud] = useState(null);
  const [room, setRoom] = useState(null);
  const [changeRoom, setChangeRoom] = useState('');
  const [changeStudent, setChangeStudent] = useState('');
  const [mainDate, setMainDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reservType, setReservType] = useState('0');
  const [isAllReserv, setIsAllReserv] = useState(null);
  const [mainDateEnd, setMainDateEnd] = useState('');
  const [users, setUsers] = useState('');
  const [selectUser, setSelectUser] = useState('');


  // console.log("rooooom", endDate);


  const reservClick = async (e) => {

    var temp = mainDate + "T" + startDate;
    var temp2 = mainDate + "T" + endDate;

    // temp.localeCompare(temp2)
    // moment(temp2).isAfter(moment(temp))

    if (!moment(temp2).isAfter(moment(temp))) {
      toast.error("Niepoprawna data!");
      return;
    }

    // console.log("gggg room",changeRoom._id,"gggg stud", changeStudent)

    // if(changeRoom.length !== 2 && changeStudent.length !== 2){
    //   alert('Coś poszło nie tak');
    //   return;
    // }

    // if(changeRoom[1] < changeStudent[1]){
    //   alert('Sala jest za mała na pomieszczenie tej grupy');
    //   return;
    // }

    // console.log(moment(temp2).isAfter(moment(temp)));
    var reservation = {
      "datestart": temp,
      "dateend": temp2,
      "room": changeRoom,
      "studentgroup": changeStudent,
      "user": auth.userid
    }

    if (selectUser) {
      reservation = {
        "datestart": temp,
        "dateend": temp2,
        "room": changeRoom,
        "studentgroup": changeStudent,
        "user": auth.userid,
        "userReserv": selectUser
      }
    }




    console.log(reservation);
    console.log("jestem");

    if (reservType === '0') {
      axiosPrivate.post('/reservation', reservation, {
      }).then((response) => { toast.success("Wprowadzono!"); }).catch(function (error) {
        toast.error("Rezerwacja niemożliwa!");
      });
    } else {
      var endTemp = mainDateEnd + "T" + endDate;
      if (!moment(endTemp).isAfter(moment(temp))) {
        toast.error("Złe wartości daty!");
        return;
      }

      var weeks = moment(endTemp).diff(temp, 'week') + 1;
      var type = 7;
      if (reservType === '2') {
        type = 14;
        weeks = Math.floor((moment(endTemp).diff(temp, 'week')) / 2) + 1;
      }
      console.log(weeks)

      reservation = {
        "datestart": temp,
        "dateend": temp2,
        "room": changeRoom,
        "studentgroup": changeStudent,
        "user": auth.userid,
        "count": weeks,
        "type": type
      }

      if (selectUser) {
        reservation = {
          "datestart": temp,
          "dateend": temp2,
          "room": changeRoom,
          "studentgroup": changeStudent,
          "user": auth.userid,
          "count": weeks,
          "type": type,
          "userReserv": selectUser
        }
      }

      var respons = axiosPrivate.post('/reservation/create', reservation, {}).then((response) => {toast.success("Wprowadzono!");}).catch(function (error) {
        toast.error("Rezerwacja niemożliwa!");
      });

    }

  }



  useEffect(() => {
    const userid = auth.userid;
    const controller = new AbortController();
    const res = axiosPrivate.get('/reservation/user/' + userid, {
      signal: controller.signal
    }).then((response) => {
      setEvents(response.data);
      setIsAllReserv(response.data);
    });
  }, []);

  useEffect(() => {

    const res = axiosPrivate.get('/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  useEffect(() => {
    const userid = auth.userid;
    const res = axiosPrivate.get('/reservation', {
    }).then((response) => {
      setAllEvents(response.data);
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const res = axiosPrivate.get('/room', {
      signal: controller.signal
    }).then((response) => {
      setRoom(response.data);
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const res = axiosPrivate.get('/student', {
      signal: controller.signal
    }).then((response) => {
      setStud(response.data);
    });
  }, []);

  // console.log(auth.roles.find(role => role == "2001"))


  // const refresh = async (e) => {
  //   const getRes = async () => {
  //     try {
  //         const response = await axiosPrivate.get("/reservation", {
  //         }).then((res)=> {
  //           setEvents(res.data);
  //         });
  //     } catch (err) {
  //         console.error(err);
  //     }
  // }

  // getRes();  
  // setEvents(events.slice()); 
  // }



  const { days, dateDisplay } = useDate(isAllReserv, nav);

  if (!events || !allEvents || !stud || !room || !isAllReserv) return <div class="loader"></div>;


  return (
    <>
      <Container>
        {auth.roles.find(role => (role == "9999" || role == "2000" || role == "2002")) ? <>
        <ToastContainer />
        <h2 class="decorated"><span>Dodaj Rezerwacje</span></h2>
        <Row>
          <Col>
            <form>
              <div className="plan-reserv-header">
                <div>

                </div>

                <div>

                </div>

                <div>

                </div>
              </div>

              <div className="plan-reserv">
                <div className="plan-reserv-sec">
                  <label for="start">Data rezerwacji:</label>
                  <input type="date" id="start" name="trip-start" onChange={(e) => setMainDate(e.target.value)} value={mainDate}></input>
                </div>

                <div className="plan-reserv-sec">
                  <label for="start-time">Godzina początkowa:</label>
                  <input type="time" id="start-time" name="appt" onChange={(e) => setStartDate(e.target.value)} value={startDate}></input>
                </div>

                <div className="plan-reserv-sec">
                  <label for="end-time">Godzina końcowa:</label>
                  <input type="time" id="end-time" name="appt" onChange={(e) => setEndDate(e.target.value)} value={endDate}></input>
                </div>
              </div>

              <div className="plan-reserv-select">

                <div className="plan-reserv-select-sec">
                  <label for="rooms">Wybierz sale:</label>
                  <select name="room" id="rooms" onChange={(e) => setChangeRoom(e.target.value)} value={changeRoom}>
                    <option value="">-- Wybierz --</option>
                    {room.map((item, iteration) =>
                      <option value={item._id}>{item.name} - {item.type} - {item.capacity}</option>
                    )}
                  </select>
                </div>

                <div className="plan-reserv-select-sec">
                  <label for="students">Wybierz grupe:</label>
                  <select name="student" id="students" onChange={(e) => setChangeStudent(e.target.value)} value={changeStudent}>
                    <option value="">-- Wybierz --</option>
                    {stud.map((item, iteration) =>
                      <option value={item._id}>{item.name} - {item.year} - {item.amount}</option>
                    )}
                  </select>
                </div>

                <div className="plan-reserv-select-sec">
                  <label for="res-type">Cyklicznie:</label>
                  <select name="student" id="res-type" onChange={(e) => setReservType(e.target.value)} value={reservType}>
                    <option value="0">Jednorazowo</option>
                    <option value="1">Co tydzień</option>
                    <option value="2">Co dwa tygodnie</option>
                  </select>
                </div>
              </div>

              <div className="special-div">
                {reservType !== "0" ? <div className="special-div-content">
                  <label for="end-date">Data końcowa:</label>
                  <input type="date" id="end-date" name="trip-start" onChange={(e) => setMainDateEnd(e.target.value)} value={mainDateEnd}></input>
                </div> : <></>}

                {auth.roles.find(role => (role == "9999" || role == "2002")) ? <select name="student" id="res-type" className="special-div-content" onChange={(e) => setSelectUser(e.target.value)} value={selectUser}>
                  <option value="">Dla siebie</option>
                  {users.map((item, iteration) =>
                    auth.userid !== item._id ?
                      <option value={item._id}>{item.firstname} {item.lastname}</option> :
                      <></>
                  )}
                </select> : <></>}
              </div>
            </form>

            <div className="plan-reserv-btn">
              <button onClick={(e) => reservClick()}>Dodaj</button>
            </div>

          </Col>
        </Row>
        </> : <></>}
        <h2 class="decorated"><span>Wizualizacja</span></h2>
      </Container>



      <div className="plan-main">
        <div id="container">
          <CalendarHeader
            dateDisplay={dateDisplay}
            onNext={() => setNav(nav + 1)}
            onBack={() => setNav(nav - 1)}
            myReserv={() => setIsAllReserv(events)}
            allReserv={() => setIsAllReserv(allEvents)}
          />

          <div id="weekdays">
            <div>Niedziela</div>
            <div>Poniedziałek</div>
            <div>Wtorek</div>
            <div>Środa</div>
            <div>Czwartek</div>
            <div>Piątek</div>
            <div>Sobota</div>
          </div>

          <div id="calendar">
            {days.map((d, index) => (
              <Day
                key={index}
                day={d}
                onClick={() => {
                  // if (d.value !== 'padding') {
                  //   setClicked(d.date);
                  // }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}