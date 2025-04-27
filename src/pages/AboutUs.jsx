import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { RiTeamLine, RiShieldUserLine, RiCustomerService2Line } from "react-icons/ri";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";

import "../styles/about-us.css"; // (à créer pour styliser)

const AboutUs = () => {
  return (
    <Helmet title="À Propos de Nous">
      <CommonSection title="Qui sommes-nous ?" />
      <section className="about-us-section">
        <Container>
          <Row className="mb-5">
            <Col lg="6" className="d-flex align-items-center">
              <div className="about-content">
                <h2 className="section-title">Notre Mission</h2>
                <p className="section-description">
                  Chez <strong>Foodie's Paradise</strong>, nous nous engageons à offrir à nos clients une expérience culinaire inoubliable, avec des produits frais, de qualité, et un service irréprochable. 
                </p>
                <p>
                  Notre objectif est de vous rapprocher de vos plats préférés, rapidement et avec amour.
                </p>
                <Link to="/pizzas" className="primary-btn mt-4">
                  Explorer nos produits
                </Link>
              </div>
            </Col>
            <Col lg="6">
              <div className="about-image">
                <img src="/images/about-us.jpg" alt="À propos de nous" className="img-fluid rounded" />
              </div>
            </Col>
          </Row>

          <Row className="features-row">
            <Col md="4" className="feature-card">
              <div className="feature-icon">
                <RiTeamLine size={40} />
              </div>
              <h5>Notre Équipe</h5>
              <p>Une équipe passionnée dédiée à l'excellence culinaire et au service client.</p>
            </Col>
            <Col md="4" className="feature-card">
              <div className="feature-icon">
                <RiShieldUserLine size={40} />
              </div>
              <h5>Notre Engagement</h5>
              <p>Priorité à la qualité, à la fraîcheur et à la satisfaction client.</p>
            </Col>
            <Col md="4" className="feature-card">
              <div className="feature-icon">
                <RiCustomerService2Line size={40} />
              </div>
              <h5>Notre Support</h5>
              <p>Un support client à l'écoute et réactif pour répondre à toutes vos questions.</p>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AboutUs;
