import Search from "./Search";
import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { CartContext } from "@/context/CartProvider";
import OutsideClickHandler from "react-outside-click-handler";

const navLinks = [
  { text: "Home", route: "/" },
  { text: "About", route: "/about" },
  { text: "Category", route: "/categories" },
  { text: "Register", route: "/register" },
  { text: "Login", route: "/login" },
];

const Nav = () => {
  const router = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [mobNavPosstion, setMobNavPosstion] = useState(false);

  const { cartItems } = useContext(CartContext);
  const NoOfCartItems = cartItems.length;

  return (
    <>
      <div className="bg-white drop-shadow-lg py-3 sticky top-0 backdrop-blur-3xl mb-2">
        <nav className="flex items-center justify-between max-w-[1200px] m-auto px-4 lg:px-0">
          <div className=" w-24 h-auto">
            <Link href="/">
              <picture>
                <Image
                  priority
                  width={700}
                  height={200}
                  alt="Logo Here"
                  src="/navLogo.png"
                  className="w-full h-full object-contain"
                />
              </picture>
            </Link>
          </div>

          <div>
            <ul className="flex gap-5 items-center">
              {navLinks.map((links) => (
                <li
                  key={links.route}
                  className="text-[#777] font-light hover:text-slate-700 transition duration-200 hidden lg:block"
                >
                  <Link
                    href={links.route}
                    className={
                      router === links.route
                        ? "relative before:absolute before:-bottom-1 font-medium text-orange-500"
                        : ""
                    }
                  >
                    {links.text}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Navbar Toggle Button ===================== */}
            <OutsideClickHandler
              onOutsideClick={() => {
                setMobNavPosstion(false);
              }}
            >
              <div
                onClick={() => setMobNavPosstion(!mobNavPosstion)}
                className="lg:hidden visible"
              >
                <div className="grid grid-cols-1 items-center gap-3 relative cursor-pointer">
                  <span
                    className="w-6 border border-gray-400 absolute mt-0 transition-all duration-300 ease-in-out"
                    style={{
                      rotate: `${mobNavPosstion === false ? 0 : 40}deg`,
                      top: `${mobNavPosstion === false ? 3 : 10}px`,
                    }}
                  ></span>
                  <span
                    className="w-6 border border-gray-400 mt-5"
                    style={{ opacity: `${mobNavPosstion === false ? 1 : 0}` }}
                  ></span>
                  <span
                    className="w-6 border border-gray-400 mt-0 absolute top-3 transition-all duration-300 ease-in-out"
                    style={{
                      rotate: `${mobNavPosstion === false ? 0 : -40}deg`,
                    }}
                  ></span>
                </div>
              </div>
            </OutsideClickHandler>
            {/* Navbar Toggle Button ===================== */}
          </div>
          <div className=" lg:flex gap-4 items-center text-gray-60 hidden">
            <i
              onClick={() => setShowSearch(true)}
              className=" fa-solid fa-magnifying-glass cursor-pointer text-gray-600 hover:text-orange-500"
            ></i>
            <Link href={"/login"}>
              <i className=" fa-solid fa-arrow-right-to-bracket cursor-pointer text-gray-600 hover:text-orange-500"></i>
            </Link>
            <Link href={"/cart"}>
              <i className=" fa-solid fa-cart-shopping relative cursor-pointer text-gray-600 hover:text-orange-500">
                <span className="bg-sky-300 text-slate-950 absolute -top-2 left-2 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {NoOfCartItems}
                </span>
              </i>
            </Link>
          </div>
        </nav>
      </div>

      {showSearch && <Search setShowSearch={setShowSearch} />}

      <div 
      style={{
        transition: ".3s",
        left: `${mobNavPosstion === true ? 0 : -100}%`,
      }}
      className="absolute top-0 z-50 border-4 backdrop-blur-sm bg-[#00000066] h-screen w-full overflow-hidden">
        <nav
          style={{
            transition: ".8s",
            left: `${mobNavPosstion === true ? 0 : -100}%`,
          }}
          className="navGlass h-full w-1/2 fixed p-4"
        >
          <div className="flex items-center justify-between">
            <div className="w-[140px]">
              <Link href="/">
                <Image
                  width={700}
                  height={700}
                  alt="Logo Here"
                  src="/navLogo.png"
                  data-src="images/logo1.webp"
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </Link>
            </div>
            <i
              onClick={() => setMobNavPosstion(false)}
              className="bx bx-x text-xl p-1 text-slate-300 hover:text-slate-400 cursor-pointer rounded-full object-cover grid place-content-center "
            ></i>
          </div>
          <ul className="grid gap-4 mt-10">
            {navLinks.map((v, i) => (
              <li key={i} className="text-slate-500 hover:text-slate-600">
                <Link href={v.route}>{v.text}</Link>
              </li>
            ))}

            <li className="text-slate-500 mt-10 hover:text-slate-600">
              <Link
                className="text-slate-400 border border-gray-300 px-5 py-2 rounded-full flex items-center gap-1 w-fit"
                href="/categories"
              >
                Explore
                <i className="bx bx-right-arrow-alt"></i>
                <i className="fa-solid fa-angle-right animate-pulse"></i>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Nav;
