// // Contact.jsx
// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../styles/contact.css'; // Toujours ton CSS
// import contactIllustration from "../assets/images/contact.png";
// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.email || !formData.message) {
//       toast.error('Tous les champs doivent être remplis.');
//       return;
//     }

//     setIsLoading(true);

//     setTimeout(() => {
//       setIsLoading(false);
//       toast.success('Message envoyé avec succès !');
//       setFormData({ name: '', email: '', message: '' });
//     }, 2000);
//   };

//   return (
//     <div className="contact__page">
//       <h2>Nous Contacter</h2>
//       <p>Envoyez-nous un message, nous vous répondrons dans les plus brefs délais.</p>

//       <div className="contact__container">
//         {/* Partie gauche - Illustration */}
//         <div className="contact__illustration" style={{ flex: 1 }}>

         
//           <img src={contactIllustration} alt="Illustration Contact" style={{maxHeight:"400px",width:"500px"}} />
//         </div>

//         {/* Partie droite - Formulaire */}
//         <form onSubmit={handleSubmit} className="contact__form">
//           <div className="form__group">
//             <label htmlFor="name">Nom</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Votre nom"
//               required
//             />
//           </div>

//           <div className="form__group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Votre email"
//               required
//             />
//           </div>

//           <div className="form__group">
//             <label htmlFor="message">Message</label>
//             <textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               placeholder="Votre message"
//               required
//             />
//           </div>

//           <button type="submit" disabled={isLoading}>
//             {isLoading ? 'Envoi en cours...' : 'Envoyer'}
//           </button>
//         </form>
//       </div>

//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   );
// };

