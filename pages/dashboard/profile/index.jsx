import Link from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { SessionData } from "@/context/AuthContext";

const index = () => {
  const router = useRouter();
  const { user, setUser } = useContext(SessionData);

  return (
    <>
      <div className="bg-white relative mt-4 max-w-5xl m-auto rounded-lg">
        <Link
          href="/dashboard/profile/edit"
          className="absolute cursor-pointer top-6 right-6 border rounded-md text-gray-600 bg-gray-100  border-gray-200 hover:text-blue-600 hover:bg-gray-50 gap-1 text-sm flex items-center px-3 py-1 transition-all duration-1000"
        >
          <ion-icon name="create-outline"></ion-icon>
          Edit
        </Link>

        <div className="shade rounded-lg py-10 flex items-center flex-col justify-center">
          {user ? (
            <div>
              <div className="max-w-full m-auto">
                <div className="h-fit w-fit border-[10px] border-[#eeeeee9c] rounded-full max-w-full m-auto">
                  <img
                    className="h-60 w-60 border-[10px] object-cover border-[#c9c9c9cc] rounded-full"
                    src={user.photo}
                    alt=""
                  />
                </div>
              </div>

              {/* Full Name ----------------------------------------------- */}
              <div className="flex items-center justify-center flex-col mt-6">
                <h1 className="capitalize text-3xl mb-3 text-slate-800 font-bold">
                  {user.fullname}
                </h1>
                <h2 className="text-[#6c757d] text-xs">{user.designation}</h2>
              </div>
              {/* Inner Divs ----------------------------------------------- */}
              <div className="grid grid-cols-2 mt-6 gap-4">
                {/* Email ----------------------------------------------- */}
                <div className="px-4 py-2 flex items-center gap-4 shadow-md rounded-lg">
                  <i class="fa-solid fa-envelope text-xl text-gray-500"></i>
                  <div>
                    <p className="text-xs text-[#00000084] mb-1">Email</p>
                    <span className="text-[#444]">{user.email}</span>
                  </div>
                </div>
                {/* UserName ----------------------------------------------- */}
                <div className="px-4 py-2 flex items-center gap-2 shadow-md rounded-lg">
                  <i className="fa-solid fa-phone text-gray-500"></i>
                  <div>
                    <p className="text-xs text-[#00000084] mb-1">Phone</p>
                    <span className="text-[#444]">+92 {user.phone}</span>
                  </div>
                </div>
                {/* Gender ----------------------------------------------- */}
                <div className="px-4 py-2 flex items-center gap-3 shadow-md rounded-lg">
                  <i className="fa-solid fa-user text-gray-500"></i>
                  <div>
                    <p className="text-xs text-[#00000084] mb-1">Gender</p>
                    <span className="text-[#444]">{user.gender || "Male"}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <span className="text-red-600 text-2xl">
              Opps! Profile Not Found...
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default index;
