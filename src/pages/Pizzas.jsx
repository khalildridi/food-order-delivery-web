// Pizzas.jsx - Composant principal amélioré avec sections supplémentaires
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
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
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 30 });
  const [showFilters, setShowFilters] = useState(false);
  
  // Simulation d'un chargement pour démonstration
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  // Catégories disponibles (vous pouvez les ajuster selon vos besoins)
  const categories = [
    { id: "all", name: "Toutes" },
    { id: "classique", name: "Classiques" },
    { id: "specialite", name: "Spécialités" },
    { id: "vegetarienne", name: "Végétariennes" },
    { id: "épicées", name: "Épicées" }
  ];
  
  // Filtrer par recherche, catégorie et prix
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });
  
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

  // Fonction pour réinitialiser tous les filtres
  const resetFilters = () => {
    setSearchTerm("");
    setSortOption("default");
    setCategoryFilter("all");
    setPriceRange({ min: 0, max: 30 });
    setPageNumber(0);
  };

  // Promotions du jour (données fictives)
  const dailySpecials = [
    {
      id: 1,
      title: "Offre Duo",
      description: "2 pizzas moyennes + 1 boisson 1L",
      price: 19.99,
      oldPrice: 25.99,
      image: "https://via.placeholder.com/300x200"
    },
    {
      id: 2,
      title: "Menu Familial",
      description: "2 grandes pizzas + 2 entrées + 2L de boisson",
      price: 29.99,
      oldPrice: 35.99,
      image: "https://via.placeholder.com/300x200"
    }
  ];

  // Suggestions de combinaisons (données fictives)
  const combinations = [
    {
      id: 1,
      title: "Classique + Boisson",
      description: "Pizza Margherita + Coca-Cola",
      price: 12.99,
      image: "https://via.placeholder.com/200x150"
    },
    {
      id: 2,
      title: "Pizza + Dessert",
      description: "Pizza Quatre Fromages + Tiramisu",
      price: 14.99,
      image: "https://via.placeholder.com/200x150"
    },
    {
      id: 3,
      title: "Menu Complet",
      description: "Pizza Pepperoni + Salade + Boisson",
      price: 16.99,
      image: "https://via.placeholder.com/200x150"
    }
  ];

  return (
    <Helmet title="Nos Pizzas">
      <div className="products__page">
        {/* Hero Banner Section */}
        <div className="pizza__hero">
          <Container>
            <Row>
              <Col md="6">
                <div className="pizza__hero-content">
                  <h1>Nos Pizzas Artisanales</h1>
                  <p>Découvrez notre sélection de pizzas préparées avec des ingrédients frais et de qualité</p>
                  <div className="hero__stats">
                    <div className="stat__item">
                      <span className="stat__number">30+</span>
                      <span className="stat__text">Recettes</span>
                    </div>
                    <div className="stat__item">
                      <span className="stat__number">100%</span>
                      <span className="stat__text">Fait Maison</span>
                    </div>
                    <div className="stat__item">
                      <span className="stat__number">15</span>
                      <span className="stat__text">Ans d'Expérience</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="pizza__hero-image">
                  {/* Image de fond en CSS ou image ici */}
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Daily Specials Section */}
        <section className="daily__specials">
          <Container>
            <div className="section__header">
              <h2>Promotions du Jour</h2>
              <p>Profitez de nos offres spéciales à durée limitée</p>
            </div>
            <Row>
              {dailySpecials.map((special) => (
                <Col md="6" key={special.id}>
                  <div className="special__card">
                    <div className="special__image">
                      <img src={special.image} alt={special.title} />
                      <div className="discount__badge">-{Math.round(((special.oldPrice - special.price) / special.oldPrice) * 100)}%</div>
                    </div>
                    <div className="special__content">
                      <h4>{special.title}</h4>
                      <p>{special.description}</p>
                      <div className="special__price">
                        <span className="new__price">{special.price.toFixed(2)} €</span>
                        <span className="old__price">{special.oldPrice.toFixed(2)} €</span>
                      </div>
                      <button className="btn__add-to-cart">Ajouter au panier</button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <Container>
          {/* Header Section */}
          <div className="products__header">
            <h2 className="products__title">Notre Menu de Pizzas</h2>
            <p className="products__subtitle">
              Découvrez nos délicieuses pizzas fraîchement préparées
            </p>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="products__controls">
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
              <button className="filter__toggle" onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
              </button>
            </div>
            
            <div className={`filter__panel ${showFilters ? 'active' : ''}`}>
              <div className="filter__section">
                <h5>Catégories</h5>
                <div className="category__buttons">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`category__btn ${categoryFilter === cat.id ? 'active' : ''}`}
                      onClick={() => {
                        setCategoryFilter(cat.id);
                        setPageNumber(0);
                      }}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="filter__section">
                <h5>Gamme de Prix</h5>
                <div className="price__range">
                  <span>{priceRange.min.toFixed(2)} €</span>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={priceRange.max}
                    onChange={(e) => {
                      setPriceRange({ ...priceRange, max: parseInt(e.target.value) });
                      setPageNumber(0);
                    }}
                  />
                  <span>{priceRange.max.toFixed(2)} €</span>
                </div>
              </div>
              
              <div className="filter__section">
                <button className="reset__btn" onClick={resetFilters}>Réinitialiser les filtres</button>
              </div>
            </div>
            
            <div className="view__controls">
              <div className="sort__box">
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
              </div>
              
              <div className="view__options">
                <button 
                  className={`view__btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <i className="ri-grid-fill"></i> Grille
                </button>
                <button 
                  className={`view__btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <i className="ri-list-check"></i> Liste
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
                      <button className="reset__btn" onClick={resetFilters}>Réinitialiser les filtres</button>
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
                      <button className="reset__btn" onClick={resetFilters}>Réinitialiser les filtres</button>
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

        {/* Combinations Section */}
        <section className="combinations__section">
          <Container>
            <div className="section__header">
              <h2>Nos Combinaisons Parfaites</h2>
              <p>Découvrez nos suggestions pour un repas complet</p>
            </div>
            <Row>
              {combinations.map((combo) => (
                <Col md="4" key={combo.id}>
                  <div className="combo__card">
                    <div className="combo__image">
                      <img src={combo.image} alt={combo.title} />
                    </div>
                    <div className="combo__content">
                      <h4>{combo.title}</h4>
                      <p>{combo.description}</p>
                      <span className="combo__price">{combo.price.toFixed(2)} €</span>
                      <button className="btn__add-to-cart">Commander</button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Customer Favorites Section */}
        <section className="favorites__section">
          <Container>
            <div className="section__header">
              <h2>Les Favoris de nos Clients</h2>
              <p>Les pizzas les plus appréciées par notre communauté</p>
            </div>
            <Row>
              {products.slice(0, 4).map((item) => (
                <Col lg="3" md="4" sm="6" key={item.id}>
                  <div className="favorite__card">
                    <div className="favorite__badge">Populaire</div>
                    <div className="favorite__image">
                      <img src={item.image01} alt={item.title} />
                    </div>
                    <div className="favorite__content">
                      <h5>{item.title}</h5>
                      <div className="favorite__rating">
                        <span>★★★★★</span>
                        <span className="rating__count">(120)</span>
                      </div>
                      <span className="favorite__price">{item.price.toFixed(2)} €</span>
                      <Link to={`/pizzas/${item.id}`} className="view__details">
                        Voir détails
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Pizza Knowledge Section */}
        <section className="knowledge__section">
          <Container>
            <div className="section__header">
              <h2>Le Saviez-Vous?</h2>
              <p>Quelques faits intéressants sur nos pizzas</p>
            </div>
            <Row>
              <Col md="4">
                <div className="knowledge__card">
                  <div className="knowledge__icon">🌱</div>
                  <h4>Ingrédients Locaux</h4>
                  <p>Nous utilisons des ingrédients locaux et biologiques pour vous offrir des pizzas plus fraîches et plus savoureuses.</p>
                </div>
              </Col>
              <Col md="4">
                <div className="knowledge__card">
                  <div className="knowledge__icon">🔥</div>
                  <h4>Four à Bois</h4>
                  <p>Nos pizzas sont cuites dans un four à bois traditionnel qui leur confère cette saveur authentique et cette texture parfaite.</p>
                </div>
              </Col>
              <Col md="4">
                <div className="knowledge__card">
                  <div className="knowledge__icon">⏰</div>
                  <h4>Préparation Minute</h4>
                  <p>Chaque pizza est préparée à la commande pour garantir fraîcheur et qualité dans chaque bouchée.</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Call to Action Section */}
        <section className="cta__section">
          <Container>
            <div className="cta__content">
              <h2>Envie d'une pizza personnalisée?</h2>
              <p>Créez votre propre pizza avec nos ingrédients de qualité supérieure</p>
              <Link to="/custom-pizza" className="cta__button">
                Créer Ma Pizza
              </Link>
            </div>
          </Container>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter__section">
          <Container>
            <Row className="align-items-center">
              <Col lg="6">
                <div className="newsletter__content">
                  <h3>Restez informé de nos offres spéciales</h3>
                  <p>Inscrivez-vous à notre newsletter pour recevoir des promotions exclusives</p>
                </div>
              </Col>
              <Col lg="6">
                <form className="newsletter__form">
                  <input type="email" placeholder="Votre adresse email" />
                  <button type="submit">S'abonner</button>
                </form>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ToastContainer for notifications */}
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

// ProductListItem - Composant amélioré pour l'affichage en liste avec lien vers PizzaDetails
const ProductListItem = ({ item }) => {
  const { id, title, image01, price, desc } = item;
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
        <Link to={`/pizzas/${id}`}>
          <img src={image01} alt={title} />
        </Link>
        <div className="product__badges">
          <span className="badge__new">Nouveau</span>
        </div>
      </div>
      <div className="product__list__content">
        <h5>
          <Link to={`/pizzas/${id}`}>{title}</Link>
        </h5>
        <div className="product__rating">
          <span>★★★★★</span>
          <span className="rating__count">(42)</span>
        </div>
        <p className="product__list__desc">
          {desc || "Une délicieuse pizza préparée avec les meilleurs ingrédients"}
        </p>
        <div className="product__tags">
          <span className="product__tag">Populaire</span>
          <span className="product__tag">Fait maison</span>
        </div>
      </div>
      <div className="product__list__actions">
        <span className="product__price">{price.toFixed(2)} €</span>
        <div className="action__buttons">
          <Link to={`/pizzas/${id}`} className="view__details__btn">
            Détails
          </Link>
          <button className="addTOCART__btn" onClick={addToCart}>
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pizzas;