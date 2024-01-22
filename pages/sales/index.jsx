import React from "react";

const index = ({ data }) => {
  const bannerData = data?.getAllBanners;
  return (
    <>
      {bannerData?.map((v, i) => {
        return (
          <div key={i} className=" max-w-[1200px] m-auto ">
            <div
              style={{ backgroundImage: `url(${v.photo})` }}
              className={`h-[200px] bg-cover bg-center w-auto bg-no-repeat flex items-center justify-center relative z-50`}
            >
              <div className=" absolute top-0 h-full w-full bg-[#0000008a] -z-10"></div>
              <h1 className=" bg-white px-3 py-1 text-2xl text-orange-600 font-semibold z-20"> {v.bannerText} </h1>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default index;

export async function getServerSideProps(props) {
  const res = await fetch(
    // `https://u-shop-liart.vercel.app/api/benner`
    "http://localhost:3000/api/banner"
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
