import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Pizzas from "../pages/Pizzas";
import PizzaDetails from "../pages/PizzaDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import AboutUs from "../pages/AboutUs";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/pizzas" element={<Pizzas />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/cart" element={<Cart />} />
      <Route path='/contact' element={<Contact/>} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/pizzas/:id" element={<PizzaDetails />} />
    </Routes>
  );
};

export default Routers;
