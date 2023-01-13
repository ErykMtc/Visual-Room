import { Link, useMatch, useResolvedPath } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Users from "../adminComponents/Users";
import AdminReservation from "../adminComponents/AdminReservation";
import Room from "../adminComponents/Room";
import StudentGroup from "../adminComponents/StudentGroup";
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import './AdminSection.css';

export default function Admin() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    return (
        <div>
            <Container>
                <Row>
                    <Col>

                        {auth.roles.find(role => (role == "9999")) ? <Users /> : <></> }
                        

                        <h2 class="decorated"><span>Zarządzanie salami</span></h2>
                        <Room />

                        <h2 class="decorated"><span>Zarządzanie grupami</span></h2>
                        <StudentGroup/>

                        <h2 class="decorated"><span>Zarządzanie rezerwacjami</span></h2>
                        <AdminReservation />
                        
                    </Col>
                </Row>
            </Container>
        </div>
    )
}