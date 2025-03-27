import React from 'react';
import { Button } from 'react-bootstrap';
import { Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types';

interface ProductItemFormProps {
  product: Product;
}

const ProductItemForm: React.FC<ProductItemFormProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    addItem(product);
  };

  return (
    <Button 
      className="btn-custom d-flex align-items-center"
      style={{ 
        padding: '0.75rem 1.25rem',
        fontSize: '0.95rem',
        fontWeight: 500
      }}
      onClick={handleAddToCart}
    >
      <Plus size={18} className="me-2" />
      Ajouter au panier
    </Button>
  );
};

export default ProductItemForm;