import { CartContext } from "@/context/CartProvider";
import Link from "next/link";
import { useContext, useState } from "react";

export default function Categories(props) {
  const [productData, setProductData] = useState(props.data.ProductData);
  const { addToCart } = useContext(CartContext);

  return (
    <>
      <div className="bg-[#ffffff]">
        <div>
          <main className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="border-b border-gray-200 pb-4 my-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Category
              </h1>
            </div>
            <div className="grid gap-4 grid-cols-[200px_minmax(1000px,_1fr)_100px]">
              <div className="border-[1px] h-full hover:bg-[#dddde61c] rounded-lg p-2">
                <h2 className="px-2 text-xl my-2 font-semibold tracking-wide text-blue-700">
                  Filters
                </h2>
                <div className="flex gap-4 px-4 py-2">
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    name="Mobiles"
                    id="Mobiles"
                  />
                  <label
                    className="cursor-pointer text-gray-600 text-sm"
                    htmlFor="Mobiles"
                  >
                    Mobiles
                  </label>
                </div>
                <div className="flex gap-4 px-4 py-2">
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    name="Earbuds"
                    id="Earbuds"
                  />
                  <label
                    className="cursor-pointer text-gray-600 text-sm"
                    htmlFor="Earbuds"
                  >
                    Earbuds
                  </label>
                </div>
                <div className="flex gap-4 px-4 py-2">
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    name="Tablets"
                    id="Tablets"
                  />
                  <label
                    className="cursor-pointer text-gray-600 text-sm"
                    htmlFor="Tablets"
                  >
                    Tablets
                  </label>
                </div>
                <div className="flex gap-4 px-4 py-2">
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    name="Smart Watches"
                    id="Smart Watches"
                  />
                  <label
                    className="cursor-pointer text-gray-600 text-sm"
                    htmlFor="Smart Watches"
                  >
                    Smart Watches
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 h-full border-[1px] rounded-lg p-4">
                {productData.map((v, i) => {
                  return (
                    <div
                      key={i}
                      className="relative group border rounded-lg overflow-hidden"
                    >
                      <div>
                        <div className="w-full h-[200px] bg-gray-50">
                          <img
                            className="h-full w-full object-contain mix-blend-multiply"
                            src={v.avatar || v.images[i]}
                            alt="img here"
                          />
                        </div>
                        <div className="p-2 my-4">
                          <h2 className="text-sm mb-3 line-clamp-1">
                            {v.name}
                          </h2>
                          <div className="flex justify-between items-center">
                            <h2 className="text-xs bg-blue-50 w-fit p-[4px] px-3 rounded-md text-blue-900">
                              {v.category}
                            </h2>
                            <h2 className="text-xs w-fit p-[4px] px-3 rounded-md text-blue-900">
                              Pkr/- {v.price}
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-600 flex flex-col gap-3 absolute top-2 right-0 translate-x-8 transition-all duration-700 group-hover:-translate-x-2">
                        <Link href={`/product/${v.slug}`}>
                          <i className="fa-solid fa-eye hover:text-sky-600 transition duration-200 cursor-pointer"></i>
                        </Link>
                        <i
                          onClick={() => addToCart(v)}
                          className="fa-solid fa-cart-plus hover:text-sky-600 transition duration-200 cursor-pointer"
                        ></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch(
    "http://localhost:3000/api/get-all-product"
    // "https://e-commerce-frontend-zeta.vercel.app//api/get-all-product"
  );
  const data = await response.json();

  return { props: { data } };
}
