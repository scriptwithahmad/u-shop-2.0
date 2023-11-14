import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const DashTeam = ({ data }) => {
  console.log(data.products);

  const [query, setQuery] = useState("");
  const [fData, setFData] = useState(data.products);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const router = useRouter();
  const delPost = async (slug) => {
    console.log(slug);
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
          window.location.reload()
        } else {
          toast.error("Something went Wrong");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  const handleSearch = () => {
    const filteredData = data.products.filter((v) =>
      v.name.toLowerCase().includes(query.toLowerCase())
    );
    setFData(filteredData);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <Toaster />
      <div class="backCover">
        <div className="dash-wrapper">
          <div className="filterBox">
            <h1 className="mainTitle">
              Edify <span>Team</span>
            </h1>
            <div className="innerInput">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>

          <div className="dasboard-Main">
            {data.products.map((v) => {
              return (
                <div key={v._id} className="das-col">
                  <div className="das-sub-col">
                    <div className="dasImgMain">
                      <Image
                        src={v.avatar}
                        alt="Image Alt"
                        width={200}
                        height={200}
                        className="das-img"
                      />
                    </div>
                    <div className="das-info">
                      <h1 className="title"> {v.name} </h1>
                      <p style={{ display: "inline-block" }} className="cate">
                        {v.category}
                      </p>
                    </div>
                  </div>
                  <div className="action">
                    <Link href={`product/${v.slug}`}>
                      <i class="fa-solid fa-eye"></i>
                    </Link>
                    <Link href={`/edit/${v.slug}`}>
                      <i class="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <i
                      onClick={() => delPost(v.slug)}
                      class="fa-solid fa-trash"
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
  );
  const data = await res.json();

  return { props: { data } };
}
