import Search from "./Search";
import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { CartContext } from "@/context/CartProvider";
import OutsideClickHandler from "react-outside-click-handler";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const navLinks = [
  { text: "Home", route: "/" },
  { text: "About", route: "/about" },
  { text: "Store", route: "/categories" },
  { text: "Register", route: "/register" },
  { text: "Login", route: "/login" },
];

const Nav = () => {
  const router = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [mobNavPosstion, setMobNavPosstion] = useState(false);

  const { cartItems } = useContext(CartContext);
  const NoOfCartItems = cartItems.length;

  const { user, refetch } = useContext(AuthContext);

  // Logout Function ------------------------/
  const handleLogout = async () => {
    try {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (!confirmLogout) return;
      const res = await axios.post("/api/auth/logout");
      if (res.data.success) {
        toast.success("User Logout Successfully!");
        window.location.reload();
        refetch();
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      {/* ===================== Navbar For Desktop ==========================================  */}
      <div className="bg-white z-50 drop-shadow-lg py-3 sticky top-0 backdrop-blur-3xl">
        <nav className="flex items-center justify-between max-w-[1200px] m-auto px-4 lg:px-0">
          {/* ===================== Navbar Image Here ==========================================  */}
          <div className=" w-24 h-auto">
            <Link href="/">
              <picture>
                <Image
                  priority
                  width={500}
                  height={500}
                  alt="Logo Here"
                  src="/ulogo.png"
                  className="w-full h-full object-contain"
                />
              </picture>
            </Link>
          </div>

          {/* ===================== Navbar Links Here ==========================================  */}
          <div>
            <ul className="flex gap-5 items-center">
              {navLinks.map(
                (links, i) =>
                  !(
                    user &&
                    (links.route === "/register" || links.route === "/login")
                  ) && (
                    <li
                      key={links.route}
                      className="text-[#777] relative z-20 font-light hover:text-slate-700 transition duration-200 hidden lg:block"
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
                  )
              )}
            </ul>

            {/* ===================== Navbar Toggle Button ==========================================  */}
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
                      rotate: `${mobNavPosstion === false ? 0 : 44}deg`,
                      top: `${mobNavPosstion === false ? 3 : 12}px`,
                    }}
                  ></span>
                  <span
                    className="w-6 border border-gray-400 mt-5"
                    style={{ opacity: `${mobNavPosstion === false ? 1 : 0}` }}
                  ></span>
                  <span
                    className="w-6 border border-gray-400 mt-0 absolute top-3 transition-all duration-300 ease-in-out"
                    style={{
                      rotate: `${mobNavPosstion === false ? 0 : -44}deg`,
                    }}
                  ></span>
                </div>
              </div>
            </OutsideClickHandler>
            {/* ===================== Navbar Toggle Button Ends ==========================================  */}
          </div>

          {/* ===================== Navbar Icons and User Auth ==========================================  */}
          <div className=" lg:flex gap-4 items-center text-gray-60 hidden">
            <i
              onClick={() => setShowSearch(true)}
              className=" fa-solid fa-magnifying-glass cursor-pointer text-gray-600 hover:text-orange-500"
            ></i>
            <Link href={"/cart"}>
              <i className=" fa-solid fa-cart-shopping relative cursor-pointer text-gray-600 hover:text-orange-500">
                {NoOfCartItems <= 0 ? null : (
                  <span className="bg-sky-300 text-[#344352] absolute -top-2 left-2 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {NoOfCartItems}
                  </span>
                )}
              </i>
            </Link>
            {user ? (
              <div className="border-l pl-2 border-gray-100 flex group relative items-center gap-2 pr-4">
                <img
                  src={user.photo || "/user.jpeg"}
                  alt="image here"
                  className="rounded-full h-9 w-9 object-cover cursor-pointer border border-gray-300"
                />
                <div className="leading-3">
                  <p className="text-[14px] capitalize font-medium">
                    {user.fullname}
                  </p>
                  <span className="text-[11px] cursor-pointer text-red-500 hover:text-red-600">
                    {user.role}
                  </span>
                </div>

                {/* Profile Model Here --------------------- */}
                <div
                  className={`shade pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 opacity-0 group-hover:top-[100%] transition-all duration-500 bg-white absolute -left-4 top-[130%] overflow-hidden rounded-md h-fit min-w-[100px] z-[1000000]`}
                >
                  <ul className="px-4 py-5">
                    <li className="flex flex-col gap-2">
                      {user?.role == "admin" ? (
                        <Link
                          className="text-xs text-gray-600 hover:text-orange-600 flex items-center gap-2"
                          href="/dashboard"
                        >
                          <i className="fa-solid fa-chart-simple"></i> Dashboard
                        </Link>
                      ) : (
                        <Link
                          className="text-xs text-gray-600 hover:text-orange-600 flex items-center gap-2"
                          href="/dashboard/user-portal"
                        >
                          <i className="fa-solid fa-chart-simple"></i> Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="text-xs text-gray-600 hover:text-red-600 flex items-center gap-2"
                      >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </nav>
      </div>

      {showSearch && <Search setShowSearch={setShowSearch} />}

      {/* ===================== Navbar Responive ==========================================  */}
      <div
        style={{
          transition: ".3s",
          left: `${mobNavPosstion === true ? 0 : -100}%`,
        }}
        className="absolute top-0 z-50 bg-[#00000028] h-screen w-full overflow-hidden"
      >
        <nav
          style={{
            transition: ".8s",
            left: `${mobNavPosstion === true ? 0 : -100}%`,
          }}
          className="navGlass border h-full w-1/2 fixed p-4"
        >
          <div className="flex items-center justify-between">
            <div className="w-[140px]">
              <Link href="/">
                <Image
                  width={700}
                  height={700}
                  alt="Logo Here"
                  src="/ulogo.png"
                  data-src="images/logo1.webp"
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>
            <i
              onClick={() => setMobNavPosstion(false)}
              className="bx bx-x text-xl p-1 text-slate-300 hover:text-slate-400 cursor-pointer rounded-full object-cover grid place-content-center "
            ></i>
          </div>
          <ul className="grid gap-4 mt-10">
            {navLinks.map(
              (v, i) =>
                !(
                  user &&
                  (v.route === "/register" || v.route === "/login")
                ) && (
                  <li key={i} className="text-slate-500 hover:text-slate-600">
                    <Link href={v.route}>{v.text}</Link>
                  </li>
                )
            )}

            <li className="text-slate-500 mt-2 hover:text-slate-600">
              <Link
                href="/categories"
                className="bg-slate-600 text-white hover:bg-indigo-500 px-5 py-2 rounded-lg flex items-center gap-1 w-fit transition-all duration-150"
              >
                Explore
                <i className="bx bx-right-arrow-alt"></i>
                <i className="fa-solid fa-angle-right asideAnimate"></i>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Nav;
