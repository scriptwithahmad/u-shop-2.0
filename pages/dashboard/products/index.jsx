import axios from "axios";
import Link from "next/link";
import queryStr from "query-string";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Toaster, toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { format, render, cancel, register } from "timeago.js";

const tableHeader = [
  { lable: "Date", align: "left" },
  { lable: "Name", align: "left" },
  { lable: "Category", align: "left" },
  { lable: "Price", align: "left" },
  { lable: "Stock", align: "left" },
  { lable: "Sale", align: "left" },
  { lable: "Seller", align: "left" },
  { lable: "Actions", align: "center" },
];

const index = () => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterByName, setFilterByName] = useState({ name: "" });

  const {
    data: productData,
    isLoading,
    isError,
    refetch,
  } = useQuery(["products", filterByName], async () => {
    try {
      const queryString = queryStr.stringify(filterByName);
      const res = await axios.get(`/api/get-all-product?${queryString}`);
      return res.data.message;
    } catch (error) {
      throw new Error(error.message);
    }
  });

  // Input Hadler For Searching by Name ------------------------------------------/
  const searchInputHanler = (e) => {
    setFilterByName({ ...filterByName, [e.target.name]: e.target.value });
  };

  // delete Product by Slug ------------------------------------------------------/
  const delPost = async (slug) => {
    try {
      if (window.confirm("Do you wnat to Delete this Product") === true) {
        const res = await fetch(`/api/products/${slug}`, {
          method: "DELETE",
        });
        if (
          toast.success("Product Deleted Successfully!", {
            duration: 1000,
          })
        ) {
          // router.push("/dashboard/products");
          refetch();
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
  }, [filterByName]); // Refetch when filterByName changes

  return (
    <>
      <Toaster />
      {/* TABLE STARTED ---------------------------------------------------------------------------  */}
      <div className="w-full">
        <div className="overflow-x-auto w-full border rounded-2xl">
          <div className="bg-white p-4 flex justify-between items-center flex-col gap-3 lg:flex-row w-full">
            <h2 className="text-xl font-semibold">
              All <span className="text-indigo-600">Products</span>
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
              {productData?.ProductData?.map((v, i) => {
                return (
                  <tr className="bg-white border-b border-gray-100">
                    <td className="px-6 py-2 text-xs">
                      {format(new Date(v.createdAt), "en_US")}
                    </td>
                    <td
                      scope="row"
                      className="px-6 flex border-0 items-center py-2 font-medium text-gray-600 whitespace-nowrap"
                    >
                      <div className="w-10 h-10 mr-3 border border-gray-100 rounded-full overflow-hidden">
                        <img
                          className="w-full h-full object-contain"
                          src={v.avatar || v.images[0]}
                          alt="Image Here"
                        />
                      </div>
                      {v.name}
                    </td>
                    <td className="px-6 py-2"> {v.category} </td>
                    <td className="px-6 py-2"> {v.price} </td>
                    <td className="px-6 py-2"> {v.stock} </td>
                    <td className={`px-6 py-2`}>
                      <span
                        className={`${
                          v.sale
                            ? "text-green-500 border-green-200"
                            : "text-red-500 border-red-100"
                        } border px-2 rounded-md font-light `}
                      >
                        {v.sale ? "Sale" : "Not Sale"}
                      </span>
                    </td>
                    <td className="px-6 py-2"> {v.seller} </td>
                    <td className="px-6 py-2 text-lg text-center">
                      <Link href={`/product/${v.slug}`}>
                        <i
                          title="View"
                          className="fa fa-solid fa-eye px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-400 text-sm"
                        ></i>
                      </Link>
                      <Link href={`products/edit-product/${v.slug}`}>
                        <i
                          title="Edit"
                          className="fa-solid fa-pen-to-square px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-400 text-sm"
                        ></i>
                      </Link>
                      <i
                        title="Delete"
                        onClick={() => delPost(v.slug)}
                        className="fa fa-solid fa-trash px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-red-400 text-sm"
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
      {/* NEW MODEL DESING ---------------------------------------------------------------------------  */}
      <div
        style={{
          visibility: showForm ? "visible" : "hidden",
          opacity: showForm ? "1" : "0",
          transition: ".4s",
        }}
        className="fixed z-10 top-0 left-0 w-full h-screen border-red-600 backdrop-blur-[2px] bg-[#00000094] overflow-auto"
      >
        <div
          className={`${
            showForm ? "scale-100 opacity-100" : "scale-0 opacity-0"
          } bg-white duration-500 mx-auto my-8 relative p-4 max-w-xl lg:max-w-4xl border rounded-lg`}
        >
          <span onClick={() => setShowForm(false)} className="cursor-pointer">
            close
          </span>
          <h1>Model Design</h1>
        </div>
      </div>
    </>
  );
};

export default index;
