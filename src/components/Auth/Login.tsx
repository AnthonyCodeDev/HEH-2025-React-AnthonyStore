import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');

    if (token && user) {
      // Redirige si l'utilisateur est déjà connecté
      navigate('/');
    }
  }, [navigate]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        {
          email,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'fr_FR' // Change selon besoin
          }
        }
      );

      const data = response.data;

      console.log('Connexion réussie ✅', data);

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userImage', data.user.profileImage);
      localStorage.setItem('accessToken', data.tokens.accessToken);
      localStorage.setItem('refreshToken', data.tokens.refreshToken);

      // Redirection ou succès UI
      alert('Connexion réussie !');
      window.location.href = '/'; // Redirection forcée

    } catch (error: any) {
      if (error.response) {
        // Erreur côté serveur
        console.error('Erreur de l\'API ❌', error.response.data);
        alert(`Erreur: ${error.response.data.message}`);
      } else {
        // Erreur réseau ou autre
        console.error('Erreur inattendue 🛑', error.message);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    }
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
                <h1 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 600 }}>Connexion</h1>
                <p className="text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Ravi de vous revoir.
                </p>

                <Form onSubmit={handleSubmit}>
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

                  <Button
                    type="submit"
                    className="w-100 btn-custom mb-4"
                    style={{ fontSize: '1rem' }}
                  >
                    Connexion
                  </Button>

                  <p className="text-center mb-0" style={{ color: 'var(--text-secondary)' }}>
                    Vous n'avez pas de compte ?{' '}
                    <Link to="/register" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>
                      Créer un compte
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

export default Login;