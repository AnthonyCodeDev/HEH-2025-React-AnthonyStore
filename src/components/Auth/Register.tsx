import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState<File | null>(null);
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

    if (!image) {
      alert('Veuillez sélectionner une image de profil.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('username', name.toLowerCase().replace(/\s+/g, ''));
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('passwordConfirmation', confirmPassword);
      formData.append('role', 'user');
      formData.append('phone', '0100000000');
      formData.append('address', 'Paris - France');
      formData.append('companyName', 'Aucune');
      formData.append('image', image); // ici on envoie l'image sélectionnée

      const response = await axios.post('http://localhost:3000/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept-Language': 'fr_FR'
        }
      });

      const data = response.data;
      console.log('✅ Compte créé avec succès', data);

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userImage', data.user.profileImage);
      localStorage.setItem('accessToken', data.tokens.accessToken);
      localStorage.setItem('refreshToken', data.tokens.refreshToken);

      alert('Compte créé ! Vérifiez votre email.');

      window.location.href = '/'; // Redirection

    } catch (error: any) {
      if (error.response) {
        console.error('Erreur d\'API ❌', error.response.data);
        alert(`Erreur : ${error.response.data.message || 'Inscription échouée.'}`);
      } else {
        console.error('Erreur réseau 🛑', error.message);
        alert('Une erreur est survenue.');
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
                <h1 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 600 }}>Créer un compte</h1>
                <p className="text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Nous n'attendons plus que vous.
                </p>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="register-nom" style={{ fontWeight: 500 }}>Nom</Form.Label>
                    <Form.Control
                      id="register-nom"
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
                    <Form.Label htmlFor="register-email" style={{ fontWeight: 500 }}>Adresse mail</Form.Label>
                    <Form.Control
                      id="register-email"
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
                    <Form.Label htmlFor="register-password" style={{ fontWeight: 500 }}>Mot de passe</Form.Label>
                    <Form.Control
                      id="register-password"
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
                    <Form.Label htmlFor="register-confirm-password" style={{ fontWeight: 500 }}>Confirmer le mot de passe</Form.Label>
                    <Form.Control
                      id="register-confirm-password"
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

                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="register-image" style={{ fontWeight: 500 }}>Image de profil</Form.Label>
                    <Form.Control
                      id="register-image"
                      type="file"
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setImage(e.target.files[0]);
                        }
                      }}
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