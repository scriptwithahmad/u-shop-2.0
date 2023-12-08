import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const DashTeam = ({ data }) => {
  const [fData, setFData] = useState(data.ProductData);
  const [filterByName, setFilterByName] = useState({
    name: "",
  });

  const searchInputHanler = (e) => {
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
    <div>
      <Toaster />
      <div className="backCover max-h-full">
        <div className="dash-wrapper">
          <div className="filterBox">
            <h1 className="mainTitle">
              Our <span>Products</span>
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchProductData();
              }}
              className="innerInput"
            >
              <input
                type="search"
                name="name"
                placeholder="Search..."
                value={filterByName.name}
                onChange={searchInputHanler}
              />
              <button type="submit">Search</button>
            </form>
          </div>

          <div className="dasboard-Main">
            {fData?.map((v, i) => {
              return (
                <div key={i} className="das-col">
                  <div className="das-sub-col">
                    <div className="h-[130px] w-[150px]">
                      <img
                        src={v.avatar || v.images[i]}
                        alt="Image Alt"
                        href={null}
                        width={200}
                        height={200}
                        className=" h-full w-full p-2 border border-[#eee] object-cover rounded-lg"
                      />
                    </div>
                    <div className="das-info">
                      <h1 className="title"> {v.name} </h1>
                      <p
                        style={{ display: "inline-block" }}
                        className="border bg-blue-50 border-blue-400 px-3 text-sm rounded-lg text-blue-500"
                      >
                        {v.category}
                      </p>
                    </div>
                  </div>
                  <div className="action">
                    <Link href={`product/${v.slug}`}>
                      <i className="fa-solid fa-eye"></i>
                    </Link>
                    <Link href={`/edit/${v.slug}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <i
                      onClick={() => delPost(v.slug)}
                      className="fa-solid fa-trash"
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashTeam;

export async function getServerSideProps() {
  const res = await fetch(
    "https://e-commerce-frontend-zeta.vercel.app//api/get-all-product"
    // "http://localhost:3000/api/get-all-product"
  );
  const data = await res.json();

  return { props: { data } };
}
