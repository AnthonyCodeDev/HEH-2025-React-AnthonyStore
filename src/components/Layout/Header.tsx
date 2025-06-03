import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import HeaderCartButton from './HeaderCartButton';
import { ShoppingBag, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/Header.css';

const Header: React.FC = () => {
  const [user, setUser] = useState<{ name: string; } | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedImage = localStorage.getItem('userImage');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        if (storedImage) setUserImage(storedImage);
      } catch (e) {
        console.error("Erreur parsing user", e);
        setUser(null);
        setUserImage(null);
      }
    }
  }, []);

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
            {user ? (
              <>
                <span
                  style={{ fontWeight: 500, fontSize: '0.95rem', color: '#fff' }}
                  className="btn-custom d-flex align-items-center gap-2"
                >
                  Bonjour,&nbsp;
                  {user.name.length > 16
                    ? `${user.name.substring(0, 16)}...`
                    : user.name}
                  {userImage && (
                    <img
                      src={userImage}
                      alt="Profil"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1px solid #ccc'
                      }}
                    />
                  )}
                </span>
                <Button
                  className="btn-custom"
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem'
                  }}
                  onClick={() => {
                    localStorage.clear();
                    setUser(null);
                    setUserImage(null);
                    window.location.href = '/';
                  }}
                >
                  Se déconnecter
                </Button>
              </>
            ) : (
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
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
