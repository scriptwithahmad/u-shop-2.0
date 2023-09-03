import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

var navLinks = [
  { href: "/portal", lable: "Dashboard", icon: "bx bxs-dashboard" },
  { href: "/portal/competitions", lable: "Competitions", icon: "bx bx-trophy" },
  { href: "/portal/register-list", lable: "Enquiries", icon: "bx bx-notepad" },
  {
    href: "/portal/participants",
    lable: "Participants",
    icon: "bx bxs-user-detail",
  },
  { href: "/portal/teams-list", lable: "Teams", icon: "bx bx-group" },
];

const Aside = () => {
  const router = useRouter();
  return (
    <aside className={`bg-white space-y-8 hover:bg-gray-50`}>
      <div className="flex flex-col h-full border-[1px] border-gray-100">
        <div className="h-20 flex items-center px-8">
          <Link href="/" className="flex-none">
            <img src="/images/logo.png" width={55} className="mx-auto" />
          </Link>
        </div>
        <div className="flex-1 flex flex-col h-full">
          <ul className="px-4 text-sm font-medium flex-1">
            {navLinks.map((v, i) => {
              return (
                <li key={i}>
                  <Link
                    href={v.href}
                    className={`relative flex items-center gap-x-2 text-gray-600 p-2 mb-3 rounded-lg hover:bg-gray-200 group cursor-pointer ${
                      router.pathname === v.href
                        ? "bg-[#7078d330] group cursor-pointer"
                        : ""
                    }`}
                  >
                    <i
                      className={`${v.icon} text-lg ${
                        router.pathname === v.href
                          ? "text-[#004bad]"
                          : "text-gray-500"
                      }`}
                    ></i>
                    <div
                      className={` ${
                        router.pathname === v.href
                          ? "text-[#004bad]"
                          : "text-gray-500"
                      }`}
                    >
                      {v.lable}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
