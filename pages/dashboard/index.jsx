import Link from "next/link";
import { Chart } from "primereact/chart";
import React, { useState, useEffect } from "react";

const tableHeader = [
  { lable: "Name", align: "left" },
  { lable: "Category", align: "left" },
  { lable: "Price", align: "left" },
];

const Dashboard = ({ data }) => {
  const [productData, setProductData] = useState(data.ProductData);

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0.4,
        },
        {
          label: "Second Dataset",
          data: [28, 22, 33, 44, 55, 66, 77],
          fill: false,
          borderColor: documentStyle.getPropertyValue("--pink-500"),
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {/* Dashboard Card 01 -----------*/}
          <div className="bg-white rounded-lg py-5 px-7 flex globalShadow">
            <div className=" flex-1">
              <h2 className=" text-slate-600 text-base mb-2">Products</h2>
              <span className=" text-slate-800 font-semibold text-lg">325</span>
              <p className=" my-2 text-sm text-slate-400 font-light">
                <span className="text-[#22c55e]">24</span> Newly Added Products
              </p>
            </div>
            <div>
              <i className="fa-solid fa-chart-simple bg-cyan-200 text-cyan-700 p-2 rounded-md"></i>
            </div>
          </div>
          {/* Dashboard Card 02 -----------*/}
          <div className="bg-white rounded-lg py-5 px-7 flex globalShadow">
            <div className=" flex-1">
              <h2 className=" text-slate-600 text-base mb-2">Customers</h2>
              <span className=" text-slate-800 font-semibold text-lg">
                24,88
              </span>
              <p className=" my-2 text-sm text-slate-400 font-light">
                <span className="text-[#22c55e]">24</span> Newly Added Products
              </p>
            </div>
            <div>
              <i className="fa-solid fa-box bg-purple-200 text-purple-700 p-2 rounded-md"></i>
            </div>
          </div>
          {/* Dashboard Card 03 -----------*/}
          <div className="bg-white rounded-lg py-5 px-7 flex globalShadow">
            <div className=" flex-1">
              <h2 className=" text-slate-600 text-base mb-2">User</h2>
              <span className=" text-slate-800 font-semibold text-lg">80</span>
              <p className=" my-2 text-sm text-slate-400 font-light">
                <span className="text-[#22c55e]">24</span> Newly Added Products
              </p>
            </div>
            <div>
              <i className="fa-regular fa-user bg-pink-200 text-pink-700 p-2 rounded-md"></i>
            </div>
          </div>
          {/* Dashboard Card 04 -----------*/}
          <div className="bg-white rounded-lg py-5 px-7 flex globalShadow">
            <div className=" flex-1">
              <h2 className=" text-slate-600 text-base mb-2">Orders</h2>
              <span className=" text-slate-800 font-semibold text-lg">152</span>
              <p className=" my-2 text-sm text-slate-400 font-light">
                <span className="text-[#22c55e]">24</span> Newly Added Products
              </p>
            </div>
            <div>
              <i className="fa-brands fa-opencart bg-indigo-200 text-indigo-700 p-2 rounded-md"></i>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
          <div className="bg-white rounded-lg py-5 px-0 flex globalShadow">
            <div className="overflow-x-auto w-full">
              <div className="p-4">
                <h2 className="text-xl text-slate-700">Recent Sales</h2>
              </div>
              <table className="text-sm min-w-[800px] w-full text-left text-gray-500">
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
                          className="px-6 flex items-center py-3 text-gray-600"
                        >
                          <div className="w-10 h-10 mr-3 overflow-hidden">
                            <img
                              className="w-full h-full object-contain"
                              src={v.avatar || v.images[0]}
                              alt="Image Here"
                            />
                          </div>
                          <h2 className=" line-clamp-1 font-normal">
                            {v.name.slice(0, 35) + "..."}
                          </h2>
                        </td>
                        <td className="px-6 py-3"> {v.category} </td>
                        <td className="px-6 py-3"> {v.price} </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className=" flex items-center justify-center gap-4 w-full my-5 border-b border-gray-100 pb-4">
                <i className="fa-solid fa-angles-left text-gray-400 text-xs"></i>
                <i class="fa-solid fa-angle-left text-gray-400 text-xs"></i>
                <div className="flex items-center">
                  <span className="bg-[#EEF2FF] text-blue-600 text-xs p-2 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer hover:text-blue-500">
                    1
                  </span>
                  <span className="text-xs text-gray-500 p-2 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer hover:text-blue-500">
                    2
                  </span>
                </div>
                <i class="fa-solid fa-angle-right text-gray-400 text-xs"></i>
                <i className="fa-solid fa-angles-right text-gray-400 text-xs"></i>
              </div>
            </div>
          </div>

          {/* Charts InterFace Here ---------------- */}
          <div className="card bg-white rounded-lg py-5 px-7 flex globalShadow">
            <Chart
              type="line"
              data={chartData}
              className="w-full"
              options={chartOptions}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;

export async function getServerSideProps() {
  const res = await fetch(
    "https://e-commerce-frontend-zeta.vercel.app//api/get-all-product"
  );
  const data = await res.json();

  return { props: { data } };
}
