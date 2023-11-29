import { CartContext } from "@/context/CartProvider";
import Link from "next/link";
import React, { useContext } from "react";

const ProductList = ({ props }) => {
  const AllProductsData = props.ProductData;
  const { addToCart } = useContext(CartContext);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            Customers also purchased
          </h2>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AllProductsData.map((v, i) => (
              <div
                key={i}
                className="group relative bg-[#F7F7F7] rounded-lg group overflow-hidden"
              >
                {/* Action Icons Here */}
                <div className="absolute top-4 right-3 flex flex-col gap-2 group-hover:translate-x-0 translate-x-12 transition-all duration-500 z-30">
                  <i
                    onClick={() => addToCart(v)}
                    className="fa-solid fa-cart-plus text-slate-600 bg-gray-200 p-2 rounded cursor-pointer hover:bg-gray-300"
                  ></i>
                  <i className="fa-solid fa-eye text-slate-600 bg-gray-200 p-2 rounded cursor-pointer hover:bg-gray-300"></i>
                </div>
                {/* Sale */}
                <div className=" absolute top-2 left-0">
                  {/* <span className=" bg-blue-400 px-4 py-1 text-sm rounded-r-lg text-white shadow-xl">{v.sale == 0 ? <span className=" hidden"></span> : "Sale" }</span> */}
                  {v.sale == 0 ? (
                    <span className="hidden"></span>
                  ) : (
                    <span className=" bg-blue-400 px-4 py-1 text-sm rounded-r-lg text-white">
                      Sale
                    </span>
                  )}
                </div>
                <div className="h-[270px] px-4 pt-4 bg-transparent w-full overflow-hidden rounded-md bg-gray-200">
                  <img
                    src={v.avatar}
                    alt="image here"
                    className="h-full w-full group-hover:rotate-3 group-hover:scale-105 transition-all duration-300 rounded-lg object-cover object-center"
                  />
                </div>
                {/* Product Content Here --------- */}
                <div className="px-4 py-4">
                  <h3 className="text-lg font-medium text-slate-700 line-clamp-1 hover:text-blue-900 transition-all duration-300">
                    <Link href={`/product/${v.slug}`}>{v.name}</Link>
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="mt-1 text-sm text-gray-500">{v.category}</p>
                    <p className="text-sm font-medium text-gray-500">
                      {v.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
