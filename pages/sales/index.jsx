import { CartContext } from "@/context/CartProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const index = ({ data }) => {
  const router = useRouter();
  const { addToCart } = useContext(CartContext);

  const bannerData = data?.updatedBanners;
  const postData = data?.updatedBanners[0]?.post;
  return (
    <>
      {bannerData?.map((v, i) => {
        return (
          <div key={i} className=" max-w-[1200px] m-auto my-10">
            <div
              style={{ backgroundImage: `url(${v.photo})` }}
              className={`h-[300px] bg-cover bg-center w-auto bg-no-repeat flex items-center justify-center relative z-50`}
            >
              <div className=" absolute top-0 h-full w-full bg-[#0000008a] -z-10"></div>
              <h1 className=" bg-white px-3 py-1 text-2xl text-orange-600 font-semibold z-20">
                {" "}
                {v.bannerText}{" "}
              </h1>
            </div>
          </div>
        );
      })}

      {/* list  Products ============ */}
      <div className="max-w-[1200px] m-auto overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Customers also purchased
        </h2>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {postData?.map((v, i) => (
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
                {v.sale ? (
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
                    src={v.images[i] || v.images[0]}
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
                  <p className="text-sm font-medium text-gray-500">{v.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default index;

export async function getServerSideProps(props) {
  const res = await fetch("https://u-shop-liart.vercel.app/api/sales");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
