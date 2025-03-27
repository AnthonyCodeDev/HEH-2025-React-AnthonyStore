import React from 'react';
import { Button } from 'react-bootstrap';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const HeaderCartButton: React.FC = () => {
  const { items } = useCart();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to="/cart" style={{ textDecoration: 'none' }}>
      <Button 
        className="btn-custom d-flex align-items-center"
        style={{ 
          backgroundColor: '#1d1d1f',
          color: 'white',
          padding: '0.5rem 1rem',
          fontSize: '0.9rem'
        }}
      >
        <ShoppingCart size={18} strokeWidth={1.5} className="me-2" />
        <span className="me-2">Cart</span>
        <span className="bg-white text-dark px-2 rounded-pill" style={{ fontSize: '0.8rem' }}>
          {totalItems}
        </span>
      </Button>
    </Link>
  );
};

export default HeaderCartButton;