import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de création de compte ici (via base de donnée mais pas encore terminé)
  };

  return (
    <Container className="py-5" style={{ marginTop: '6rem' }}>
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0" style={{ backgroundColor: 'var(--secondary-bg)' }}>
              <Card.Body className="p-4 p-md-5">
                <h1 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 600 }}>Créer un compte</h1>
                <p className="text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Nous n'attendons plus que vous.
                </p>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: 500 }}>Nom</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Entrez votre nom"
                      className="py-2 px-3"
                      style={{
                        backgroundColor: 'white',
                        border: '1px solid var(--text-secondary)',
                        borderRadius: '12px'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: 500 }}>Adresse mail</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Entrez votre adresse mail"
                      className="py-2 px-3"
                      style={{
                        backgroundColor: 'white',
                        border: '1px solid var(--text-secondary)',
                        borderRadius: '12px'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: 500 }}>Mot de passe</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Entrez votre mot de passe"
                      className="py-2 px-3"
                      style={{
                        backgroundColor: 'white',
                        border: '1px solid var(--text-secondary)',
                        borderRadius: '12px'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: 500 }}>Confirmer le mot de passe</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirmez votre mot de passe"
                      className="py-2 px-3"
                      style={{
                        backgroundColor: 'white',
                        border: '1px solid var(--text-secondary)',
                        borderRadius: '12px'
                      }}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 btn-custom mb-4"
                    style={{ fontSize: '1rem' }}
                  >
                    Créer un compte
                  </Button>

                  <p className="text-center mb-0" style={{ color: 'var(--text-secondary)' }}>
                    Vous avez déjà un compte ?{' '}
                    <Link to="/login" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>
                      Connexion
                    </Link>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;