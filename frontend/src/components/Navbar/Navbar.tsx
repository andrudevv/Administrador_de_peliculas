import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
            <Nav.Link as={NavLink} to="/" className="text-white">
            Movies App
          </Nav.Link></Navbar.Brand>

        <Nav className="ms-auto ">
          <Nav.Link as={NavLink} to="/movies" className="text-white">
            Inicio
          </Nav.Link>
          <Nav.Link as={NavLink} to="/movies/new" className="text-white">
            Crear
          </Nav.Link>
          <Nav.Link as={NavLink} to="/movies/search" className="text-white">
            Buscar
          </Nav.Link>
          <Nav.Link as={NavLink} to="/movies/favorites" className="text-white">
            Favoritos
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
