import axios from "axios";
import Link from "next/link";
import queryStr from "query-string";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";

const tableHeader = [
  { lable: "Name", align: "left" },
  { lable: "Username", align: "left" },
  { lable: "Email", align: "left" },
  { lable: "Phone No", align: "left" },
  { lable: "Role", align: "left" },
  { lable: "Actions", align: "center" },
];

const index = ({ users: initialProducts, start, end, total, page }) => {
  const router = useRouter();
  var pageCount = parseInt(page);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [fuser, setFuser] = useState(initialProducts);
  const [filterByName, setFilterByName] = useState({ fullname: "" });

  // Input Hadler For Searching by Name ------------------------------------------/
  const searchInputHanler = (e) => {
    setFilterByName({ ...filterByName, [e.target.name]: e.target.value });
  };

  // delete User by ID ------------------------------------------------------/
  const deleteUser = async (id) => {
    try {
      if (window.confirm("Do you wnat to Delete this Productssss") === true) {
        const res = await fetch(`/api/users/${id}`, {
          method: "DELETE",
        });
        if (
          toast.success("User Deleted Successfully!", {
            duration: 2000,
          })
        ) {
          // router.push("/dashboard");
          window.location.reload();
        } else {
          toast.error("Something went Wrong");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  // Fetch Data Basis Filter by Name Function ------------------------------------/
  const fetchUserData = async () => {
    try {
      setLoading(true);

      const queryString = queryStr.stringify({
        name: filterByName.fullname,
        page: pageCount,
      });

      const { data } = await axios.get(`/api/users?${queryString}`);
      setFuser(data.message.users);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter Data On Filteration --------------------------------------------------/
  useEffect(() => {
    if (pageCount === page) {
      setFuser(initialProducts);
    } else {
      fetchUserData();
    }
  }, [filterByName.name, pageCount]);

  // Modal States ------------------------------------------------------------------/
  const [showModal, setShowModal] = useState(false);
  const [modeladata, setModeldata] = useState("");

  // Modal here -------------------------------------------------------------------/
  const openModal = (v) => {
    setModeldata(v);
    setShowModal(true);
  };

  // ADD NEW USER MODAL FUNCTIONS START HERE =============================================
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    role: "admin",
  });

  const routehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = await axios.post("/api/auth/register", formData);
      if(user.data.success) {
        toast.success("User Register Successfully!");
        setFormData({
          fullname: "",
          username: "",
          password: "",
          email: "",
          phone: "",
        })
        setShowForm(false)
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      {/* TABLE STARTED ---------------------------------------------------------- */}
      <div className="w-full">
        <div className="overflow-x-auto w-full border rounded-2xl">
          <div className="bg-white p-4 flex justify-between items-center flex-col gap-3 lg:flex-row">
            <h2 className="text-xl font-semibold">
              All <span className="text-indigo-600">Products</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="">
                  <input
                    type="search"
                    name="fullname"
                    value={filterByName.fullname}
                    onChange={searchInputHanler}
                    placeholder="Search here..."
                    className="relative border border-gray-200 text-gray-400 text-sm pl-3 px-2 py-[6px] lg:w-[12vw] w-[25vw] rounded-full focus:ring-2 transition-colors focus:outline-none focus:text-gray-400"
                  />
                  <span>
                    {loading ? (
                      <i className="fa-solid fa-spinner absolute top-[30%] right-3 text-xs text-gray-500 dashboardSearchSlide"></i>
                    ) : null}{" "}
                  </span>
                </div>
                <i
                  title="Add Product"
                  className="absolute top-1/2 -translate-y-1/2 right-3 border-l pl-2 cursor-pointer text-gray-400 hover:text-gray-500 bx bx-search-alt-2"
                ></i>
              </div>
              <div>
                <i
                  onClick={() => setShowForm(true)}
                  className="fa-solid fa-plus rounded-full h-8 w-8 flex items-center justify-center bg-blue-500 text-white transition-all duration-150 cursor-pointer text-sm"
                ></i>
              </div>
            </div>
          </div>
          <table className="text-sm min-w-[1000px] w-full text-left text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50">
              <tr>
                {tableHeader.map((value, index) => {
                  return (
                    <th
                      scope="col"
                      key={index}
                      className={`px-6 py-3 text-${value.align}`}
                    >
                      {value.lable}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {fuser?.map((v, i) => {
                return (
                  <tr key={i} className="bg-white border-b border-gray-100">
                    <td
                      scope="row"
                      className="px-6 flex border-0 items-center py-2 font-medium text-gray-600 whitespace-nowrap"
                    >
                      <div className="w-10 h-10 mr-3 border border-gray-100 rounded-full overflow-hidden">
                        <img
                          className="w-full h-full object-contain"
                          src={v.photo || "/user.jpeg"}
                          alt="Image Here"
                        />
                      </div>
                      {v.fullname}
                    </td>
                    <td className="px-6 py-2"> {v.username} </td>
                    <td className="px-6 py-2"> {v.email} </td>
                    <td className="px-6 py-2"> {v.phone} </td>
                    <td className="px-6 py-2">
                      <span
                        className={`px-3 rounded-full font-light ${
                          v.role == "admin"
                            ? "bg-purple-50 text-purple-400"
                            : "bg-pink-50 text-pink-400"
                        }`}
                      >
                        {v.role == "admin" ? "Admin" : "User"}
                      </span>{" "}
                    </td>
                    <td className="px-6 py-2 text-lg text-center">
                      <button>
                        <i
                          title="View Deatail"
                          onClick={() => openModal(v)}
                          className="fa fa-solid fa-eye px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-400 text-sm"
                        ></i>
                      </button>
                      <i
                        title="Delete"
                        onClick={() => deleteUser(v._id)}
                        className="fa fa-solid fa-trash px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-red-400 text-sm"
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className=" flex items-center justify-end pr-14 gap-5 w-full py-5 border-b border-gray-100 bg-gray-50">
            <span className=" whitespace-nowrap flex items-center justify-center text-sm text-slate-500">
              {pageCount} to {end} of {total}
            </span>
            <div className="flex border gap-4 px-4 py-1 rounded-full">
              <i
                onClick={() =>
                  router.push(`/dashboard/users?page=${pageCount - 1}`)
                }
                className={`fa-solid fa-angle-left p-1 text-orange-600 text-xs border-r pr-4 ${
                  start == 1
                    ? "cursor-not-allowed text-slate-300"
                    : "cursor-pointer hover:text-orange-500"
                }`}
              ></i>

              <i
                onClick={() => {
                  if (end < total) {
                    router.push(`/dashboard/users?page=${pageCount + 1}`);
                  }
                }}
                className={`fa-solid fa-angle-right text-orange-600 text-xs p-1 ${
                  end >= total
                    ? "cursor-not-allowed text-slate-300"
                    : "cursor-pointer hover:text-orange-500"
                }`}
              ></i>
            </div>
          </div>
        </div>
      </div>
      {/* User Details Modal Here  ------------------------------------------------------- */}
      <div
        style={{
          visibility: showModal ? "visible" : "hidden",
          opacity: showModal ? "1" : "0",
          transition: ".4s",
        }}
        className="fixed z-10 top-0 left-0 w-full h-screen border-red-600 backdrop-blur-[2px] bg-[#00000094] overflow-auto"
      >
        <div
          className={`${
            showModal ? "scale-100 opacity-100" : "scale-0 opacity-0"
          } bg-transparent duration-500 mx-auto my-8 relative p-4 max-w-xl lg:max-w-2xl rounded-lg lg:px-0 px-4`}
        >
          <span onClick={() => setShowModal(false)} className="cursor-pointer">
            <i className="fa-solid fa-x bxShadow absolute top-10 right-2 h-8 w-8 flex items-center justify-center text-slate-400 hover:text-gray-500 z-20 cursor-pointer"></i>
          </span>
          <div className="mt-3 grid grid-cols-2 items-center justify-center gap-2 rounded-lg bg-white backdrop-blur-sm">
            <div className="w-full h-[420px]">
              <img
                alt="photo alt"
                src={modeladata.photo || "/user.jpeg"}
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>
            <div className="p-2 bg-transparent rounded-r-lg">
              <h1 className="text-[#1553A1] font-bold mb-4 text-3xl">
                {modeladata.fullname}
              </h1>
              <div className="mt-2 text-left">
                <div className="mb-4 grid col-span-2 items-center w-full">
                  <span className="mb-1 text-[#222222ab] font-medium text-xs">
                    User Name
                  </span>
                  <span className="text-[#444] text-sm font-semibold">
                    {modeladata.username}
                  </span>
                </div>

                <div className="mb-4 grid col-span-2 items-center w-full">
                  <span className="mb-1 text-[#222222ab] font-medium text-xs">
                    Email
                  </span>
                  <span className="text-[#444] text-sm font-semibold">
                    {modeladata.email}
                  </span>
                </div>

                <div className="mb-4 grid col-span-2 items-center w-full">
                  <span className="mb-1 text-[#222222ab] font-medium text-xs">
                    phone
                  </span>
                  <span className="text-[#444] text-sm font-semibold">
                    {modeladata.phone}
                  </span>
                </div>

                <div className="mb-4 grid col-span-2 items-center w-full">
                  <span className="mb-1 text-[#222222ab] font-medium text-xs">
                    User Role
                  </span>
                  <span className="text-[#444] text-sm font-semibold">
                    {modeladata.role}
                  </span>
                </div>

                {/* <div className="mb-4 grid col-span-2 items-center w-full">
                  <span className="mb-1 text-[#222222ab] font-medium text-xs">
                    Address
                  </span>
                  <span className="text-[#444] text-sm font-semibold">
                    {modeladata.address}
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal Here ----------------------------------------------------  */}
      <div
        style={{
          visibility: showForm ? "visible" : "hidden",
          opacity: showForm ? "1" : "0",
          transition: ".4s",
        }}
        className="fixed z-10 top-0 left-0 w-full h-screen backdrop-blur-[2px] bg-[#00000094] overflow-auto"
      >
        <div
          className={`${
            showForm ? "scale-100 opacity-100" : "scale-0 opacity-0"
          } bg-white duration-500 sm:mx-auto mx-3 my-8 relative max-w-xl lg:max-w-4xl rounded-lg overflow-hidden`}
        >
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <h2 className=" text-slate-500 font-semibold text-xl">
              Add New User
            </h2>
            <i
              onClick={() => setShowForm(false)}
              class="fa-solid fa-xmark  bg-gray-100 cursor-pointer text-gray-400 p-1 text-lg rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-200"
            ></i>
          </div>
          {/* -------------------------- UPLOAD NEW User HERE -------------------------------------- */}
          <form className="space-y-6 p-4" onSubmit={submitForm}>
            {/* Full name  ----------------*/}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm leading-6 text-gray-500"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="fullName"
                  name="fullname"
                  onChange={routehandler}
                  value={formData.fullname}
                  autoComplete="fullName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Username  ----------------*/}
            <div>
              <label
                htmlFor="username"
                className="block text-sm leading-6 text-gray-500"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  onChange={routehandler}
                  autoComplete="username"
                  value={formData.username}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Phone  ----------------*/}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm leading-6 text-gray-500"
              >
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  onChange={routehandler}
                  autoComplete="phone"
                  value={formData.phone}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Email ----------------*/}
            <div>
              <label
                htmlFor="email"
                className="block text-sm leading-6 text-gray-500"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={routehandler}
                  value={formData.email}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Password ----------------*/}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm leading-6 text-gray-500"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="block text-sm leading-6 text-gray-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={routehandler}
                  value={formData.password}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* button ----------------*/}
            <div>
              <button
                type="submit"
                className="rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
              >
                {loading ? "Processing..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default index;

// Fetch All Product Data Api ----------------------------------------------------------------------------/
export async function getServerSideProps(props) {
  const queryString = queryStr.stringify(props.query);
  const res = await fetch(
    // `https://u-store.vercel.app//api/users?${queryString}`
    `http://localhost:3000/api/users?${queryString}`
  );
  const data = await res.json();

  return {
    props: {
      users: data.message.users,
      start: data.message.starting,
      end: data.message.ending,
      total: data.message.totalUser,
      page: data?.message?.page,
    },
  };
}
