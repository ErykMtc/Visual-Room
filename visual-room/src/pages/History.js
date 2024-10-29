import { useRef, useState, useEffect, useContext, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UpdateReserv from '../component/UpdateReserv';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import './History.css';

import useAuth from '../hooks/useAuth';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faClock, faTrash, faPenNib, faDoorOpen, faChartPie, faSearch, faUsers } from '@fortawesome/free-solid-svg-icons'

export default function History() {


  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const [events, setEvents] = useState(null);
  var [start, setStart] = useState(0);
  var [filter, setFilter] = useState(0);
  const [clicked, setClicked] = useState('');
  const [updateData, setUpdadeData] = useState('');
  var [norFilterEvents, setNotFilterEvents] = useState('');

  async function deleteRes(idres){

    var tempost = events;
    var tempost2 = norFilterEvents;
    tempost = events.filter(item => item._id != idres);
    tempost2 = norFilterEvents.filter(item => item._id != idres);
    setEvents(tempost);
    setNotFilterEvents(tempost2);
}

  const deleteClick = async (delid) => {
    const controller = new AbortController();
    const res = axiosPrivate.delete('/reservation', {
      data: { "id": delid },
      signal: controller.signal
    }).then((response) => {
      deleteRes(delid);
    });

  }

  const confirmDelete = async (delid) => {
    await confirmAlert({
      title: 'Ostrzeżenie',
      message: 'Czy napewno chcesz usunąć?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {deleteClick(delid)}
        },
        {
          label: 'No',
          onClick: () => {return;}
        }
      ]
    });
  }


  useEffect(() => {
    const userid = auth.userid;
    const controller = new AbortController();
    const res = axiosPrivate.get('/reservation/user/' + userid, {
      signal: controller.signal
    }).then((response) => {
      setEvents(response.data);
      setNotFilterEvents(response.data);
    });
  }, []);

  useEffect(() => {
    
  }, [events]);

  
  const refresh = async (e) => {
    const userid = auth.userid;
    const getRes = async () => {
      try {
          const response = await axiosPrivate.get("/reservation/user/" + userid, {
          }).then((res)=> {
            setEvents(res.data);
            setNotFilterEvents(res.data);
            
            
          });
          
      } catch (err) {
          console.error(err);
      }


  }

  getRes();

  setEvents(events.slice());
  
  }


  if (!events || !norFilterEvents) return <div class="loader"></div>;


  const sortByName = () => {
    if(filter === ''){
      setEvents(norFilterEvents);
    } else {
      setEvents(norFilterEvents.filter((item) => item.room.name.startsWith(filter)));
    }
  }

  return (
    <>
      <div className='history-main'>
        <Container>
          <Row>
            <Col>
            <h2 class="decorated"><span>Moje Rezerwacje</span></h2>
              <div className='history-filter-header'>
                <div className='history-filter-header-txt'>Filtry</div>
              <div className='history-filter'>
                <div className='history-filter-pointer' 
                onClick={(e) => {
                    setEvents(events.slice().sort((a, b) => a.room.name.localeCompare(b.room.name)));
                }}>
                  <FontAwesomeIcon icon={faDoorOpen} size='3x' />
                </div>
                <div className='history-filter-pointer' 
                onClick={(e) => {
                  setEvents(events.slice().sort((a, b) => a.datestart.localeCompare(b.datestart)));
                }}>
                  <FontAwesomeIcon icon={faChartPie} size='3x' />
                </div>
                <div className='history-filter-pointer' 
                onClick={(e) => setEvents(events.slice().sort((a, b) => a.studentgroup.name.localeCompare(b.studentgroup.name)))}>
                  <FontAwesomeIcon icon={faUsers} size='3x' />
                </div>
                <div>
                  <form className="search-section">
                    <input className="search-input" type="text" id="name" name="name" minLength="1" maxLength="100" placeholder="Wyszukaj"
                      onChange={(e) => setFilter(e.target.value)} value={filter || ''}
                      required />
                    <span className="input-icon" onClick={(e) => sortByName()}><FontAwesomeIcon icon={faSearch} size='2xl' /></span>

                  </form>
                </div>
                </div>
              </div>


              <div className='history-reserv'>
                {events.slice(start, start + 5 < events.length ? start + 5 : events.length).map((iteam, iteration) =>
                  <div className='history-reserv-box'>
                    <div className='history-reserv-header'>
                      <div><FontAwesomeIcon icon={faCalendarDays} size='1x' /> {moment(iteam.datestart).format('YYYY-MM-DD')}</div>
                      <div><FontAwesomeIcon icon={faClock} size='1x' /> {moment(iteam.datestart).format('HH:mm')} - {moment(iteam.dateend).format('HH:mm')}</div>

                    </div>
                    <div className='history-reserv-content'>
                      <div>
                        <div className='history-reserv-middle'>
                          <span>Nazwa:</span> {iteam.room.name} <span>Rodzaj:</span> {iteam.room.type}
                        </div>
                        <div className='history-reserv-middle-und'>
                          <span>Grupa:</span> {iteam.studentgroup.name}  <span>Rok:</span> {iteam.studentgroup.year}
                        </div>
                      </div>
                      <div className='history-reserv-icon'>
                        <span onClick={(e) => {
                          setClicked(true);
                          setUpdadeData(iteam);
                        }} className='reserv-update'><FontAwesomeIcon icon={faPenNib} size='2x' /></span>
                        <span onClick={(e) => confirmDelete(iteam._id)} className='reserv-delete'><FontAwesomeIcon icon={faTrash} size='2x' /></span>
                      </div>
                    </div>
                    <div className='history-reserv-footer'>
                      Zapełnienie: {iteam.room.capacity} / {iteam.studentgroup.amount}
                    </div>
                  </div>
                )}
              </div>


              <Row className='history-nav'>
                <Col><button className='history-nav-btn' onClick={() => { start - 5 >= 0 ? setStart(start - 5) : setStart(0) }}> ← </button></Col>
                <Col><b>{Math.ceil(start / 5) + 1}/{Math.ceil(events.length / 5)}</b></Col>
                <Col><button className='history-nav-btn' onClick={() => { start + 5 < events.length ? setStart(start + 5) : start = setStart(start) }}> → </button></Col>
              </Row>


            </Col>
          </Row>
        </Container>
      </div>
      {
        clicked &&
        <UpdateReserv
          onClose={() => {
            setClicked(null);
            setUpdadeData(null);
            refresh();

          }}
          reservation={updateData}
        />
      }
    </>
  )
}