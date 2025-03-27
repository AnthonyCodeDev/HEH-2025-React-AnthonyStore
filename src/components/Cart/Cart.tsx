import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { items, totalAmount, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <Container className="py-5 text-center" style={{ marginTop: '6rem' }}>
        <h1 className="mb-4" style={{ fontSize: '2.5rem', fontWeight: 600 }}>Votre panier est vide</h1>
        <p className="mb-4" style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Ajoutez des produits à votre panier pour continuer.
        </p>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button
            className="btn-custom"
            style={{ fontSize: '1rem' }}
          >
            Je vais faire un tour
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ marginTop: '6rem' }}>
      <h1 className="mb-4" style={{ fontSize: '2.5rem', fontWeight: 600 }}>Votre panier</h1>

      <Row>
        <Col lg={8}>
          {items.map((item) => (
            <Card key={item.id} className="mb-4 border-0" style={{ backgroundColor: 'var(--secondary-bg)' }}>
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <Col sm={3}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded-3"
                      style={{ objectFit: 'cover', height: '120px', width: '100%' }}
                    />
                  </Col>
                  <Col sm={5}>
                    <h5 style={{ fontWeight: 600 }}>{item.name}</h5>
                    <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>{item.price.toFixed(2)}€</p>
                  </Col>
                  <Col sm={3}>
                    <div className="d-flex align-items-center gap-3">
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <MinusCircle size={20} strokeWidth={1.5} />
                      </Button>
                      <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{item.quantity}</span>
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <PlusCircle size={20} strokeWidth={1.5} />
                      </Button>
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button
                      variant="link"
                      className="p-0 text-danger"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={20} strokeWidth={1.5} />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col lg={4}>
          <Card className="border-0" style={{ backgroundColor: 'var(--secondary-bg)' }}>
            <Card.Body className="p-4">
              <h5 className="mb-4" style={{ fontWeight: 600 }}>Résumé de la commande</h5>

              {/** Calculs de TVA incluse **/}
              {(() => {
                const tvaRate = 21;
                const tvaAmount = totalAmount * (tvaRate / (100 + tvaRate));
                const subtotalHT = totalAmount - tvaAmount;

                return (
                  <>
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ color: 'var(--text-secondary)' }}>Sous-total (HT)</span>
                      <span style={{ fontWeight: 500 }}>{subtotalHT.toFixed(2)}€</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ color: 'var(--text-secondary)' }}>Livraison</span>
                      <span style={{ fontWeight: 500 }}>Gratuite</span>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                      <span style={{ color: 'var(--text-secondary)' }}>TVA 21% incluse</span>
                      <span style={{ fontWeight: 500 }}>{tvaAmount.toFixed(2)}€</span>
                    </div>

                    <hr className="my-4" />

                    <div className="d-flex justify-content-between mb-4">
                      <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Total TTC</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{totalAmount.toFixed(2)}€</span>
                    </div>
                  </>
                );
              })()}


              <Button
                className="w-100 btn-custom"
                style={{ fontSize: '1rem' }}
              >
                Payer via PayPal
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;