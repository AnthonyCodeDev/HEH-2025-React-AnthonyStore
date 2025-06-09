import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Star, MessageSquare } from 'lucide-react';
import Products from '../Product/Products';
import { useCart } from '../../context/CartContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/Home.css';

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
}

const Home: React.FC = () => {
  const { addItem } = useCart();
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/product', {
          params: {
            limit: 1
          },
          headers: {
            'Accept-Language': 'fr_FR'
          }
        });
        const product = response.data.products[0];
        setFeaturedProduct(product);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit vedette :", error);
      }
    };

    fetchProduct();
  }, []);

  const handleAddToCart = () => {
    if (featuredProduct) {
      addItem(featuredProduct);
    } else {
      console.error("Aucun produit à ajouter au panier.");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="py-5">
              <h1 className="hero-title">
                {featuredProduct ? (
                  <Link
                    to={`/product/${featuredProduct._id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {featuredProduct.name}
                    <br />
                    <span className="hero-highlight">
                      À partir de seulement {featuredProduct.price}€
                    </span>
                  </Link>
                ) : (
                  'Chargement...'
                )}
              </h1>

              <p className="hero-description">
                {featuredProduct
                  ? featuredProduct.description || 'Un produit exceptionnel à ne pas manquer.'
                  : 'Chargement de la description...'}
              </p>
              <div className="d-flex gap-3">
                <Button className="btn-custom" onClick={handleAddToCart} disabled={!featuredProduct}>
                  Acheter dès maintenant
                </Button>
              </div>
            </Col>
            <Col lg={6} className="py-5">
              {featuredProduct && (
                <Link to={`/product/${featuredProduct._id}`}>
                  <img
                    src={featuredProduct.mainImage}
                    alt={featuredProduct.name}
                    className="hero-image"
                    style={{ cursor: 'pointer' }}
                  />
                </Link>
              )}

            </Col>
          </Row>
        </Container>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <Container>
          <h2 className="section-title">Les nouveautés. Découvrez ce qui vient d'arriver.</h2>
          <p className="section-description">
            Découvrez nos derniers produits et trouvez celui qui vous convient le mieux.
          </p>
          <Products />
        </Container>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <Container>
          <h2 className="section-title">Ce que disent nos clients</h2>
          <p className="section-description">Des expériences réelles de vrais utilisateurs</p>
          <Row className="g-4">
            {[
              {
                name: "Néo Herbigniaux",
                rating: 5,
                comment: "Le MacBook Pro a complètement transformé ma façon de travailler. Les performances sont incomparables.",
                product: "MacBook Pro"
              },
              {
                name: "Kyllian Evrard",
                rating: 5,
                comment: "L'appareil photo de l'iPhone 15 Pro est incroyable. Les photos que je prends maintenant sont de qualité professionnelle.",
                product: "iPhone 15 Pro"
              },
              {
                name: "Anthony Vergeylen",
                rating: 5,
                comment: "La réduction de bruit des AirPods Pro est fantastique. Parfait pour mes trajets quotidiens.",
                product: "AirPods Pro"
              }
            ].map((review, index) => (
              <Col key={index} md={4}>
                <div className="review-card">
                  <div className="d-flex mb-3" style={{ color: '#202020' }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={26} fill="#202020" />
                    ))}
                  </div>
                  <p className="review-comment">"{review.comment}"</p>
                  <div>
                    <p className="review-name">{review.name}</p>
                    <p className="review-product">sur {review.product}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <div className="text-center mb-5">
                <h2 className="section-title">Contactez-nous</h2>
                <p className="section-description">
                  Si vous avez une question, n'hésitez pas à nous envoyez un message.
                </p>
              </div>
              <form className="contact-form">
                <div className="mb-4">
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    placeholder="Entrez votre nom"
                    className="form-control"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    placeholder="Entrez votre email"
                    className="form-control"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Votre message"
                    className="form-control"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-100 btn-custom d-flex align-items-center justify-content-center gap-2"
                >
                  <MessageSquare size={18} />
                  Envoyer le message
                </Button>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
