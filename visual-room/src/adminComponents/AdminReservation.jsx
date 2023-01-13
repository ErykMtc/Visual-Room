import { useRef, useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UpdateReserv from '../component/UpdateReserv';

import useAuth from '../hooks/useAuth';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faClock, faTrash, faPenNib } from '@fortawesome/free-solid-svg-icons'


const AdminReservation = () => {

    const axiosPrivate = useAxiosPrivate();
  
    const [events, setEvents] = useState(null);
    var [start, setStart] = useState(0);
    var [filter, setFilter] = useState(0);
    const [clicked, setClicked] = useState();
    const [updateData, setUpdadeData] = useState();
  
  
    const deleteClick = async (delid) => {
      console.log(delid)
      const controller = new AbortController();
      const res = axiosPrivate.delete('/reservation', {
        data: { "id": delid },
        signal: controller.signal
      }).then((response) => {
        console.log("usunieto");
        window.location.reload(false);
      });
  
    }
  
  
    useEffect(() => {
      const controller = new AbortController();
      const res = axiosPrivate.get('/reservation', {
        signal: controller.signal
      }).then((response) => {
        setEvents(response.data);
        console.log(response.data)
      });
    }, []);

    if (!events) return <div class="loader"></div>;
    return (
        <div>
            <Container>
                <Row>
                    <Col>
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
                                            <span onClick={(e) => deleteClick(iteam._id)} className='reserv-delete'><FontAwesomeIcon icon={faTrash} size='2x' /></span>
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
            {
        clicked &&
        <UpdateReserv
          onClose={() => {
            setClicked(null);
            setUpdadeData(null);
          }}
          reservation={updateData}
        />
      }
        </div>
    )
}

export default AdminReservation;