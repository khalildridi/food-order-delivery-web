import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col, Alert } from "reactstrap";
import { RiDeleteBin6Line, RiShoppingCart2Line, RiArrowRightSLine } from "react-icons/ri";
import { FiMinus, FiPlus } from "react-icons/fi";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { cartActions } from "../store/shopping-cart/cartSlice";
import "../styles/cart-page.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  return (
    <Helmet title="Panier">
      <CommonSection title="Votre Panier" />
      <section className="cart-section">
        <Container>
          <Row>
            <Col lg="12">
              {showSuccessAlert && (
                <div>
                  <Alert color="success" className="mb-4" toggle={() => setShowSuccessAlert(false)}>
                    Article supprimé avec succès!
                  </Alert>
                </div>
              )}

              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-cart-icon">
                    <RiShoppingCart2Line />
                  </div>
                  <h3>Votre panier est vide</h3>
                  <p>Il semble que vous n'ayez pas encore choisi d'articles.</p>
                  <Link to="/pizzas" className="continue-shopping-btn">
                    Explorer les produits
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="cart-header">
                    <h3>Récapitulatif de votre commande</h3>
                    <span className="cart-items-count">{cartItems.length} article(s)</span>
                  </div>

                  <div className="cart-items-container">
                    {cartItems.map((item) => (
                      <CartItem 
                        key={item.id} 
                        item={item} 
                        onSuccessDelete={() => setShowSuccessAlert(true)}
                      />
                    ))}
                  </div>

                  <div className="cart-summary">
                    <div className="cart-summary-row">
                      <span>Sous-total</span>
                      <span className="cart-subtotal">${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="cart-summary-row text-muted">
                      <span>Taxes</span>
                      <span>Calculées à la caisse</span>
                    </div>
                    <div className="cart-summary-row text-muted">
                      <span>Livraison</span>
                      <span>Calculée à la caisse</span>
                    </div>
                    <div className="cart-summary-divider"></div>
                    <div className="cart-summary-row cart-total">
                      <span>Total estimé</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    
                    <div className="cart-actions">
                      <Link to="/pizzas" className="secondary-btn">
                        <span>Continuer vos achats</span>
                      </Link>
                      <Link to="/checkout" className="primary-btn">
                        <span>Passer à la caisse</span>
                        <RiArrowRightSLine />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const CartItem = ({ item, onSuccessDelete }) => {
  const { id, image01, title, price, quantity } = item;
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(cartActions.deleteItem(id));
    if (onSuccessDelete) onSuccessDelete();
  };

  const incrementItem = () => {
    dispatch(cartActions.addItem({
      id,
      title,
      price,
      image01
    }));
  };

  const decrementItem = () => {
    dispatch(cartActions.removeItem(id));
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={image01} alt={title} />
      </div>
      <div className="cart-item-content">
        <div className="cart-item-info">
          <h4 className="cart-item-title">{title}</h4>
          <div className="cart-item-price">${price}</div>
        </div>
        <div className="cart-item-actions">
          <div className="cart-item-quantity">
            <button 
              className="quantity-btn" 
              onClick={decrementItem}
              disabled={quantity === 1}
            >
              <FiMinus />
            </button>
            <span className="quantity-value">{quantity}</span>
            <button 
              className="quantity-btn" 
              onClick={incrementItem}
            >
              <FiPlus />
            </button>
          </div>
          <button 
            className="delete-btn" 
            onClick={deleteItem}
            aria-label="Supprimer l'article"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
