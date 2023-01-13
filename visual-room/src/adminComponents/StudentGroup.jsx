import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenNib } from '@fortawesome/free-solid-svg-icons';
import UpdateStudent from "../component/UpdateStudent";

const StrudentGroup = () => {
    const axiosPrivate = useAxiosPrivate();

    const [updateData, setUpdadeData] = useState();
    const [clicked, setClicked] = useState();
    const [student, setStudent] = useState();
    const [inputName, setInputName] = useState();
    const [inputNumb, setInputNumb] = useState();
    const [selectYear, setSelectYear] = useState('1');
    var [start, setStart] = useState(0);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getStudent = async () => {
            try {
                const response = await axiosPrivate.get('/student', {
                    signal: controller.signal
                });
                // console.log(response.data);
                isMounted && setStudent(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        getStudent();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const addStudent = async (e) => {
        const controller = new AbortController();
        const res = axiosPrivate
            .post("/student", {
                "name": inputName,
                "amount": inputNumb,
                "year": selectYear
            }, {
                signal: controller.signal,
            })
            .then((response) => { alert('Dodano'); }).catch(function (error) {
                alert('Zmiana niemożliwa, podaj inne dane');
              });
    };

    const deleteStudent = async (selRoom) => {
        const roomid = selRoom._id;

        const res = axiosPrivate.delete('/student' , {
            data: {"id": roomid },
          }).then((response) => {
            //odswierzanie strony
          });
        
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h3>Dodaj grupe studentów</h3>
                        <div className="admin-student-add">
                            <input
                                className="admin-student-add-input-name"
                                placeholder="Nazwa grupy"
                                onChange={(e) => setInputName(e.target.value)}
                                value={inputName}
                                type="name"
                            ></input>
                            <input
                                className="admin-student-add-input-numb"
                                placeholder="Liczebność"
                                onChange={(e) => setInputNumb(e.target.value)}
                                value={inputNumb}
                                type="number"
                            ></input>
                            <select
                                className="admin-student-type"
                                name="ffff"
                                id="ddd"
                                onChange={(e) => setSelectYear(e.target.value)}
                                value={selectYear}
                            >
                                <option value="1">Pierwszy</option>
                                <option value="2">Drugi</option>
                                <option value="3">Trzeci</option>
                                <option value="4">Czwarty</option>
                            </select>
                        </div>
                        <div className="admin-student-add-btn">
                            <button className="admin-btn" onClick={(e) => { addStudent() }}>Dodaj</button>
                        </div>
                        <h3>Grupy studentów</h3>

                        {student?.length
                            ? (<div>
                                <ul className="admin-student-list">
                                    {student.slice(start, start + 8 < student.length ? start + 8 : student.length).map((student, i) => <li key={i}>
                                        <div className="admin-student-numeration">{i + 1}.</div>
                                        <div className="admin-student-name">{student?.name}</div>
                                        <div className="admin-student-name">{student?.amount}</div>
                                        <div className="admin-student-name">{student?.year}</div>
                                        <div className="admin-student-delete">
                                            <span onClick={(e) => {
                                                setClicked(true);
                                                setUpdadeData(student);
                                            }}>
                                                <FontAwesomeIcon icon={faPenNib} size='1x' />
                                            </span>
                                            <span onClick={(e) => {
                                                deleteStudent(student);
                                            }}>
                                                <FontAwesomeIcon icon={faTrash} size='1x'/>
                                            </span>
                                        </div>
                                    </li>)
                                    }
                                </ul>
                                <Row className='history-nav'>
                                    <Col><button className='history-nav-btn' onClick={() => { start - 8 >= 0 ? setStart(start - 8) : setStart(0) }}> ← </button></Col>
                                    <Col><b>{Math.ceil(start / 8) + 1}/{Math.ceil(student.length / 8)}</b></Col>
                                    <Col><button className='history-nav-btn' onClick={() => { start + 8 < student.length ? setStart(start + 8) : start = setStart(start) }}> → </button></Col>
                                </Row>
                            </div>
                            ) : <p>No users to display</p>
                        }
                        
                    </Col>
                </Row>
            </Container>

            {
            clicked &&
            <UpdateStudent
            onClose={() => {
            setClicked(null);
            setUpdadeData(null);
            }}
            student={updateData}
        />
      }

        </div>
        
    )
}

export default StrudentGroup;