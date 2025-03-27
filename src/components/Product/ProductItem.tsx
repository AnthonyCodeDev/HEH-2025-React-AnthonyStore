import React from 'react';
import { Card } from 'react-bootstrap';
import ProductItemForm from './ProductItemForm';
import { Product } from '../../types';
import { Link } from 'react-router-dom';

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card className="product-card border-0 h-100" style={{ backgroundColor: 'var(--secondary-bg)', borderRadius: '20px' }}>
        <div className="p-4">
          <Card.Img 
            variant="top" 
            src={product.image} 
            alt={product.name}
            style={{ 
              height: '300px', 
              objectFit: 'cover',
              borderRadius: '16px'
            }}
          />
        </div>
        <Card.Body className="d-flex flex-column px-4 pb-4">
          <div className="mb-auto">
            <Card.Title 
              style={{ 
                fontSize: '1.5rem', 
                fontWeight: 600,
                marginBottom: '0.5rem'
              }}
            >
              {product.name}
            </Card.Title>
            <Card.Text 
              className="mb-3"
              style={{ 
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                lineHeight: '1.5'
              }}
            >
              {product.description}
            </Card.Text>
          </div>
          <div className="mt-3">
            <div className="price mb-3" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
              {product.price.toFixed(2)}€
            </div>
            <ProductItemForm product={product} />
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductItem;