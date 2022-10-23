import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Brands from "./Brands";
import About from "./About";
import Portfolio from "./Portfolio";
import Skills from "./Skills";
import Services from "./Services";
import Contact from "./Contact";
import Testimonials from "./Testimonials";
import BackTopBtn from "./BackTopBtn";
import Footer from "./Footer";
const Homepage = () => {
  localStorage.setItem("roomname", " ");
  return (
    <div className="bg-white relative">
      <Header />
      <Hero />
      {/* <Testimonials /> */}
      {/* <Footer /> */}
      {/* <BackTopBtn /> */}
    </div>
  );
};

export default Homepage;
