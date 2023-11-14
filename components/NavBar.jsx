import React, { useState } from "react";
import Link from "next/link";
import ShopingCart from "./ShopingCart";
import Search from "./Search";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <nav className={`navbar ${isOpen ? "open" : ""}`}>
        <div className="nav-left">
          <div className="logo w-24">
            <img src="/navLogo.png" alt="" />
          </div>
          <ul className={`nav-links ${isOpen ? "open" : ""}`}>
            <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/register">Register</Link>
            <Link href="/login">Login</Link>
            <button className="apllyBtn mobileResBtn">Apply Now</button>
          </ul>
        </div>
        <div className="menu-icon" onClick={toggleNavbar}>
          <div className={`bar ${isOpen ? "open" : ""}`} />
          <div className={`bar ${isOpen ? "open" : ""}`} />
          <div className={`bar ${isOpen ? "open" : ""}`} />
          <i  onClick={() => setShowSearch(true)} class="absolute top-[40%] left-[76%] fa-solid fa-magnifying-glass"></i>
          <i class="absolute top-[40%] left-[79%] fa-regular fa-heart"></i>
          <i
            onClick={() => setShowCart(true)}
            class="absolute top-[40%] left-[82%] fa-solid fa-cart-shopping"
          ></i>
          <button className="apllyBtn">Apply Now</button>
        </div>
        <div className={`slider ${isOpen ? "open" : ""}`} />
      </nav>
      {showCart && <ShopingCart setShowCart={setShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
  );
};

export default Navbar;
