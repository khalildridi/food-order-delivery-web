// Contact.jsx
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/contact.css'; // Toujours ton CSS
import contactIllustration from "../assets/images/contact.png";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Tous les champs doivent être remplis.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success('Message envoyé avec succès !');
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <div className="contact__page">
      <h2>Nous Contacter</h2>
      <p>Envoyez-nous un message, nous vous répondrons dans les plus brefs délais.</p>

      <div className="contact__container">
        {/* Partie gauche - Illustration */}
        <div className="contact__illustration" style={{ flex: 1 }}>

         
          <img src={contactIllustration} alt="Illustration Contact" style={{maxHeight:"400px",width:"500px"}} />
        </div>

        {/* Partie droite - Formulaire */}
        <form onSubmit={handleSubmit} className="contact__form">
          <div className="form__group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom"
              required
            />
          </div>

          <div className="form__group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Votre email"
              required
            />
          </div>

          <div className="form__group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Votre message"
              required
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Contact;
