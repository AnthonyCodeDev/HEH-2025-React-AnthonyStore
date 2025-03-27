import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductItem from './ProductItem';
import { DUMMY_PRODUCTS } from '../../data/dummy-products';
import { useLocation } from 'react-router-dom';
import '../../styles/Products.css';

const Products: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);

  const filteredProducts = path === '' 
    ? DUMMY_PRODUCTS 
    : DUMMY_PRODUCTS.filter(product => 
        product.category.toLowerCase() === path.toLowerCase()
      );

  return (
    <Container className="product-grid">
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredProducts.map((product) => (
          <Col key={product.id}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;