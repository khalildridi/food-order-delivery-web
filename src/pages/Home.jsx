import React from "react";
import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import guyImg from "../assets/images/delivery-guy.png";
import "../styles/hero-section.css";
// import "../styles/home.css"; // nouveau fichier CSS pour enrichir le styl§e

const Home = () => {
  return (
    <Helmet title="Home">
      {/* HERO SECTION */}
      <section className="hero__section">
        <Container>
          <Row className="align-items-center">
            <Col lg="6" md="6">
              <div className="hero__content">
                <h5 className="mb-3">Easy order & fast delivery</h5>
                <h1 className="mb-4 hero__title">
                  <span>Enjoy</span> your favorite Pizza
                </h1>
                <p className="hero__subtitle">
                  Fresh, hot, and delicious pizzas delivered to your doorsteps in minutes.
                </p>
                <button className="order__btn d-flex align-items-center justify-content-between">
                  <Link to="/pizzas">
                    See Menu <i className="ri-arrow-right-s-line"></i>
                  </Link>
                </button>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={guyImg} alt="delivery-guy" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* SERVICES SECTION */}
      <section className="services__section py-5">
        <Container>
          <Row className="text-center">
            <Col lg="4" md="6" sm="12" className="mb-4">
              <div className="service__card">
                <h3>Fresh Ingredients</h3>
                <p>We use only the freshest and highest quality ingredients for every pizza we make.</p>
              </div>
            </Col>

            <Col lg="4" md="6" sm="12" className="mb-4">
              <div className="service__card">
                <h3>Fast Delivery</h3>
                <p>Lightning-fast delivery so you can enjoy your pizza while it's still hot and fresh.</p>
              </div>
            </Col>

            <Col lg="4" md="6" sm="12" className="mb-4">
              <div className="service__card">
                <h3>Best Taste</h3>
                <p>Our signature recipes guarantee a taste you'll come back for again and again.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="cta__section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg="8" md="8">
              <h2>Ready to taste the best pizza in town?</h2>
              <p>Place your order now and enjoy a delightful meal at home!</p>
            </Col>
            <Col lg="4" md="4" className="text-md-end text-center mt-3 mt-md-0">
              <Link to="/order" className="btn btn-primary cta__btn">
                Order Now
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
