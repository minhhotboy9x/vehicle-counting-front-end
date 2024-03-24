import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg" className="navbar-light">
      <Container>
        {/* Brand label set to the left */}
        <Navbar.Brand>
          <Link to="/" className="navbar-label" style={{ textDecoration: 'none', color: '#FF6347', fontWeight: 'bold'}}>
              Vehicle Counting
          </Link>
        </Navbar.Brand>
        {/* Toggler for responsive design */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Navigation links set to the right */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/statistics">Statistics</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;