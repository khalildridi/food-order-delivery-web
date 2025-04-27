import React from "react";
import { ListGroup, Container, Row, Col } from "reactstrap";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"
import logo from "../../assets/images/res-logo.png";
import "../../styles/footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <Container>
        <Row>
          {/* Logo & Description */}
          <Col lg="3" md="6" sm="6" className="mb-4">
            <div className="footer__logo">
              <img src={logo} alt="MyPizza logo" />
              <h5>MyPizza</h5>
              <p>The best authentic Italian pizzas in town, crafted with premium ingredients!</p>
            </div>
          </Col>

          {/* Delivery Time */}
          <Col lg="3" md="6" sm="6" className="mb-4">
            <h5 className="footer__title">Delivery Hours</h5>
            <ListGroup className="delivery__time-list">
              <div className="delivery__time-item">
                <span>Friday - Tuesday</span>
                <p>10:00am - 11:00pm</p>
              </div>
              <div className="delivery__time-item">
                <span>Wednesday - Thursday</span>
                <p>Off day</p>
              </div>
            </ListGroup>
          </Col>

          {/* Contact */}
          <Col lg="3" md="6" sm="6" className="mb-4">
            <h5 className="footer__title">Contact</h5>
            <ListGroup className="contact__list">
              <div className="contact__item">
                <span>Location:</span>
                <p>123 Pizza Street, Food District</p>
              </div>
              <div className="contact__item">
                <span>Phone:</span>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="contact__item">
                <span>Email:</span>
                <p>info@mypizza.com</p>
              </div>
            </ListGroup>
          </Col>

          {/* Newsletter */}
          <Col lg="3" md="6" sm="6" className="mb-4">
            <h5 className="footer__title">Newsletter</h5>
            <p>Subscribe for updates & offers</p>
            <div className="newsletter">
              <input type="email" placeholder="Enter your email" />
              <button className="btn">Subscribe</button>
            </div>
            
            {/* Social Links */}
            <div className="social__links mt-4">
              <span className="me-3"><FaFacebookF size={20} /></span>
              <span className="me-3"><FaInstagram size={20} /></span>
              <span className="me-3"><FaTwitter size={20} /></span>
            </div>
          </Col>
        </Row>
        
        {/* Copyright */}
        <Row className="mt-4">
          <Col lg="12" className="text-center">
            <p className="copyright">
              © {year} MyPizza. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;