import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer mt-6">
        <div className="footer-col-1">
          <img src="https://static.priceoye.pk/images/logo.svg" alt="" />
          <ul>
            <li>
              <a href="/">About Us</a>
            </li>
            <li>
              <a href="/">FAQs</a>
            </li>
            <li>
              <a href="/">Contact Us</a>
            </li>
            <li>
              <a href="/">Careers</a>
            </li>
            <li>
              <a href="/">Press & Blog</a>
            </li>
            <li>
              <a href="/">Terms & Condition</a>
            </li>
          </ul>
        </div>
        <div className="footer-col-2">
          <h1>Customer Service</h1>
          <div className="linkDiv">
            <a href="/">Help Center</a>
            <a href="/">Privacy</a>
            <a href="/">Insitallments Plan</a>
            <a href="/">E-Warranty Activation</a>
          </div>
        </div>
        <div className="footer-col-3">
          <h1>Secure payments Methods</h1>
          <img
            className="img1"
            src="https://static.priceoye.pk/images/payment_method.svg"
            alt=""
          />
          <img
            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            alt=""
          />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
