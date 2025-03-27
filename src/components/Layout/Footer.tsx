import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-4" style={{ backgroundColor: 'var(--secondary-bg)' }}>
      <Container>
        <Row className="mb-3">
          <Col md={4}>
            <h5 style={{ fontWeight: 600, paddingBottom: '1rem' }}>Produits</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/mac" className="text-decoration-none" style={{ color: 'var(--text-secondary)' }}>
                  Mac
                </a>
              </li>
              <li className="mb-2">
                <a href="/ipad" className="text-decoration-none" style={{ color: 'var(--text-secondary)' }}>
                  iPad
                </a>
              </li>
              <li className="mb-2">
                <a href="/iphone" className="text-decoration-none" style={{ color: 'var(--text-secondary)' }}>
                  iPhone
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 style={{ fontWeight: 600, paddingBottom: '1rem' }}>Services</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="https://lm.anthonydev.fr" className="text-decoration-none" style={{ color: 'var(--text-secondary)' }}>
                  Lemon Music
                </a>
              </li>
              <li className="mb-2">
                <a href="https://anthonycode.fr" className="text-decoration-none" style={{ color: 'var(--text-secondary)' }}>
                  AnthonyCode
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 style={{ fontWeight: 600, paddingBottom: '1rem' }}>À propos</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/about" className="text-decoration-none" style={{ color: 'var(--text-secondary)' }}>
                  Notre Histoire
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.2 }} />
        <Row className="align-items-center mt-3">
          <Col md={6}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              © 2024 Anthony Store. Tous droits réservés.
            </p>
          </Col>
          <Col md={6} className="d-flex justify-content-md-end align-items-center gap-2">
            <a href="#" className="text-decoration-none" style={{ color: 'var(--text-primary)' }}>
              <Github size={20} strokeWidth={1.5} />
            </a>
            <a href="#" className="text-decoration-none" style={{ color: 'var(--text-primary)' }}>
              <Twitter size={20} strokeWidth={1.5} />
            </a>
            <a href="#" className="text-decoration-none" style={{ color: 'var(--text-primary)' }}>
              <Linkedin size={20} strokeWidth={1.5} />
            </a>
          </Col>

        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
