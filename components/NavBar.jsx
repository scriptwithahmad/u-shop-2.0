import React, { useEffect, useState } from "react";

const Header = () => {
  useEffect(() => {
    const nav = document.querySelector(".navModal");
    const menuBtn = document.querySelector("#menu-btn");
    const hideBtn = document.querySelector("#hideBtn");
    const overlay = document.querySelector(".overlay");

    menuBtn.addEventListener("click", () => {
      nav.style.left = "0%";

      overlay.style.width = "100%";
      overlay.style.filter = "grayscale(100%)";
    });
    hideBtn.addEventListener("click", () => {
      nav.style.left = "-70%";
      overlay.style.left = "0%";
      overlay.style.width = "0%";
    });

    function myFunctin() {
      nav.scroll;
    }
  }, []);

  return (
    <>
      <header className="NavHeader">
        <marquee>
          Deliveries in Islamabad might get affected due to law & order
          situation.
        </marquee>
      </header>
      <nav className="myNav">
        <div className="logo">
          <i id="menu-btn" className="fa-solid fa-bars-staggered"></i>
          <img src="https://static.priceoye.pk/images/logo.svg" alt="" />
        </div>
        <div className="inputDiv">
          <input type="search" id="searc-input" placeholder="Search..." />
          <i className="fa-solid fa-microphone"></i>
        </div>
        <div className="nav-btns">
          <button className="login-btn">Log in</button>
          <button>Register</button>
        </div>
      </nav>
      {/* ---------------- Responsive Model ------------------- */}
      <div className="overlay"></div>
      <div className="navModal">
        <div className="modal-head">
          <i id="hideBtn" className="fa-solid fa-xmark"></i>
          <h1>PriceOye</h1>
          <button>Login</button>
        </div>

        <div className="categoriesInNavBar">
          <h2>Categories</h2>

          <div className="category">
            <label htmlFor="cate">Mobiles</label>
            <input id="cate" name="cate" type="checkbox" />
            <div className="cateList">
              <ul>
                <li>
                  <a href="/">Vivo</a>
                </li>
                <li>
                  <a href="/">Sumsung</a>
                </li>
                <li>
                  <a href="/">IPhone</a>
                </li>
                <li>
                  <a href="/">Infnix</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="shopByPriceBtn byPriceInNav">
          <button className="myBtn">Below Rs. 10,000</button>
          <button className="myBtn">Rs. 10,000 - Rs 20,000</button>
          <button className="myBtn">Rs. 20,000 - Rs 30,000</button>
          <button className="myBtn">Rs. 30,000 - Rs 40,000</button>
          <button className="myBtn">Rs. 40,000 - Rs 50,000</button>
          <button className="myBtn">Rs. 50,000 - Rs 70,000</button>
          <button className="myBtn">Rs. 70,000 - Rs 90,000</button>
          <button className="myBtn">Above Rs.90,000</button>
        </div>
      </div>

      {/* ---------------- Responsive Model ------------------- */}
      <div className="category">
        <div className="sub-category">
          <img
            src="https://static.priceoye.pk/images/placeholder-brand.jpg"
            alt=""
          />
          <p>Mobiles</p>
        </div>
        <div className="sub-category">
          <img
            src="https://static.priceoye.pk/images/placeholder-brand.jpg"
            alt=""
          />
          <p>Smart Watches</p>
        </div>
        <div className="sub-category">
          <img
            src="https://static.priceoye.pk/images/home/wireless-earbuds.svg"
            alt=""
          />
          <p>Wireless Earbuds</p>
        </div>
        <div className="sub-category">
          <img
            src="https://static.priceoye.pk/images/placeholder-brand.jpg"
            alt=""
          />
          <p>Bluetooth Speakers</p>
        </div>
        <div className="sub-category">
          <img
            src="https://static.priceoye.pk/images/placeholder-brand.jpg"
            alt=""
          />
          <p>Power Banks</p>
        </div>
        <div className="sub-category">
          <img
            src="https://static.priceoye.pk/images/placeholder-brand.jpg"
            alt=""
          />
          <p>Laptops</p>
        </div>
        <div className="sub-category">
          <img
            src="https://static.priceoye.pk/images/placeholder-brand.jpg"
            alt=""
          />
          <p>Tablets</p>
        </div>
      </div>
    </>
  );
};

export default Header;
