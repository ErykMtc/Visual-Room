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
                <dd>Jest to aplikacja, której głownym zadaniem jest usprawnienie systemu rezerwacji jak i zarządzania nimi. Aplikacja ta ponadto ma funkcje, które pozwalają w ograniczony sposób służyć jako wgląd we własny plan zajęć.</dd>
                <dt>Rezerwacja</dt>
                <dd>Aby mieć pełny dostęp do panelu rejestracji należy mieć uprawnienia pracownika lub wyższe. W zakładce rezerwacji mozemy znaleźć wizualizację nazego planu zajęć jak i ogólno dostępnego z informacjami o salach itd.</dd>
                <dt>Wizualizacja</dt>
                <dd>Wizualizacja rezerwacji jest przeprowadzana w formie kalendarza z podziałem na poszczególne miesiące. Kolor niebieski przy rezerwacjach oznacza rezerwacje właściciela natomiast fioletowy informacje o rezerwacji dla innego użytkownika</dd>
              </dl>
              <dl>
                <dt>Historia</dt>
                <dd>Panel historii zawiera w sobie wszystkie dostępne w bazie przez nas informacje. Możemy w nim filtrować nasze rezerwacje oraz mamy możliwość ich modyfikowania i usuwania</dd>
                <dt>Filtrowanie</dt>
                <dd>Jest to element pomocniczy dla panelu historii. Za ich pomocą możemy segregować nasze rezerwacje po nazwie sali, grupy lub dacie wciskając odpowiednie ikony. Mamy również opcje wyszukiwania po nazwie sal rezerwacji</dd>
                <dt>Administracja</dt>
                <dd>Jest to panel dostepny jedynie dla Edytorów i Adminów. W nim możemy zwiększać, zmniejszać lub edytować pule dostępnych sal w bazie. Istnieje dodatkowo system administracją całością rezerwacji jak i użytkownikami dostępnymi w systemie</dd>
              </dl>
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  )
}