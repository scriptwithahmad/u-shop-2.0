import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const tableHeader = [
  { lable: "Name", align: "left" },
  { lable: "Category", align: "left" },
  { lable: "Price", align: "left" },
  { lable: "Stock", align: "left" },
  { lable: "Seller", align: "left" },
  { lable: "Sele", align: "center" },
  { lable: "Actions", align: "center" },
];

const index = ({ data }) => {
  const [showForm, setShowForm] = useState(false);
  const [productData, setProductData] = useState(data.ProductData);
  const [filterByName, setFilterByName] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    setFilterByName({ ...filterByName, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  const delPost = async (slug) => {
    try {
      if (window.confirm("Do you wnat to Delete this Product") === true) {
        const res = await fetch(`/api/products/${slug}`, {
          method: "DELETE",
        });
        if (
          toast.success("Product Deleted Successfully!", {
            duration: 2000,
          })
        ) {
          router.push("/dashboard");
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

  const fetchProductData = async () => {
    try {
      const { data } = await axios.get("/api/get-all-product", {
        params: { name: filterByName.name },
      });
      setFData(data.ProductData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [filterByName.name]);

  return (
    <>
      {/* =============================
              TABLE STARTED  
      ================================= */}
      <div className="w-full">
        <div className="overflow-x-auto w-full border rounded-lg">
          <div className="bg-white p-4 flex justify-between items-center flex-col gap-3 lg:flex-row">
            <h2 className="text-xl font-semibold">
              All <span className="text-indigo-600">Products</span>
            </h2>
            <div className="relative">
              <input
                className="border border-gray-200 text-gray-400 text-sm pl-3 p-2 rounded-full focus:border-gray-400 transition-colors focus:text-gray-400"
                type="search"
                placeholder="Search here..."
              />
              <i className="absolute top-1/2 -translate-y-1/2 right-3 border-l pl-2 cursor-pointer text-gray-400 hover:text-gray-500 bx bx-search-alt-2"></i>
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
              {productData.map((v, i) => {
                return (
                  <tr className="bg-white border-b border-gray-100">
                    <td
                      scope="row"
                      className="px-6 flex border-0 items-center py-2 font-medium text-gray-600 whitespace-nowrap"
                    >
                      <div className="w-10 h-10 mr-3 border rounded-full overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
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
                            ? "text-green-500 border-green-300"
                            : "text-red-500 border-red-100"
                        } border px-2 rounded-md`}
                      >
                        {v.sale ? "Sale" : "Not Sale"}
                      </span>
                    </td>
                    <td className="px-6 py-2"> {v.sale} </td>
                    <td className="px-6 py-2 text-lg text-center">
                      <Link href={`/product/${v.slug}`}>
                        <i
                          title="View"
                          className="fa fa-solid fa-eye p-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-400 text-sm"
                        ></i>
                      </Link>
                      <Link href={`/edit/${v.slug}`}>
                        <i
                          title="Edit"
                          className="fa-solid fa-pen-to-square p-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-400 text-sm"
                        ></i>
                      </Link>
                      <i
                        title="Delete"
                        onClick={() => delPost(v.slug)}
                        className="fa fa-solid fa-trash p-1 cursor-pointer hover:bg-gray-100 rounded-full text-red-400 text-sm"
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Pagination start  ----------- */}
          <div className="flex justify-end items-center gap-2 pr-10 p-2 bg-gray-50 text-[#666]">
            <span>1 to 5 of 80</span>
            <div className="flex gap-2">
              <i className="cursor-pointer fa-solid fa-angle-left"></i>
              <i className="cursor-pointer fa-solid fa-angle-right"></i>
            </div>
          </div>
        </div>
      </div>

      {/* NEW MODEL DESING */}
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
          <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* card 01 */}
            <div className="rounded-md bg-[#eee] px-3 py-2">
              <h2 className="font-bold text-xl text-gray-600 mb-3 line-clamp-2">
                Full Stack Web Development with Node JS and Next JS
              </h2>
              <div className="mb-3 grid grid-cols-2">
                <div>
                  <span className="text-[#000000b4] text-xs mb-1">
                    <i className="text-xs bx bx-time"></i> Starting Time
                  </span>
                  <h2 className="font-medium text-[#444] text-sm">
                    12-10-2021
                  </h2>
                </div>
                <div>
                  <span className="text-[#000000b4] text-xs mb-1">
                    <i className="text-sm bx bx-time"></i> Ending Time
                  </span>
                  <h2 className="font-medium text-[#444] text-sm">
                    12-10-2023
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="mb-2">
                  <span className="text-[#000000b4] text-xs mb-1">
                    <i className="text-[10px] text-[#0000008c] fa-solid fa-hourglass"></i>{" "}
                    Duration
                  </span>
                  <h2 className="font-medium text-[#444] text-sm">4 months</h2>
                </div>
                <div>
                  <span className="text-[#000000b4] text-xs mb-1">
                    <i className="text-xs bx bx-location-plus"></i> Address
                  </span>
                  <h2 className="font-medium text-[#444] text-sm">
                    Green Town Faislabad
                  </h2>
                </div>
              </div>
            </div>
            {/* card 02 */}
            <div className="rounded-md bg-[#eee] px-3 py-2">
              <h2 className="font-bold text-xl text-gray-600 mb-3 line-clamp-2">
                Full Stack Web Development with Node JS and Next JS
              </h2>
              <div className="mb-3 grid grid-cols-2">
                <div>
                  <span className="text-[#000000b4] text-xs mb-1">
                    <i className="text-xs bx bx-time"></i> Starting Time
                  </span>
                  <h2 className="font-medium text-[#444] text-sm">
                    12-10-2021
                  </h2>
                </div>
                <div>
                  <span className="text-[#000000b4] text-xs mb-1">
                    <i className="text-sm bx bx-time"></i> Ending Time
                  </span>
                  <h2 className="font-medium text-[#444] text-sm">
                    12-10-2023
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="mb-2">
                  <span className="text-[#000000b4] text-xs mb-1">
                    <i className="text-[10px] text-[#0000008c] fa-solid fa-hourglass"></i>{" "}
                    Duration
                  </span>
                  <h2 className="font-medium text-[#444] text-sm">4 months</h2>
                </div>
                <div>
                  <span className="text-[#000000b4] text-xs mb-1">
                    <i className="text-xs bx bx-location-plus"></i> Address
                  </span>
                  <h2 className="font-medium text-[#444] text-sm">
                    Green Town Faislabad
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* =============================
            BOTTOM BUTTON FOR ADDING FORM
      ============================= */}
      <i
        onClick={() => setShowForm(true)}
        className="fa fa-solid fa-plus hover:bg-indigo-500 transition cursor-pointer bx-plus shadow-lg mb-4 w-10 h-10 flex justify-center items-center rounded-[50%] bg-indigo-600 text-xl text-white fixed right-10 bottom-10"
      >
        <span
          style={{
            clipPath:
              "polygon(90% 0, 100% 50%, 90% 100%, 0% 100%, 0 50%, 0% 0%)",
          }}
          className="absolute slidRight pl-2 pr-4 rounded-md whitespace-nowrap top-[50%] -translate-y-1/2 text-xs p-1 bg-indigo-600 right-[120%]"
        >
          Click to Add Playarea
        </span>
      </i>
    </>
  );
};

export default index;

export async function getServerSideProps() {
  const res = await fetch(
    // "https://e-commerce-frontend-zeta.vercel.app//api/get-all-product"
    "http://localhost:3000/api/get-all-product"
  );
  const data = await res.json();

  return { props: { data } };
}
