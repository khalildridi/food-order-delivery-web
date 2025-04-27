import React, { useState, useEffect } from "react";
import products from "../assets/fake-data/products";
import { useParams, useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import ExtraIngredient from '../components/ExtraIngredient/ExtraIngredient.jsx'
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "../styles/product-details.css";
import "../styles/product-card.css";

import ProductCard from "../components/UI/product-card/ProductCard";

const ExtraIngredients = {
  MUSHROOMS: "Mushrooms",
  ONION: "Onion",
  PEPPER: "Pepper",
  PINAPPLE: "Pinapple", 
  TUNA: "Tuna", 
  MEAT: "Meat", 
  CHEESE: "Cheese", 
  HOTSAUCE: "Hot Sauce", 
  CORN: "Corn"
}

const PizzaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartItems);
  
  // Déplacer TOUS les useState au début du composant
  const [extraIngredients, setExtraIngredients] = useState([]);
  const [isUpdateNotificationDisplayed, setIsUpdateNotificationDisplayed] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  
  // Trouver la pizza correspondante
  const product = products.find((product) => product.id === id);
  
  // Premier useEffect : gérer la redirection et initialiser previewImg
  useEffect(() => {
    if (!product) {
      toast.error("Pizza non trouvée !", {
        position: "top-right",
        autoClose: 3000
      });
      navigate('/pizzas');
      return;
    }
    
    // Initialiser l'image de prévisualisation
    setPreviewImg(product.image01);
    window.scrollTo(0, 0);
  }, [product, navigate]);
  
  // Deuxième useEffect : gérer les ingrédients extras
  useEffect(() => {
    if (!product) return;
    
    const existingPizza = cartProducts.find(item => item.id === id);
    if(existingPizza) {
      setExtraIngredients(existingPizza.extraIngredients);
    } else {
      setExtraIngredients([]);
    }
  }, [cartProducts, id, product]);

  function updateExtraIngredients(ingredient) {
    if(extraIngredients.includes(ingredient)) {
      setExtraIngredients(extraIngredients.filter(item => item !== ingredient));
    } else {
      setExtraIngredients(previousState => [...previousState, ingredient]);
    }
  }
  
  const addItem = () => {
    if (!product) return;
    
    dispatch(
      cartActions.addItem({
        id,
        title: product.title,
        price: product.price,
        image01: product.image01,
        extraIngredients
      })
    );
    
    // Utiliser toast à la place de la notification personnalisée
    toast.success(`${product.title} ${cartProducts.find(item => item.id === id) ? 'mis à jour' : 'ajouté'} dans votre panier!`, {
      position: "top-right",
      autoClose: 2000
    });
  };

  // Si pas de produit trouvé, on montre un message de chargement temporaire
  if (!product) {
    return (
      <Helmet title="Pizza non trouvée">
        <CommonSection title="Recherche de la pizza..." />
        <Container>
          <Row>
            <Col lg="12" className="text-center py-5">
              <div className="loading__container">
                <div className="loader"></div>
              </div>
            </Col>
          </Row>
        </Container>
        <ToastContainer 
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Helmet>
    );
  }
  
  const { title, price, category, desc, image01 } = product;
  const relatedProduct = products.filter((item) => category === item.category);

  return (
    <Helmet title={title}>
      <CommonSection title={title} />

      <section>
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div className="product__images">
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(product.image01)}
                >
                  <img src={product.image01} alt="" className="w-50" />
                </div>
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(product.image02)}
                >
                  <img src={product.image02} alt="" className="w-50" />
                </div>

                <div
                  className="img__item"
                  onClick={() => setPreviewImg(product.image03)}
                >
                  <img src={product.image03} alt="" className="w-50" />
                </div>
              </div>
            </Col>

            <Col lg="4" md="4">
              <div className="product__main-img">
                <img src={previewImg} alt={title} className="w-100" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{title}</h2>
                <p className="product__price">
                  Prix: <span>{price.toFixed(2)} €</span>
                </p>
                <p className="category mb-5">
                  Catégorie: <span>{category}</span>
                </p>

                <button onClick={addItem} className="addTOCART__btn">
                  {cartProducts.find(item => item.id === id) ? 'Mettre à jour le panier' : 'Ajouter au panier'}
                </button>
              </div>
            </Col>

            <Col lg='12'>
              <div className="extraIngredientsGrid">
                {(Object.values(ExtraIngredients)).map((ingredient) => {
                  return (
                    <ExtraIngredient 
                      isChecked={extraIngredients.includes(ingredient)} 
                      key={ingredient} 
                      onSelect={ingredient => updateExtraIngredients(ingredient)} 
                      ingredient={ingredient}
                    />
                  )
                })}
              </div>
            </Col>

            <Col lg="12">
              <h6 className="description">Description</h6>
              <div className="description__content">
                <p>{desc}</p>
              </div>
            </Col>

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">Vous pourriez aussi aimer</h2>
            </Col>

            {relatedProduct.filter(item => item.id !== id).slice(0, 4).map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Helmet>
  );
};

export default PizzaDetails;