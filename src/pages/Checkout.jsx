import React, { useState, useEffect } from "react";
import "../styles/checkout.css";
import { AiFillCheckCircle, AiOutlineClockCircle, AiOutlineCar, AiOutlineHome, AiOutlineArrowRight } from "react-icons/ai";
import { BsBoxSeam, BsStarFill, BsArrowLeft } from "react-icons/bs";
import { FiCreditCard, FiMail, FiDownload } from "react-icons/fi";

const Checkout = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [progress, setProgress] = useState(15);
  const [currentStep, setCurrentStep] = useState(1);
  const [showExpanded, setShowExpanded] = useState(false);

  // Génère un numéro de commande aléatoire
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 1000000);
    setOrderNumber(`ORD-${randomNum}`);
  }, []);

  // Simule la progression de la commande
  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress === 33) setCurrentStep(2);
          if (newProgress === 66) setCurrentStep(3);
          if (newProgress === 100) setCurrentStep(4);
          return newProgress;
        });
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [progress]);

  // Données du récapitulatif de commande
  const orderItems = [
    { id: 1, name: "T-shirt Premium", price: 29.99, quantity: 2, image: "/api/placeholder/80/80" },
    { id: 2, name: "Jeans Slim", price: 69.99, quantity: 1, image: "/api/placeholder/80/80" }
  ];

  // Données de livraison
  const shippingDetails = {
    address: "123 Rue de la Paix",
    city: "Paris",
    postalCode: "75000",
    country: "France",
    method: "Livraison Standard",
    estimatedDelivery: "29-30 Avril 2025"
  };

  // Données de paiement
  const paymentDetails = {
    method: "Carte de Crédit",
    cardNumber: "•••• •••• •••• 4242",
    total: 129.97,
    subtotal: 119.98,
    shipping: 5.99,
    tax: 4.00
  };

  // Produits recommandés
  const recommendedProducts = [
    { id: 1, name: "Chaussures de sport", price: 89.99, image: "/api/placeholder/100/100", rating: 4.5 },
    { id: 2, name: "Veste légère", price: 79.99, image: "/api/placeholder/100/100", rating: 4.7 },
    { id: 3, name: "Accessoires", price: 24.99, image: "/api/placeholder/100/100", rating: 4.2 }
  ];

  return (
    <div className="checkout-container">
      {/* Barre de navigation */}
      <div className="checkout-nav">
        <button className="back-button">
          <BsArrowLeft /> Retour à la boutique
        </button>
        <div className="checkout-actions">
          <button className="action-button">
            <FiMail /> Recevoir un e-mail
          </button>
          <button className="action-button">
            <FiDownload /> Télécharger le reçu
          </button>
        </div>
      </div>

      {/* Confirmation de la commande */}
      <div className="checkout-success">
        <div className="success-icon">
          <AiFillCheckCircle />
        </div>
        <div className="success-content">
          <h1>Merci pour votre commande!</h1>
          <p>Votre commande <strong>#{orderNumber}</strong> a été confirmée et est en cours de traitement.</p>
          <p>Vous recevrez un e-mail de confirmation sous peu.</p>
        </div>
      </div>

      {/* Suivi de commande */}
      <div className="checkout-tracking">
        <h2>Statut de la commande</h2>
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-steps">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
              <div className="step-icon">
                <AiFillCheckCircle />
              </div>
              <div className="step-label">Confirmée</div>
            </div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="step-icon">
                <BsBoxSeam />
              </div>
              <div className="step-label">Préparation</div>
            </div>
            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="step-icon">
                <AiOutlineCar />
              </div>
              <div className="step-label">Expédiée</div>
            </div>
            <div className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>
              <div className="step-icon">
                <AiOutlineHome />
              </div>
              <div className="step-label">Livrée</div>
            </div>
          </div>
        </div>
        <div className="delivery-estimate">
          <AiOutlineClockCircle />
          <span>Livraison estimée: <strong>{shippingDetails.estimatedDelivery}</strong></span>
        </div>
      </div>

      {/* Résumé de la commande */}
      <div className="order-summary">
        <div className="summary-header">
          <h2>Détails de la commande</h2>
          <button className="toggle-button" onClick={() => setShowExpanded(!showExpanded)}>
            {showExpanded ? "Masquer" : "Afficher"} les détails
          </button>
        </div>

        {showExpanded && (
          <div className="summary-content">
            <div className="order-items">
              <h3>Articles ({orderItems.length})</h3>
              {orderItems.map(item => (
                <div className="order-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <div className="item-meta">
                      <span>Quantité: {item.quantity}</span>
                      <span className="item-price">{item.price.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-info-container">
              <div className="shipping-info">
                <h3>Adresse de livraison</h3>
                <div className="info-content">
                  <p>{shippingDetails.address}</p>
                  <p>{shippingDetails.city}, {shippingDetails.postalCode}</p>
                  <p>{shippingDetails.country}</p>
                </div>
                <h4>Méthode de livraison</h4>
                <p>{shippingDetails.method}</p>
              </div>

              <div className="payment-info">
                <h3>Méthode de paiement</h3>
                <div className="payment-method">
                  <FiCreditCard />
                  <div>
                    <p>{paymentDetails.method}</p>
                    <p>{paymentDetails.cardNumber}</p>
                  </div>
                </div>
                <div className="payment-summary">
                  <div className="summary-row">
                    <span>Sous-total</span>
                    <span>{paymentDetails.subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="summary-row">
                    <span>Livraison</span>
                    <span>{paymentDetails.shipping.toFixed(2)} €</span>
                  </div>
                  <div className="summary-row">
                    <span>TVA</span>
                    <span>{paymentDetails.tax.toFixed(2)} €</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>{paymentDetails.total.toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recommandations */}
      <div className="recommendations">
        <h2>Vous pourriez aussi aimer</h2>
        <div className="product-carousel">
          {recommendedProducts.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-meta">
                  <span className="product-price">{product.price.toFixed(2)} €</span>
                  <div className="product-rating">
                    <BsStarFill />
                    <span>{product.rating}</span>
                  </div>
                </div>
                <button className="add-to-cart">Ajouter au panier</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section d'aide */}
      <div className="help-section">
        <h2>Besoin d'aide ?</h2>
        <div className="help-options">
          <div className="help-option">
            <h3>Suivi de commande</h3>
            <p>Suivez votre commande en temps réel</p>
            <button className="help-button">
              Voir le statut <AiOutlineArrowRight />
            </button>
          </div>
          <div className="help-option">
            <h3>Retours et échanges</h3>
            <p>Politique de retour sous 30 jours</p>
            <button className="help-button">
              En savoir plus <AiOutlineArrowRight />
            </button>
          </div>
          <div className="help-option">
            <h3>Contactez-nous</h3>
            <p>Notre équipe est à votre service</p>
            <button className="help-button">
              Contacter <AiOutlineArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Pied de page */}
      {/* <footer className="checkout-footer">
        <p>© 2025 Votre Boutique. Tous droits réservés.</p>
        <div className="footer-links">
          <a href="#">Confidentialité</a>
          <a href="#">Conditions générales</a>
          <a href="#">FAQ</a>
        </div>
      </footer> */}
    </div>
  );
};

export default Checkout;