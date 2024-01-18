import { CartContext } from "@/context/CartProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Toaster, toast } from "react-hot-toast";

const ProductList = ({ props, start, end, total, page }) => {
  const router = useRouter();
  var pageCount = parseInt(page);
  const AllProductsData = props;
  const { addToCart } = useContext(CartContext);

  return (
    <>
      <Toaster />
      <div className="bg-white">
        <div className="max-w-[1200px] m-auto overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            Customers also purchased
          </h2>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AllProductsData?.map((v, i) => (
              <div
                key={i}
                className="group relative bg-[#F7F7F7] rounded-lg group overflow-hidden"
              >
                <div className="absolute top-4 right-3 flex flex-col gap-2 group-hover:translate-x-0 translate-x-12 transition-all duration-500 z-30">
                  <i
                    onClick={() => {
                      addToCart(v);
                      toast.success("Add To Cart Successfully!");
                    }}
                    className="fa-solid fa-cart-plus text-slate-600 bg-gray-200 p-2 rounded cursor-pointer hover:bg-gray-300"
                  ></i>
                  <Link href={`/product/${v.slug}`}>
                    <i className="fa-solid fa-eye text-slate-600 bg-gray-200 p-2 rounded cursor-pointer hover:bg-gray-300"></i>
                  </Link>
                </div>
                <div className=" absolute top-2 left-0">
                  {v.sale == 0 ? (
                    <span className="hidden"></span>
                  ) : (
                    <span className=" bg-orange-400 px-4 py-1 text-sm rounded-r-lg text-white">
                      Sale
                    </span>
                  )}
                </div>
                <div className="h-[270px] px-4 pt-4 bg-transparent w-full overflow-hidden rounded-md bg-gray-200">
                  <Link href={`/product/${v.slug}`}>
                    <Image
                      height={400}
                      width={400}
                      priority="true"
                      alt="image here"
                      src={v.images[i] || v.images[0] || v.avatar}
                      className="h-full w-full group-hover:rotate-3 group-hover:scale-105 transition-all duration-300 rounded-lg object-contain object-center"
                    />
                  </Link>
                </div>
                <div className="px-4 py-4">
                  <h3 className="text-lg font-medium text-slate-700 line-clamp-1 hover:text-orange-700 transition-all duration-300">
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
          {/* Pagination start  ----------- */}
          <div className=" flex items-center justify-end gap-5 w-full py-5 border-b border-gray-100">
            <span className=" whitespace-nowrap flex items-center justify-center text-sm text-slate-500">
              {pageCount} to {end} of {total}
            </span>
            <div className="flex border gap-4 px-4 py-1 rounded-full">
              <i
                onClick={() => {
                  if (start !== 1) {
                    router.push(`/?page=${pageCount - 1}`);
                    setTimeout(() => {
                      window.scrollTo(0, 1500);
                    }, 1000);
                  }
                }}
                className={`fa-solid fa-angle-left p-1 text-orange-600 text-xs border-r pr-4 ${
                  start == 1
                    ? "cursor-not-allowed text-slate-300"
                    : "cursor-pointer hover:text-orange-500"
                }`}
              ></i>

              <i
                onClick={() => {
                  if (end < total) {
                    router.push(`/?page=${pageCount + 1}`);
                    setTimeout(() => {
                      window.scrollTo(0, 1500);
                    }, 1000);
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
    </>
  );
};

export default ProductList;
