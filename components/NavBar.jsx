import React, { useContext, useState } from "react";
import Link from "next/link";
import Search from "./Search";
import { CartContext } from "@/context/CartProvider";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const { cartItems } = useContext(CartContext);
  const NoOfCartItems = cartItems.length;

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
            <Link href="/categories">Category</Link>
            <Link href="/register">Register</Link>
            <Link href="/createproduct">Create Page</Link>
            <button className="apllyBtn mobileResBtn">Apply Now</button>
          </ul>
        </div>
        <div className="menu-icon" onClick={toggleNavbar}>
          <div className={`bar ${isOpen ? "open" : ""}`} />
          <div className={`bar ${isOpen ? "open" : ""}`} />
          <div className={`bar ${isOpen ? "open" : ""}`} />
          <i
            onClick={() => setShowSearch(true)}
            className="absolute top-[40%] left-[73%] hover:text-blue-600 transition duration-150 fa-solid fa-magnifying-glass"
          ></i>
          <i className="absolute top-[40%] left-[76%] hover:text-blue-600 transition duration-150 fa-regular fa-heart"></i>
          <Link href="/login" title="Login">
            <i className="absolute top-[40%] left-[79%] hover:text-blue-600 transition duration-150 fa-solid fa-arrow-right-to-bracket"></i>
          </Link>
          <Link href={"/cart"}>
            <i className="absolute top-[40%] left-[82%] hover:text-blue-600 transition duration-150 fa-solid fa-cart-shopping">
              <span className="bg-sky-300 text-slate-950 absolute -top-2 left-2 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {NoOfCartItems}
              </span>
            </i>
          </Link>
        </div>
        <div className={`slider ${isOpen ? "open" : ""}`} />
      </nav>
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
  );
};

export default Navbar;
