import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenNib } from '@fortawesome/free-solid-svg-icons';
import UpdateRoom from "../component/UpdateRoom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Room = () => {
    const axiosPrivate = useAxiosPrivate();

    const [updateData, setUpdadeData] = useState();
    const [clicked, setClicked] = useState();
    const [room, setRoom] = useState();
    const [inputName, setInputName] = useState();
    const [inputNumb, setInputNumb] = useState();
    const [selectRoom, setSelectRoom] = useState('Wykladowa');
    var [start, setStart] = useState(0);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getRoom = async () => {
            try {
                const response = await axiosPrivate.get('/room', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setRoom(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        getRoom();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const addRoom = async (e) => {
        const controller = new AbortController();
        const res = axiosPrivate
            .post("/room", {
                "name": inputName,
                "capacity": inputNumb,
                "type": selectRoom
            }, {
                signal: controller.signal,
            })
            .then((response) => { 
                toast.success("Dodano"); 
                refresh()
                setInputName("");
                setInputNumb("");
            }).catch(function (error) {
                toast.error("Zmiana niemożliwa, podaj inne dane!");
            });
    };

    const deleteRoom = async (selRoom) => {
        const roomid = selRoom._id;
        var tempost = room.filter(item => item._id != roomid);

        const res = axiosPrivate.delete('/room', {
            data: { "id": roomid },
        }).then((response) => {
            setRoom(tempost);
        });

    }


    const confirmDelete = async (delid) => {
        await confirmAlert({
          title: 'Ostrzeżenie',
          message: 'Czy napewno chcesz usunąć?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {deleteRoom(delid)}
            },
            {
              label: 'No',
              onClick: () => {return;}
            }
          ]
        });
      }

      const refresh = async (e) => {
        const getRes = async () => {
          try {
              const response = await axiosPrivate.get("/room", {
              }).then((res)=> {
                setRoom(res.data)
              });
              
          } catch (err) {
              console.error(err);
          }
      }
    
      getRes();
      setRoom(room.slice());
      }


    return (
        <div>
            <Container>
                <Row>
                    <Col>
                    <ToastContainer />
                        <h3>Dodaj sale</h3>
                        <div className="admin-room-add">
                            <input
                                className="admin-room-add-input-name"
                                placeholder="Nazwa sali"
                                onChange={(e) => setInputName(e.target.value)}
                                value={inputName}
                                type="name"
                            ></input>
                            <input
                                className="admin-room-add-input-numb"
                                placeholder="Pojemność"
                                onChange={(e) => setInputNumb(e.target.value)}
                                value={inputNumb}
                                type="number"
                            ></input>
                            <select
                                className="admin-room-type"
                                name="ffff"
                                id="ddd"
                                onChange={(e) => setSelectRoom(e.target.value)}
                                value={selectRoom}
                            >
                                <option value="Wykladowa">Wykladowa</option>
                                <option value="Laboratoryjna">Laboratoryjna</option>
                                <option value="Komputerowa">Komputerowa</option>
                                <option value="Uzytkowa">Uzytkowa</option>
                            </select>
                        </div>
                        <div className="admin-room-add-btn">
                            <button className="admin-btn" onClick={(e) => { addRoom() }}>Dodaj</button>
                        </div>
                        <h3>Sale</h3>

                        {room?.length
                            ? (<div>
                                <ul className="admin-room-list">
                                    {room.slice(start, start + 8 < room.length ? start + 8 : room.length).map((room, i) => <li key={i}>
                                        <div className="admin-room-numeration">{i + 1}.</div>
                                        <div className="admin-room-name">{room?.name}</div>
                                        <div className="admin-room-name">{room?.type}</div>
                                        <div className="admin-room-name">{room?.capacity}</div>
                                        <div className="admin-room-delete">
                                            <span onClick={(e) => {
                                                setClicked(true);
                                                setUpdadeData(room);
                                                }}>
                                                <FontAwesomeIcon icon={faPenNib} size='1x' />
                                            </span>
                                            <span onClick={(e) => {
                                                confirmDelete(room);
                                            }}>
                                                <FontAwesomeIcon icon={faTrash} size='1x' />
                                            </span>
                                        </div>
                                    </li>)
                                    }
                                </ul>
                                <Row className='history-nav'>
                                    <Col><button className='history-nav-btn' onClick={() => { start - 5 >= 0 ? setStart(start - 8) : setStart(0) }}> ← </button></Col>
                                    <Col><b>{Math.ceil(start / 8) + 1}/{Math.ceil(room.length / 8)}</b></Col>
                                    <Col><button className='history-nav-btn' onClick={() => { start + 8 < room.length ? setStart(start + 8) : start = setStart(start) }}> → </button></Col>
                                </Row>
                            </div>
                            ) : <p>No users to display</p>
                        }

                    </Col>
                </Row>
            </Container>

            {
            clicked &&
            <UpdateRoom
            onClose={() => {
            setClicked(null);
            setUpdadeData(null);
            refresh();
            }}
            room={updateData}
        />
      }

        </div>
    );
};

export default Room;
