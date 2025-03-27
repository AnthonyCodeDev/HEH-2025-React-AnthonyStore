import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductItem from './ProductItem';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Products.css';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  description?: string;
}

const Products: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.slice(1); // 'mac', 'iphone', 'ipad', etc.

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryMap: Record<string, string> = {
    mac: '67e51158a53000037de20c2b',
    iphone: '67e5116aa53000037de20c2e',
    ipad: '67e5118da53000037de20c31',
  };

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      setProducts([]); // évite l'affichage de l'ancien contenu

      try {
        const categoryId = categoryMap[path];

        const response = await axios.get('http://localhost:3000/api/product', {
          params: categoryId ? { category: categoryId } : {},
          headers: {
            'Accept-Language': 'fr_FR'
          },
          signal: controller.signal,
        });

        const allProducts: Product[] = response.data.products || response.data;

        if (isMounted) {
          setProducts(allProducts);
        }
      } catch (error: any) {
        if (axios.isCancel(error)) {
          console.log("Requête annulée 🛑");
        } else {
          console.error("Erreur de chargement ❌", error);
          if (isMounted) setProducts([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
      isMounted = false;
    };
  }, [path]);

  if (loading) return <p className="text-center py-5">Chargement des produits...</p>;

  return (
    <Container className="product-grid">
      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map((product) => (
          <Col key={product._id}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
