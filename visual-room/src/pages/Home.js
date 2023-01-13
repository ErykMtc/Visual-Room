import { Link, useMatch, useResolvedPath } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Home.css';


export default function Home() {
  return (
    <div className="home-main">
      <Container>
        <Row>
          <Col>
          <h2 class="decorated"><span>Skrót Aplikacji</span></h2>
            <section className="dl-blurbs">
              <dl>
                <dt>Start</dt>
                <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</dd>
                <dt>Rezerwacja</dt>
                <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</dd>
                <dt>Wizualizacja</dt>
                <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</dd>
              </dl>
              <dl>
                <dt>Historia</dt>
                <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</dd>
                <dt>Filtrowanie</dt>
                <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</dd>

                <dt>Administracja</dt>
                <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</dd>
              </dl>
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  )
}