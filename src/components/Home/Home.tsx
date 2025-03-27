import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Star, MessageSquare } from 'lucide-react';
import Products from '../Product/Products';
import { DUMMY_PRODUCTS } from '../../data/dummy-products';
import { useCart } from '../../context/CartContext';
import '../../styles/Home.css';

const Home: React.FC = () => {
  const { addItem } = useCart();

  const macbookProduct = DUMMY_PRODUCTS.find(p => p.name.toLowerCase().includes('macbook pro'));

  const handleAddToCart = () => {
    if (macbookProduct) {
      addItem(macbookProduct);
    } else {
      console.error("Produit MacBook Pro non trouvé !");
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
                MacBook Pro
                <br />
                <span className="hero-highlight">À partir de seulement 1999€</span>
              </h1>
              <p className="hero-description">
                Alliant design raffiné, puissance inégalée et autonomie remarquable, un concentré d'innovation et d'élégance pour sublimer votre quotidien.
              </p>
              <div className="d-flex gap-3">
                <Button className="btn-custom" onClick={handleAddToCart}>
                  Acheter dès maintenant
                </Button>
              </div>
            </Col>
            <Col lg={6} className="py-5">
              <img
                src="https://media.istockphoto.com/id/1478610489/fr/photo/hcmc-vietnam-macbook-pro-14-pouces-m2.jpg?s=612x612&w=0&k=20&c=3X3dJ9o8tX3EAPrky4aCuIU6_1YUlh_MipSW0NKz0Do="
                alt="Hero"
                className="hero-image"
              />
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
