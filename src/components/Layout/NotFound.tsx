import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <Container className="py-5 text-center" style={{ marginTop: '6rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ fontSize: '8rem', fontWeight: 700, color: 'var(--text-primary)' }}>404</h1>
        <h2 className="mb-4" style={{ fontSize: '2rem', fontWeight: 600 }}>Page introuvable</h2>
        <p className="mb-5" style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button className="btn-custom d-inline-flex align-items-center gap-2" style={{ fontSize: '1rem' }}>
            <Home size={20} />
            Retour à l'accueil
          </Button>
        </Link>
      </motion.div>
    </Container>
  );
};

export default NotFound;