import NavBar from "./NavBar";
import Dnav from "./Dnav";
import Aside from "./Aside";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Layout({ children }) {
  const { pathname, back } = useRouter();
  var privateRoutes = pathname.startsWith("/dashboard");

  return (
    <>
      <div>
        {privateRoutes ? (
          <div className="max-h-screen flex flex-col h-screen bg-[#ffffff] overflow-hidden">
            <div className="w-full">
              <Dnav />
            </div>
            <div className="flex flex-1">
              <Aside />
              <div className="overflow-y-auto max-h-[90vh] max-w-[100vw] overflow-x-auto flex-1 bg-[#eee] rounded-2xl shadow-[inset_0px_0px_10px_rgba(56,56,56,0.2)] p-4">
                {children}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <NavBar />
            {children}
          </div>
        )}
      </div>
    </>
  );
}
