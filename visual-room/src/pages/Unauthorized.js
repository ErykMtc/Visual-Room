import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Unauthorized() {
  return (
    <div className='main-div'>
      <Container>
        <Row className='content-section'>
          <Col md={{ span: 4, offset: 4 }} className='content-col'>
            <h2>Nie masz uprawnień!</h2>
            <p>Prosze skontaktować się z administatorem</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}