import axios from "axios";
import Link from "next/link";
import queryStr from "query-string";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Toaster, toast } from "react-hot-toast";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { format, render, cancel, register } from "timeago.js";

const tableHeader = [
  { lable: "Date", align: "left" },
  { lable: "Product Detail", align: "left" },
  { lable: "Costomer Name", align: "left" },
  { lable: "Address", align: "left" },
  { lable: "Price", align: "left" },
  { lable: "Product Status", align: "left" },
  { lable: "Actions", align: "center" },
];

const productStatus = [
  { name: "Pending" },
  { name: "Confirmed" },
  { name: "Shipped" },
  { name: "Delivered" },
  { name: "Cancelled" },
];
const paymentStatus = [{ name: "Pending" }, { name: "Confirmed" }];

const index = () => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  var hasUserID = user?._id;

  const [filterByName, setFilterByName] = useState({ name: "" });

  const {
    data: productData,
    isLoading,
    isError,
    refetch,
  } = useQuery(["products", filterByName], async () => {
    try {
      const queryString = queryStr.stringify(filterByName);
      const res = await axios.get(`/api/orders?${queryString}`);
      return res.data.message;
    } catch (error) {
      throw new Error(error.message);
    }
  });

  // Login User Address And Other Details -------------
  const [loginUserData, setLoginUserData] = useState("");

  // Fetch Login User Address And Other Details --------
  const fetchUser = async () => {
    var res = await axios.get(`/api/auth/profile?id=${hasUserID}`);
    setLoginUserData(res.data.message);
  };

  // Call the Fetch Login User data Function ------------
  useEffect(() => {
    fetchUser();
  }, []);

  // Input Hadler For Searching by Name ------------------------------------------/
  const searchInputHanler = (e) => {
    setFilterByName({ ...filterByName, [e.target.name]: e.target.value });
  };

  // Fetch Data Basis Filter by Name Function ------------------------------------/
  const fetchProductData = async () => {
    try {
      setLoading(true);
      await refetch();
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter Data On Filteration --------------------------------------------------/
  useEffect(() => {
    fetchProductData();
  }, [filterByName]);

  // delete Order by ID ------------------------------------------------------/

  // Delete particular Order ------------------------------------------------------/
  const delPost = async (id) => {
    try {
      if (window.confirm("Do you want to Delete this Product") === true) {
        const res = await fetch(`/api/orders/${id}`, {
          method: "DELETE",
        });
        if (
          toast.success("Product Deleted Successfully!", {
            duration: 2000,
          })
        ) {
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

  // Open Model ------------------------------------------------------------------/
  const [showModal, setShowModal] = useState(false);
  const [modeladata, setModeldata] = useState("");

  const openModal = (v) => {
    setModeldata(v);
    setShowModal(true);
  };

  const [updateShowModal, setUpdateShowModal] = useState(false);
  const [updateModeladata, setUpdateModeladata] = useState("");
  // Update status
  const openUpdateModal = (v) => {
    setUpdateModeladata(v);
    setUpdateShowModal(true);
  };

  // Form all fucntion ------------------------------------------/

  const [formData, setFormData] = useState({
    status: "",
    message: "",
  });

  // Update status remarks change handler ---------------------------------/
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const Id = updateModeladata._id;
      var res = await axios.put(`/api/orders/${Id}`, {
        ...formData,
      });

      toast.success(res.data.message);
      
      if (res.data.success) {
        setUpdateModeladata(false);
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      {/* TABLE STARTED ---------------------------------------------------------------------------  */}
      <div className="w-full p-3">
        <div className="overflow-x-auto w-full border rounded-2xl">
          <div className="bg-white p-4 flex justify-between items-center flex-col gap-3 lg:flex-row w-full">
            <h2 className="text-xl font-semibold">
              All <span className="text-indigo-600">Orders</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="">
                  <input
                    name="name"
                    value={filterByName.name}
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
          <table className="text-sm min-w-[1100px] w-full text-left text-gray-500">
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
              {productData?.map((v, i) => {
                return (
                  <tr key={i} className="hover:bg-slate-100 border-b border-gray-100 bg-white">
                    <td className="px-6 py-2 text-[10px]">
                      {format(new Date(v.createdAt), "en_US")}
                    </td>
                    <td
                      scope="row"
                      className="px-6 flex gap-2 border-0 items-center py-2 font-medium text-gray-600 whitespace-nowrap"
                    >
                      <div className="flex -space-x-4 rtl:space-x-reverse">
                        {v.items.map(
                          (item, index) =>
                            index < 2 && (
                              <img
                                key={index}
                                alt={`Image ${index + 1}`}
                                src={item?.productID?.images[0] || null}
                                className="w-8 h-8 border-2 border-white rounded-full bg-gray-200 hover:-translate-x-2 transition-all"
                              />
                            )
                        )}
                        {v.items.length > 2 && (
                          <a
                            href="#"
                            className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-gray-700 rounded-full hover:bg-gray-600 dark:border-gray-800"
                          >
                            +{v.items.length - 2}
                          </a>
                        )}
                      </div>
                      {v.items[0]?.productID?.name.slice(0, 18) + "..."}
                    </td>
                    {/* Costomer Details ---------------------------- */}
                    <td className="px-6 py-2">
                      {v.customerDetail.fullname ||
                        v.hasLoginUserData?.fullname}
                    </td>
                    <td className="px-6 py-2">
                      {" "}
                      {v.customerDetail.address || v.isLoginUserAddress}
                    </td>
                    <td className="px-6 py-2"> {v.total} </td>
                    <td className="px-6 py-2">
                      <span
                        className={`px-3 rounded-full font-light ${
                          v.status === "Pending"
                            ? "bg-[#FAF5EF] text-[#FF941A]"
                            : v.status === "Confirmed"
                            ? "bg-blue-50 text-blue-400"
                            : v.status === "Delivered"
                            ? "bg-[#EEF7F2] text-[#05B651]"
                            : v.status === "Shipped"
                            ? "bg-purple-50 text-purple-400"
                            : v.status === "Cancelled"
                            ? "bg-[#FAF0F0] text-[#F46A6A]"
                            : ""
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>

                    <td className="px-6 py-2 text-lg text-center">
                      <button onClick={() => openModal(v)}>
                        <i
                          title="View"
                          className="fa fa-solid fa-eye px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-400 text-sm"
                        ></i>
                      </button>
                      <button onClick={() => openUpdateModal(v)}>
                        <i className="fa-solid fa-pen-to-square px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-400 text-sm"></i>
                      </button>
                      {/* <Link href={`products/edit-product/${v.slug}`}>
                        <i
                          title="Edit"
                          className="fa-solid fa-pen-to-square px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-400 text-sm"
                        ></i>
                      </Link> */}
                      <i
                        title="Delete"
                        onClick={() => delPost(v._id)}
                        className="fa fa-solid fa-trash px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-orange-400 text-sm"
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Pagination start  ----------- */}
          <div className=" flex items-center justify-end pr-10 gap-5 w-full py-5 border-b border-gray-100 bg-gray-50">
            <span className=" whitespace-nowrap flex items-center justify-center text-sm text-slate-500">
              {/* {pageCount} to {end} of {total} */}
              {productData?.page} of {productData?.ending} to{" "}
              {productData?.TotalProducts}
            </span>
            <div className="flex border gap-4 px-4 py-1 rounded-full">
              <i
                onClick={() =>
                  router.push(
                    `/dashboard/products?page=${productData?.page - 1}`
                  )
                }
                className={`fa-solid fa-angle-left p-1 text-orange-600 text-xs border-r pr-4 ${
                  productData?.starting == 1
                    ? "cursor-not-allowed text-slate-300"
                    : "cursor-pointer hover:text-orange-500"
                }`}
              ></i>

              <i
                onClick={() => {
                  if (productData?.end < productData?.TotalProducts) {
                    router.push(
                      `/dashboard/products?page=${productData?.page + 1}`
                    );
                  }
                }}
                className={`fa-solid fa-angle-right text-orange-600 text-xs p-1 ${
                  productData?.end >= productData?.TotalProducts
                    ? "cursor-not-allowed text-slate-300"
                    : "cursor-pointer hover:text-orange-500"
                }`}
              ></i>
            </div>
          </div>
        </div>
      </div>

      {/* order details modal here ------------- */}
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
          } bg-transparent duration-500 mx-auto my-8 relative p-4 max-w-[70%] rounded-lg`}
        >
          <span
            onClick={() => setShowModal(false)}
            className="cursor-pointer h-8 w-8"
          >
            <i className="bxShadow h-8 w-8 flex items-center justify-center absolute top-[12px] p-1 text-white hover:text-gray-900 -right-[0px] bg-gray-400 z-20 hover:bg-gray-100 rounded-full cursor-pointer fa-solid fa-xmark"></i>
          </span>
          <div className="mt-3 rounded-lg bg-white backdrop-blur-sm p-4">
            <span className=" text-xl text-slate-800 font-semibold mb-4">
              Product Details
            </span>
            <div className="mt-3 flex items-center gap-4 justify-center">
              {modeladata?.items?.map((item, index) => (
                <>
                  <img
                    key={index}
                    alt={`Image ${index + 1}`}
                    src={item.productID.images[0] || null}
                    className=" w-28 h-32 bg-contain rounded-md bg-gray-200"
                  />
                  <h2 className=" text-gray-500 text-sm">
                    {" "}
                    {item.productID.name}
                  </h2>
                </>
              ))}
            </div>
            <div className="my-4 mt-6">
              <h2 className=" text-xl text-slate-700 font-semibold mb-4">
                Customer Details
              </h2>
              {/* customer detail main div ----------------- */}
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-0 gap-x-4">
                {/* Customer detail ---------------------- */}
                <div className="mb-4 flex flex-col p-4 globalShadow rounded-lg">
                  <span className="mb-1 text-[#222222ab] font-medium text-xs">
                    Customer Name
                  </span>
                  <span className="text-[#444] text-sm font-semibold">
                    {modeladata?.customerDetail?.fullname ||
                      modeladata.isLoginUserName}
                  </span>
                </div>
                {/* Email ---------------------- */}
                <div className="mb-4 flex flex-col p-4 globalShadow rounded-lg">
                  <span className="mb-1 text-[#222222ab] font-medium text-xs">
                    Email
                  </span>
                  <span className="text-[#444] text-sm font-semibold">
                    {modeladata?.customerDetail?.email || loginUserData.email}
                  </span>
                </div>
                {/* City ---------------------- */}
                <div className="mb-4 flex flex-col p-4 globalShadow rounded-lg">
                  <span className="mb-1 text-[#222222ab] font-medium text-xs">
                    City
                  </span>
                  <span className="text-[#444] text-sm font-semibold">
                    {modeladata?.customerDetail?.city ||
                      modeladata.isLoginUserAddress}
                  </span>
                </div>
                {/* Address ---------------------- */}
                <div className="mb-4 flex flex-col p-4 globalShadow rounded-lg">
                  <span className="mb-1 text-[#222222ab] font-medium text-xs">
                    Address
                  </span>
                  <span className="text-[#444] text-sm font-semibold">
                    {modeladata?.customerDetail?.address ||
                      modeladata.isLoginUserAddress}
                  </span>
                </div>
                {/* Product Details ---------------------- */}
                <div className="mb-4 flex flex-col p-4 globalShadow rounded-lg">
                  <span className="mb-1 text-[#222222ab] font-medium text-xs">
                    Product Details
                  </span>
                  <span className="text-[#444] text-sm font-semibold">
                    {modeladata?.status}
                  </span>
                </div>
                {/* Payment Details ---------------------- */}
                <div className="mb-4 flex flex-col p-4 globalShadow rounded-lg">
                  <span className="mb-1 text-[#222222ab] font-medium text-xs">
                    Payment Details
                  </span>
                  <span className="text-[#444] text-sm font-semibold">
                    {modeladata?.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* order Update Status Modal */}
      <div
        style={{
          visibility: updateModeladata ? "visible" : "hidden",
          opacity: updateModeladata ? "1" : "0",
          transition: ".4s",
        }}
        className="fixed z-10 top-0 left-0 w-full h-screen border-red-600 backdrop-blur-[2px] bg-[#00000094] overflow-auto"
      >
        <div
          className={`${
            updateModeladata ? "scale-100 opacity-100" : "scale-0 opacity-0"
          } bg-transparent duration-500 mx-auto my-8 relative p-4 md:max-w-[70%] max-w-[90%] lg:max-w-[50%] rounded-lg`}
        >
          <span
            onClick={() => setUpdateModeladata(false)}
            className="cursor-pointer h-8 w-8"
          >
            <i className="bxShadow h-8 w-8 flex items-center justify-center absolute top-[12px] p-1 text-white hover:text-gray-900 -right-[0px] bg-gray-400 z-20 hover:bg-gray-100 rounded-full cursor-pointer fa-solid fa-xmark"></i>
          </span>
          <div className="mt-3 rounded-lg bg-white backdrop-blur-sm p-4">
            <span className=" text-xl text-slate-800 font-semibold mb-4">
              Update Status of Product
            </span>
            <form onSubmit={submitForm}>
              <div className="my-5 flex flex-col">
                <label className="text-gray-500 mb-1" htmlFor="paymentStatus">
                  Payment Status
                </label>
                <select
                  id="paymentStatus"
                  name="paymentStatus"
                  onChange={changeHandler}
                  value={formData.paymentStatus}
                  className="relative border border-gray-200 text-gray-400 text-sm pl-3 px-2 py-[6px] rounded-lg focus:ring-2 transition-colors focus:outline-none focus:text-gray-400"
                >
                  <option selected value="select paymentStatus">
                    Select Product Payment Status
                  </option>
                  {paymentStatus?.map((v, i) => {
                    return (
                      <option key={i} value={v.name}>
                        {v.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="my-5 flex flex-col">
                <label className="text-gray-500 mb-1" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={changeHandler}
                  className="relative border border-gray-200 text-gray-400 text-sm pl-3 px-2 py-[6px] rounded-lg focus:ring-2 transition-colors focus:outline-none focus:text-gray-400"
                >
                  <option selected value="select status">
                    Select Product Status
                  </option>
                  {productStatus?.map((v, i) => {
                    return (
                      <option key={i} value={v.name}>
                        {v.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="bg-indigo-500 text-white px-4 py-1.5 rounded-md">
                {loading ? "Processing..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
