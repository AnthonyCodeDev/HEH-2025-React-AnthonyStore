import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import HeaderCartButton from './HeaderCartButton';
import { ShoppingBag, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/Header.css';

const Header: React.FC = () => {
  return (
    <Navbar className="navbar-custom py-3" fixed="top" expand="lg">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center"
          style={{ fontSize: '1.5rem', fontWeight: 600 }}
        >
          <ShoppingBag className="me-2" size={24} strokeWidth={1.5} />
          Anthony Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/mac" className="mx-3" style={{ fontWeight: 500 }}>Mac</Nav.Link>
            <Nav.Link as={Link} to="/iphone" className="mx-3" style={{ fontWeight: 500 }}>iPhone</Nav.Link>
            <Nav.Link as={Link} to="/ipad" className="mx-3" style={{ fontWeight: 500 }}>iPad</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-3">
            <HeaderCartButton />
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button
                className="btn-custom d-flex align-items-center"
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem'
                }}
              >
                <LogIn size={18} strokeWidth={1.5} className="me-2" />
                Connexion
              </Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;