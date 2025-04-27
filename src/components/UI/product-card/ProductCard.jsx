// import React from "react";

// import "../../../styles/product-card.css";

// // import productImg from "../../../assets/images/product_2.1.jpg";

// import { useDispatch } from "react-redux";
// import { cartActions } from "../../../store/shopping-cart/cartSlice";

// import { Link } from "react-router-dom";

// const ProductCard = (props) => {
//   const { id, title, image01, price, extraIngredients } = props.item;
//   const dispatch = useDispatch();

//   const addToCart = () => {
//     dispatch(
//       cartActions.addItem({
//         id,
//         title,
//         image01,
//         price,
//         extraIngredients
//       })
//     );
//   };

//   return (
//     <div className="product__item d-flex flex-column justify-content-between">
//       <div className="product__content">
//         <img className="product__img w-50" src={image01} alt="Pizza" />
//         <h5>
//           <Link to={`/pizzas/${id}`}>{title}</Link>
//         </h5>
//       </div>
//       <div className="d-flex flex-column align-items-center justify-content-between">
//         <span className="product__price mb-2">{price} € </span>
//         <button className="addTOCART__btn" onClick={addToCart}>
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "../../../styles/product-card.css";

const ProductCard = (props) => {
  const { id, title, image01, price } = props.item;
  const dispatch = useDispatch();
  const [isImgZoomed, setIsImgZoomed] = useState(false);
  // Initialiser extraIngredients comme un tableau vide
  const [extraIngredients, setExtraIngredients] = useState([]);

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        image01,
        price,
        extraIngredients,
        quantity: 1
      })
    );
    
    toast.success(`${title} ajouté au panier ! 🍕`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="product__item">
      <div className="product__content">
        <div className="product__img__container">
          <Link to={`/pizzas/${id}`}>
            <img 
              className={`product__img ${isImgZoomed ? 'zoom' : ''}`}
              src={image01} 
              alt="pizza" 
              onMouseEnter={() => setIsImgZoomed(true)}
              onMouseLeave={() => setIsImgZoomed(false)}
            />
          </Link>
        </div>
        <h5>
          <Link to={`/pizzas/${id}`}>{title}</Link>
        </h5>
      </div>

      <div className="product__footer">
        <span className="product__price">{price.toFixed(2)} €</span>
        <button className="addTOCART__btn" onClick={addToCart}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard;