import axios from "axios";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { CartContext } from "@/context/CartProvider";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";

export default function Categories(props) {
  const { addToCart } = useContext(CartContext);
  const [showForm, setShowForm] = useState(false);
  const [filterByName, setFilterByName] = useState({ name: "" });
  const [selectedCategories, setSelectedCategories] = useState([]);
  // Minimum price range --------------------------------------------------------/
  const [minPrice, setMinPrice] = useState("");
  // Maximum price range --------------------------------------------------------/
  const [maxPrice, setMaxPrice] = useState("");
  const [productData, setProductData] = useState(
    props.data.message.ProductData
  );

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
  const searchInputHandler = (e) => {
    setFilterByName({ ...filterByName, [e.target.name]: e.target.value });
  };

  // Fetch Data Basis Filter by Name Function ------------------------------------/
  const fetchProductData = async () => {
    try {
      const { data } = await axios.get("/api/get-all-product?limitLess=true", {
        params: { name: filterByName.name },
      });

      setProductData(data?.message?.data);
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

  // Filter by Price Range --------------------------------------------------------/
  const filteredProductsByPrice = filteredProducts.filter((product) => {
    if (!minPrice && !maxPrice) return true; // If both min and max prices are empty, show all products
    const min = parseFloat(minPrice) || 0; // If minPrice is empty, set it to 0
    const max = parseFloat(maxPrice) || Infinity; // If maxPrice is empty, set it to Infinity
    return product.price >= min && product.price <= max;
  });

  // Fetch Categories
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/products/category");
      setCategories(data.getcat);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Head>
        <title>Shop Now at U-Shop: Explore Exclusive Deals & Products</title>
        <meta
          name="description"
          content="U-Shop is your one-stop destination for great finds. Browse our vast collection, find exclusive deals, and shop for quality products."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Toaster />
      <div className="bg-[#ffffff]">
        <main className="mx-auto max-w-[1200px] m-auto px-4 sm:px-6">
          <div className="border-b border-gray-200 pb-6 my-8 flex items-center justify-between md:flex-row flex-col">
            <h1 className="text-4xl font-bold tracking-wide text-gray-700">
              All Products
            </h1>
            <div className="relative">
              <input
                style={{
                  transition: ".4s",
                  opacity: showForm ? "1" : "0",
                  visibility: showForm ? "visible" : "hidden",
                }}
                name="name"
                placeholder="Search here"
                value={filterByName.name}
                onChange={searchInputHandler}
                className="border border-gray-300 hover:ring-1 ring-orange-300 px-3 py-1 rounded-full w-[240px] text-gray-600 placeholder:text-gray-400 font-light outline-none focus:ring-2 focus:ring-orange-500"
              />
              <i
                onClick={() => setShowForm(true)}
                className="fa-solid fa-magnifying-glass animate-pulse text-sm text-gray-400 cursor-pointer absolute top-1/2 right-2 -translate-y-1/2 transition-all duration-300 hover:text-orange-600"
              ></i>
            </div>
          </div>
          <div className="flex gap-4 flex-col md:flex-row">
            {/* ------------ Aside filtetion aside Div ----------------------------------- */}
            <aside
              className={`border hover:bg-[#dddde61c] rounded-lg p-2 overflow-hidden`}
            >
              {/* ------------ Category filtetion ----------------------------------- */}
              <div className="border-b mb-3">
                <h2 className="px-2 text-xl my-2 font-medium tracking-wider text-orange-500">
                  Filter Products
                </h2>

                <span className="text-base font-semibold px-2 text-slate-600">
                  Category
                </span>

                <div className=" my-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex gap-4 px-4 py-1.5">
                      <input
                        type="checkbox"
                        id={category.name}
                        name={category.name}
                        className="cursor-pointer"
                        onChange={handleCategoryChange}
                      />
                      <label
                        htmlFor={category.name}
                        className="cursor-pointer text-gray-600 text-sm"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* ------------ Pricing filtetion ----------------------------------- */}
              <div className="border-b mb-3 pb-3">
                <span className="mb-3 text-base font-semibold px-2 text-slate-600 my-4">
                  Pricing
                </span>

                <div className=" m-2 flex items-center gap-2">
                  <div className="">
                    <input
                      type="number"
                      id="minPrice"
                      name="minPrice"
                      value={minPrice}
                      placeholder="Min"
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="border border-gray-300 text-sm px-2 py-1 rounded-md w-[70px] min-w-full text-gray-500 focus:text-gray-600 placeholder:text-gray-400 outline-none focus:ring-1"
                    />
                  </div>
                  <div className="">
                    <input
                      type="number"
                      id="maxPrice"
                      name="maxPrice"
                      value={maxPrice}
                      placeholder="Max"
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="border border-gray-300 text-sm px-2 py-1 rounded-md w-[70px] min-w-full text-gray-500 focus:text-gray-600 placeholder:text-gray-400 outline-none focus:ring-1"
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* ------------ Products Grid Here ----------------------------------- */}
            <div className="grid flex-1 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 2xl:grid-cols-4 gap-2 h-full border-[1px] rounded-lg p-4">
              {filteredProductsByPrice.length == 0 ? (
                <h1 className="text-gray-500 my-10 whitespace-nowrap">
                  Oops! Products Not Found.
                </h1>
              ) : (
                filteredProductsByPrice.map((v, i) => (
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
                ))
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
  const response = await fetch(
    "https://u-shop-liart.vercel.app/api/get-all-product"
  );
  const data = await response.json();

  return { props: { data } };
}
