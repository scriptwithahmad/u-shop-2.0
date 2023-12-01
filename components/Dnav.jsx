import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Dnav = () => {
  const router = useRouter();
  const [showModel, setShowModel] = useState(false);

  return (
    <>
      <div className="relative">
        <div className="flex items-center justify-between px-4 py-0">
          <div className="flex items-center gap-4">
            <i
              onClick={() => alert("Roko Zara Sabar Karo!")}
              className="fa-solid fa-bars-staggered"
            ></i>
            <div className="flex items-center">
              <Link href="/" className="flex-none">
                <img
                  src="/logo1.png"
                  width={20}
                  className="mx-auto w-[100px] mt-2"
                />
              </Link>
            </div>
          </div>
          {/* PROFILE START ============================*/}
          <>
            <div className="flex py-2 group relative items-center gap-2 pr-4">
              <img
                src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1700594680/blog-image/latest_prev_ui_btfeug.png"
                alt="image here"
                className="rounded-full h-9 w-9 object-cover cursor-pointer border border-gray-300"
              />
              <div className="leading-3">
                <p className="text-[14px] capitalize font-medium">M Ahmad</p>
                <span className="text-[11px] cursor-pointer text-red-500 hover:text-red-600">
                  Logout
                </span>
              </div>

              {/* Profile Model Here */}
              <div
                className={`shade pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 opacity-0 group-hover:top-[100%] transition-all duration-500 bg-white absolute left-0 top-[130%] overflow-hidden rounded-md h-fit min-w-[100px] z-[1000000]`}
              >
                <ul className="px-4 py-4">
                  <li className="flex flex-col gap-2">
                    <Link
                      className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2"
                      href="/"
                    >
                      <i className="fa-solid fa-user"></i> Profile
                    </Link>
                    <Link
                      className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2"
                      href="/"
                    >
                      <i className="fa-solid fa-gear"></i> Setting
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default Dnav;
