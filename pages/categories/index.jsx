import axios from "axios";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { CartContext } from "@/context/CartProvider";
import { useContext, useEffect, useState } from "react";

export default function Categories(props) {

  const { addToCart } = useContext(CartContext);
  const [showForm, setShowForm] = useState(false);
  const [productData, setProductData] = useState(
    props.data.message.ProductData
  );
  const [filterByName, setFilterByName] = useState({
    name: "",
  });

  const [selectedCategories, setSelectedCategories] = useState([]);

  // Filter by Category ----------------------------------------------------------/
  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;

    // Update selected categories based on checkbox change
    if (checked) {
      setSelectedCategories((prevCategories) => [...prevCategories, name]);
    } else {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((category) => category !== name)
      );
    }
  };

  // Input OnChange Function -----------------------------------------------------/
  const searchInputHanler = (e) => {
    setFilterByName({ ...filterByName, [e.target.name]: e.target.value });
  };

  // Fetch Data Basis Filter by Name Function ------------------------------------/
  const fetchProductData = async () => {
    try {
      const { data } = await axios.get("/api/get-all-product", {
        params: { name: filterByName.name },
      });
      setProductData(data.message.ProductData);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  // Fetch data on Every Render  -------------------------------------------------/
  useEffect(() => {
    fetchProductData();
  }, [filterByName.name]);

  // Filter Data On Filteration --------------------------------------------------/
  const filteredProducts = selectedCategories.length
    ? productData.filter((product) =>
        selectedCategories.includes(product.category)
      )
    : productData;

  return (
    <>
      <Toaster />
      <div className="bg-[#ffffff]">
        <main className="mx-auto max-w-[1200px] m-auto px-4 sm:px-6">
          <div className="border-b border-gray-200 pb-6 my-8 flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-wide text-gray-700">
              All Products
            </h1>
            <div className="relative">
              <input
                style={{
                  visibility: showForm ? "visible" : "hidden",
                  opacity: showForm ? "1" : "0",
                  transition: ".4s",
                }}
                name="name"
                placeholder="Search here"
                value={filterByName.name}
                onChange={searchInputHanler}
                className="border px-3 py-1 rounded-md w-[240px] text-gray-500 placeholder:text-gray-300 outline-none focus:ring-2"
              />
              <i
                onClick={() => setShowForm(true)}
                className="fa-solid fa-magnifying-glass animate-pulse text-sm text-gray-400 hover:text-gray-500 cursor-pointer absolute top-1/2 right-2 -translate-y-1/2 transition-all duration-300"
              ></i>
            </div>
          </div>
          <div className="flex gap-4 flex-col md:flex-row">
            <div
              className={`border hover:bg-[#dddde61c] rounded-lg p-2 overflow-hidden`}
            >
              <h2 className="px-2 text-xl my-2 font-medium tracking-wider text-orange-500">
                Filter Products
              </h2>
              <div className="flex gap-4 px-4 py-2">
                <input
                  id="Men"
                  name="Men"
                  type="checkbox"
                  className="cursor-pointer"
                  onChange={handleCategoryChange}
                />
                <label
                  className="cursor-pointer text-gray-600 text-sm"
                  htmlFor="Men"
                >
                  Men
                </label>
              </div>
              <div className="flex gap-4 px-4 py-2">
                <input
                  id="Women"
                  name="Women"
                  type="checkbox"
                  className="cursor-pointer"
                  onChange={handleCategoryChange}
                />
                <label
                  className="cursor-pointer text-gray-600 text-sm"
                  htmlFor="Women"
                >
                  Women
                </label>
              </div>
              <div className="flex gap-4 px-4 py-2">
                <input
                  id="Kids"
                  name="Kids"
                  type="checkbox"
                  className="cursor-pointer"
                  onChange={handleCategoryChange}
                />
                <label
                  className="cursor-pointer text-gray-600 text-sm"
                  htmlFor="Kids"
                >
                  Kids
                </label>
              </div>
              <div className="flex gap-4 px-4 py-2">
                <input
                  id="Sports"
                  name="Sports"
                  type="checkbox"
                  className="cursor-pointer"
                  onChange={handleCategoryChange}
                />
                <label
                  className="cursor-pointer text-gray-600 text-sm"
                  htmlFor="Sports"
                >
                  Sports
                </label>
              </div>
            </div>
            <div className="grid flex-1 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 2xl:grid-cols-4 gap-2 h-full border-[1px] rounded-lg p-4">
              {filteredProducts.length == 0 ? (
                <h1 className="text-gray-500 my-10 whitespace-nowrap">
                  Opps! Products Not Found.
                </h1>
              ) : (
                filteredProducts.map((v, i) => {
                  return (
                    <div
                      key={i}
                      className="relative group border rounded-lg overflow-hidden"
                    >
                      <div>
                        <div className="w-full h-[200px] bg-gray-50">
                          <Link href={`/product/${v.slug}`}>
                            <img
                              alt="img here"
                              src={v.images[0]}
                              className="h-full w-full object-contain mix-blend-multiply cursor-pointer"
                            />
                          </Link>
                        </div>
                        <div className="p-2 my-4">
                          <Link href={`/product/${v.slug}`}>
                            <h2 className="text-sm mb-3 line-clamp-1 text-slate-700 hover:text-slate-900">
                              {v.name}
                            </h2>
                          </Link>
                          <div className="flex justify-between items-center">
                            <h2 className="text-xs border border-orange-100 w-fit p-[4px] px-3 rounded-md text-orange-400 font-normal">
                              {v.category}
                            </h2>
                            <h2 className="text-sm w-fit p-[4px] px-3 rounded-md text-slate-500">
                              Pkr/- {v.price}
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-600 bg-[#dadada80] p-2 rounded-md flex flex-col gap-2 absolute top-2 right-0 translate-x-12 transition-all duration-700 group-hover:-translate-x-2">
                        <Link href={`/product/${v.slug}`}>
                          <i className="fa-solid fa-eye hover:text-orange-500 bg-white rounded-md p-1 transition duration-200 cursor-pointer"></i>
                        </Link>
                        <i
                          onClick={() => addToCart(v)}
                          className="fa-solid fa-cart-plus hover:text-orange-500 bg-white rounded-md p-1 transition duration-200 cursor-pointer"
                        ></i>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// Fetch All Product Data Api ------------------------------------------------------/
export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/get-all-product");
  const data = await response.json();

  return { props: { data } };
}
