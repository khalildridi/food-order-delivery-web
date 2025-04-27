// Pizzas.jsx - Composant principal amélioré avec vos styles existants
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";
import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";
import Helmet from "../components/Helmet/Helmet";
import ReactPaginate from "react-paginate";
import "../styles/pagination.css";
import "../styles/products-page.css"; // Nouveau fichier CSS à créer
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Pizzas = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  
  // Simulation d'un chargement pour démonstration
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);
  
  // Filtre de recherche
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Tri des produits
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low") return a.price - b.price;
    if (sortOption === "price-high") return b.price - a.price;
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    return 0; // default
  });

  const productPerPage = viewMode === "grid" ? 8 : 5;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = sortedProducts.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(sortedProducts.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Helmet title="Nos Pizzas">
      <div className="products__page">
        <Container>
          {/* Header Section */}
          <div className="products__header">
            <h2 className="products__title">Notre Menu de Pizzas</h2>
            <p className="products__subtitle">
              Découvrez nos délicieuses pizzas fraîchement préparées
            </p>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="products__filters">
            <div className="search__box">
              <input
                type="text"
                placeholder="Rechercher une pizza..."
                className="search__input"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPageNumber(0);
                }}
              />
            </div>
            
            <div className="filter__options">
              <select 
                className="sort__select"
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  setPageNumber(0);
                }}
              >
                <option value="default">Trier par</option>
                <option value="price-low">Prix: croissant</option>
                <option value="price-high">Prix: décroissant</option>
                <option value="name-asc">Nom: A-Z</option>
                <option value="name-desc">Nom: Z-A</option>
              </select>
              
              <div className="view__options">
                <button 
                  className={`view__btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  Grille
                </button>
                <button 
                  className={`view__btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  Liste
                </button>
              </div>
            </div>
          </div>
          
          {/* Results Count */}
          <p className="results__count">
            {sortedProducts.length} produits trouvés
          </p>
          
          {/* Loading State */}
          {isLoading ? (
            <div className="loading__container">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              {/* Products Display */}
              {viewMode === "grid" ? (
                <Row>
                  {displayPage.length > 0 ? (
                    displayPage.map((item) => (
                      <Col
                        lg="3"
                        md="4"
                        sm="6"
                        xs="6"
                        key={item.id}
                        className="mb-4"
                      >
                        <ProductCard item={item} />
                      </Col>
                    ))
                  ) : (
                    <div className="no__products">
                      <p>Aucun produit trouvé</p>
                    </div>
                  )}
                </Row>
              ) : (
                <div className="products__list">
                  {displayPage.length > 0 ? (
                    displayPage.map((item) => (
                      <ProductListItem key={item.id} item={item} />
                    ))
                  ) : (
                    <div className="no__products">
                      <p>Aucun produit trouvé</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Pagination */}
              {pageCount > 1 && (
                <div className="d-flex justify-content-center mt-4 mb-4">
                  <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={changePage}
                    previousLabel={"Précédent"}
                    nextLabel={"Suivant"}
                    containerClassName="paginationBttns"
                    previousLinkClassName="prevBtn"
                    nextLinkClassName="nextBtn"
                    disabledClassName="paginationDisabled"
                    activeClassName="paginationActive"
                  />
                </div>
              )}
            </>
          )}
        </Container>
        {/* Assurez-vous que ToastContainer est placé ici */}
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
      </div>
    </Helmet>
  );
};

// ProductListItem - Nouveau composant pour l'affichage en liste
const ProductListItem = ({ item }) => {
  const { id, title, image01, price } = item;
  const dispatch = useDispatch();
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
    // Appelez toast.success directement
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
    <div className="product__list__item">
      <div className="product__list__image">
        <img src={image01} alt={title} />
      </div>
      <div className="product__list__content">
        <h5>
          <Link to={`/pizzas/${id}`}>{title}</Link>
        </h5>
        <p className="product__list__desc">
          Une délicieuse pizza préparée avec les meilleurs ingrédients
        </p>
      </div>
      <div className="product__list__actions">
        <span className="product__price">{price.toFixed(2)} €</span>
        <button className="addTOCART__btn" onClick={addToCart}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default Pizzas;