// export default Contact;
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/contact.css';
import contactIllustration from "../assets/images/contact.png";
import { 
  FiUser, 
  FiMail, 
  FiMessageSquare, 
  FiSend, 
  FiPhone, 
  FiMapPin, 
  FiClock,
  FiArrowRight,
  FiCheck
} from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('message');

  const contactInfo = {
    phone: '+33 1 23 45 67 89',
    email: 'contact@votre-boutique.fr',
    address: '123 Rue de la Paix, 75000 Paris',
    hours: [
      { days: 'Lundi - Vendredi', time: '9:00 - 18:00' },
      { days: 'Samedi', time: '10:00 - 16:00' },
      { days: 'Dimanche', time: 'Fermé' }
    ]
  };

  const faqItems = [
    {
      question: "Comment suivre ma commande ?",
      answer: "Vous pouvez suivre votre commande en vous connectant à votre compte et en visitant la section 'Mes commandes'. Un numéro de suivi vous sera fourni dès que votre colis sera expédié."
    },
    {
      question: "Quelle est votre politique de retour ?",
      answer: "Nous acceptons les retours dans un délai de 30 jours suivant la réception de votre commande. Les articles doivent être dans leur état d'origine avec les étiquettes encore attachées."
    },
    {
      question: "Combien de temps pour la livraison ?",
      answer: "Nos délais de livraison standard sont de 3 à 5 jours ouvrables. Pour la livraison express, comptez 1 à 2 jours ouvrables."
    }
  ];

  useEffect(() => {
    // Animation de l'illustration au chargement
    const illustration = document.querySelector('.contact__illustration-image');
    if (illustration) {
      illustration.classList.add('animated');
    }
  }, []);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Le nom est requis";
    }
    
    if (!formData.email.trim()) {
      errors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Format d'email invalide";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Le message est requis";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Le message doit contenir au moins 10 caractères";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
    // Effacer l'erreur du champ modifié
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire.');
      return;
    }

    setIsLoading(true);

    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success('Message envoyé avec succès !');
      
      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitted(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="contact__page">
      <div className="contact__header">
        <h1>Contactez-nous</h1>
        <p className="contact__subtitle">Nous sommes à votre écoute. N'hésitez pas à nous faire part de vos questions ou commentaires.</p>
        
        <div className="contact__tabs">
          <button 
            className={`contact__tab ${activeTab === 'message' ? 'active' : ''}`} 
            onClick={() => setActiveTab('message')}
          >
            <FiMessageSquare /> Message
          </button>
          <button 
            className={`contact__tab ${activeTab === 'info' ? 'active' : ''}`} 
            onClick={() => setActiveTab('info')}
          >
            <FiPhone /> Nos coordonnées
          </button>
          <button 
            className={`contact__tab ${activeTab === 'faq' ? 'active' : ''}`} 
            onClick={() => setActiveTab('faq')}
          >
            <FiMessageSquare /> FAQ
          </button>
        </div>
      </div>

      <div className="contact__container">
        {activeTab === 'message' && (
          <>
            {/* Partie gauche - Illustration */}
            <div className="contact__illustration">
              <div className="contact__illustration-wrapper">
                <img 
                  src={contactIllustration} 
                  alt="Illustration Contact" 
                  className="contact__illustration-image" 
                />
                <div className="contact__illustration-badge">
                  <span className="badge__text">Réponse sous 24h</span>
                </div>
              </div>
              
              <div className="contact__channels">
                <h3>Plusieurs façons de nous contacter</h3>
                <div className="contact__channel-item">
                  <div className="channel__icon">
                    <FiMail />
                  </div>
                  <div className="channel__content">
                    <h4>Email</h4>
                    <p>{contactInfo.email}</p>
                  </div>
                </div>
                <div className="contact__channel-item">
                  <div className="channel__icon">
                    <FiPhone />
                  </div>
                  <div className="channel__content">
                    <h4>Téléphone</h4>
                    <p>{contactInfo.phone}</p>
                  </div>
                </div>
                
                <div className="contact__social">
                  <span>Suivez-nous:</span>
                  <div className="social__icons">
                    <a href="#" className="social__icon"><FaFacebook /></a>
                    <a href="#" className="social__icon"><FaTwitter /></a>
                    <a href="#" className="social__icon"><FaInstagram /></a>
                    <a href="#" className="social__icon"><FaLinkedin /></a>
                  </div>
                </div>
              </div>
            </div>

            {/* Partie droite - Formulaire */}
            <div className="contact__form-container">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="contact__form">
                  <h2>Envoyez-nous un message</h2>
                  
                  <div className={`form__group ${formErrors.name ? 'has-error' : formData.name ? 'is-valid' : ''}`}>
                    <label htmlFor="name">
                      <FiUser className="input-icon" /> Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Votre nom"
                    />
                    {formErrors.name && <div className="error-message">{formErrors.name}</div>}
                    {formData.name && !formErrors.name && <FiCheck className="valid-icon" />}
                  </div>

                  <div className={`form__group ${formErrors.email ? 'has-error' : formData.email ? 'is-valid' : ''}`}>
                    <label htmlFor="email">
                      <FiMail className="input-icon" /> Adresse email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Votre email"
                    />
                    {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                    {formData.email && !formErrors.email && <FiCheck className="valid-icon" />}
                  </div>

                  <div className="form__group">
                    <label htmlFor="subject">
                      <FiMessageSquare className="input-icon" /> Sujet (optionnel)
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Sujet de votre message"
                    />
                  </div>

                  <div className={`form__group ${formErrors.message ? 'has-error' : formData.message ? 'is-valid' : ''}`}>
                    <label htmlFor="message">
                      <FiMessageSquare className="input-icon" /> Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Détaillez votre message ici..."
                      rows="5"
                    />
                    {formErrors.message && <div className="error-message">{formErrors.message}</div>}
                    {formData.message && !formErrors.message && <FiCheck className="valid-icon textarea-valid" />}
                  </div>

                  <div className="form__agreement">
                    <label className="checkbox-container">
                      <input type="checkbox" required />
                      <span className="checkmark"></span>
                      J'accepte que mes données soient traitées conformément à la politique de confidentialité
                    </label>
                  </div>

                  <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="loading-spinner"></span>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le message
                        <FiSend className="button-icon" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="success-message">
                  <div className="success-icon">
                    <FiCheck />
                  </div>
                  <h2>Message envoyé !</h2>
                  <p>Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="reset-button"
                  >
                    Envoyer un autre message
                    <FiArrowRight className="button-icon" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'info' && (
          <div className="contact__info-container">
            <div className="contact__info-card">
              <div className="info-card__header">
                <FiMapPin className="info-icon" />
                <h3>Notre adresse</h3>
              </div>
              <p>{contactInfo.address}</p>
              <div className="map-container">
                <img src="/api/placeholder/600/300" alt="Carte de notre emplacement" />
                <a href="#" className="map-link">Voir sur Google Maps <FiArrowRight /></a>
              </div>
            </div>
            
            <div className="contact__info-card">
              <div className="info-card__header">
                <FiClock className="info-icon" />
                <h3>Heures d'ouverture</h3>
              </div>
              <ul className="hours-list">
                {contactInfo.hours.map((item, index) => (
                  <li key={index} className="hours-item">
                    <span className="days">{item.days}</span>
                    <span className="time">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="contact__info-card">
              <div className="info-card__header">
                <FiPhone className="info-icon" />
                <h3>Contactez-nous</h3>
              </div>
              <div className="contact-methods">
                <div className="contact-method">
                  <FiPhone className="method-icon" />
                  <div>
                    <h4>Téléphone</h4>
                    <p>{contactInfo.phone}</p>
                  </div>
                </div>
                <div className="contact-method">
                  <FiMail className="method-icon" />
                  <div>
                    <h4>Email</h4>
                    <p>{contactInfo.email}</p>
                  </div>
                </div>
              </div>
              <div className="social-large">
                <h4>Réseaux sociaux</h4>
                <div className="social-large-icons">
                  <a href="#" className="social-large-icon"><FaFacebook /></a>
                  <a href="#" className="social-large-icon"><FaTwitter /></a>
                  <a href="#" className="social-large-icon"><FaInstagram /></a>
                  <a href="#" className="social-large-icon"><FaLinkedin /></a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="contact__faq-container">
            <div className="faq__header">
              <h2>Questions fréquentes</h2>
              <p>Vous trouverez peut-être déjà réponse à votre question ci-dessous.</p>
            </div>
            
            <div className="faq__items">
              {faqItems.map((item, index) => (
                <details key={index} className="faq__item">
                  <summary className="faq__question">
                    {item.question}
                  </summary>
                  <div className="faq__answer">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
            
            <div className="faq__cta">
              <p>Vous n'avez pas trouvé réponse à votre question ?</p>
              <button 
                className="cta-button"
                onClick={() => setActiveTab('message')}
              >
                Contactez-nous directement
                <FiArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Contact;