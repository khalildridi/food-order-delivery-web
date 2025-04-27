import React from "react";
import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import guyImg from "../assets/images/delivery-guy.png";
import "../styles/hero-section.css";
import "../styles/home.css";
const Home = () => {
  return (
    <>
      <Helmet title="Home" />

      {/* HERO SECTION */}
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <h5 className="mb-3">Easy order & fast delivery</h5>
                <h1 className="mb-4 hero__title">
                  <span>Enjoy your favorite Pizza</span>
                </h1>
                <p>
                  Fresh, hot, and delicious pizzas delivered to your doorsteps in minutes.
                </p>
                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <button className="order__btn d-flex align-items-center justify-content-between">
                    <Link to="/menu">See Menu</Link>
                  </button>
                </div>
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
      <section className="pt-5">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2>Why Choose Our Pizza?</h2>
            </Col>
            <Col lg="4" md="4">
              <div className="service__item text-center px-3">
                <h5 className="mb-3">Fresh Ingredients</h5>
                <p>
                  We use only the freshest and highest quality ingredients for every pizza we make.
                </p>
              </div>
            </Col>
            <Col lg="4" md="4">
              <div className="service__item text-center px-3">
                <h5 className="mb-3">Fast Delivery</h5>
                <p>
                  Lightning-fast delivery so you can enjoy your pizza while it's still hot and fresh.
                </p>
              </div>
            </Col>
            <Col lg="4" md="4">
              <div className="service__item text-center px-3">
                <h5 className="mb-3">Best Taste</h5>
                <p>
                  Our signature recipes guarantee a taste you'll come back for again and again.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* POPULAR PIZZAS SECTION */}
      <section className="pt-5">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2>Most Popular Pizzas</h2>
              <p>Discover our customers' favorites and bestsellers</p>
            </Col>
            <Col lg="4" md="4">
              <div className="pizza__item text-center">
                <div className="pizza__img mb-3">
                  <img src="pizza-placeholder.jpg" alt="Margherita" className="w-50" />
                </div>
                <h5>Margherita</h5>
                <p>Classic tomato sauce, fresh mozzarella, basil</p>
                <span className="pizza__price">$12.99</span>
                <button className="btn btn-sm btn-danger mt-3">Add to Cart</button>
              </div>
            </Col>
            <Col lg="4" md="4">
              <div className="pizza__item text-center">
                <div className="pizza__img mb-3">
                  <img src="pizza-placeholder.jpg" alt="Pepperoni" className="w-50" />
                </div>
                <h5>Pepperoni</h5>
                <p>Tomato sauce, mozzarella, pepperoni slices</p>
                <span className="pizza__price">$14.99</span>
                <button className="btn btn-sm btn-danger mt-3">Add to Cart</button>
              </div>
            </Col>
            <Col lg="4" md="4">
              <div className="pizza__item text-center">
                <div className="pizza__img mb-3">
                  <img src="pizza-placeholder.jpg" alt="Veggie Supreme" className="w-50" />
                </div>
                <h5>Veggie Supreme</h5>
                <p>Bell peppers, olives, onions, mushrooms, tomatoes</p>
                <span className="pizza__price">$13.99</span>
                <button className="btn btn-sm btn-danger mt-3">Add to Cart</button>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col lg="12" className="text-center">
              <Link to="/menu" className="btn btn-outline-danger">View Full Menu</Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="cta__section my-5 py-5 bg-danger text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg="8" md="7">
              <h3>Ready to taste the best pizza in town?</h3>
              <p>
                Place your order now and enjoy a delightful meal at home!
              </p>
            </Col>
            <Col lg="4" md="5" className="text-md-end">
              <button className="btn btn-light">
                <Link to="/checkout">Order Now</Link>
              </button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="testimonial__section py-5">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2>What Our Customers Say</h2>
            </Col>
            <Col lg="4" md="4">
              <div className="testimonial__item p-4 shadow-sm rounded">
                <p className="testimonial__text">
                  "The best pizza I've ever had! Fast delivery and always hot. I order every weekend!"
                </p>
                <div className="d-flex align-items-center gap-3 mt-3">
                  <h6 className="mb-0">John D.</h6>
                  <div className="testimonial__rating">
                    ★★★★★
                  </div>
                </div>
              </div>
            </Col>
            <Col lg="4" md="4">
              <div className="testimonial__item p-4 shadow-sm rounded">
                <p className="testimonial__text">
                  "Amazingly fresh ingredients and perfect crust. My family loves their specialty pizzas!"
                </p>
                <div className="d-flex align-items-center gap-3 mt-3">
                  <h6 className="mb-0">Maria S.</h6>
                  <div className="testimonial__rating">
                    ★★★★★
                  </div>
                </div>
              </div>
            </Col>
            <Col lg="4" md="4">
              <div className="testimonial__item p-4 shadow-sm rounded">
                <p className="testimonial__text">
                  "Great value for money and exceptional service. My go-to place for pizza every time!"
                </p>
                <div className="d-flex align-items-center gap-3 mt-3">
                  <h6 className="mb-0">Robert P.</h6>
                  <div className="testimonial__rating">
                    ★★★★★
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ABOUT US SECTION */}
      <section className="about__section py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg="6" md="6">
              <div className="about__img">
                <img src="about-placeholder.jpg" alt="Pizza making" className="w-100 rounded" />
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="about__content">
                <h2>Our Pizza Story</h2>
                <p>
                  Founded in 2010, our pizzeria has been serving authentic Italian-style pizzas made with love and tradition. 
                  Using recipes passed down through generations, we take pride in creating the perfect pizza experience for our customers.
                </p>
                <p>
                  Our dough is prepared fresh daily, and we source only the finest ingredients to ensure you get the best quality pizza 
                  every single time.
                </p>
                <Link to="/about" className="btn btn-outline-danger mt-3">Learn More About Us</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="newsletter__section py-5">
        <Container>
          <Row>
            <Col lg="8" className="mx-auto text-center">
              <h3>Subscribe for Special Offers</h3>
              <p>Join our mailing list and receive exclusive deals and promotions</p>
              <div className="newsletter__form mt-4">
                <input type="email" placeholder="Enter your email" className="form-control mb-3" />
                <button className="btn btn-danger w-100">Subscribe</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* LOCATION SECTION */}
      <section className="location__section py-5">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2>Visit Us</h2>
              <p>Find us at these convenient locations</p>
            </Col>
            <Col lg="4" md="6" className="mb-4">
              <div className="location__item text-center p-3 shadow-sm rounded">
                <h5>Downtown</h5>
                <p>123 Main Street, City Center</p>
                <p>Open: 11AM - 11PM Daily</p>
                <p>Phone: (123) 456-7890</p>
              </div>
            </Col>
            <Col lg="4" md="6" className="mb-4">
              <div className="location__item text-center p-3 shadow-sm rounded">
                <h5>Westside</h5>
                <p>456 Park Avenue, West District</p>
                <p>Open: 11AM - 10PM Daily</p>
                <p>Phone: (123) 456-7891</p>
              </div>
            </Col>
            <Col lg="4" md="6" className="mb-4">
              <div className="location__item text-center p-3 shadow-sm rounded">
                <h5>Northside</h5>
                <p>789 Oak Street, North Neighborhood</p>
                <p>Open: 11AM - 10PM Daily</p>
                <p>Phone: (123) 456-7892</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;