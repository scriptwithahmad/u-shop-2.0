import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Toaster, toast } from "react-hot-toast";

const tableHeader = [
  { lable: "Name", align: "left" },
  { lable: "Actions", align: "center" },
];

const index = () => {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Do you wnat to Delete this Banner") === true) {
        const res = await fetch(`/api/banner/${id}`, {
          method: "DELETE",
        });
        if (
          toast.success("Banner Deleted Successfully!", {
            duration: 2000,
          })
        ) {
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

  const [formData, setFormData] = useState({
    bannerText: "",
  });

  const formDataChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const UploadImageToCloudinary = async () => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "blog-image");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmyrswz0r/image/upload",
        {
          body: data,
          method: "POST",
        }
      );

      const jsonRes = await res.json();

      return jsonRes.secure_url;
    } catch (error) {
      alert("Something wrong! while Uplading image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const ImageUrl = await UploadImageToCloudinary();
      const res = await axios.post("/api/banner", {
        ...formData,
        photo: ImageUrl,
      });
      if (res) {
        toast.success("Banner Added Successfully 😍");
      }
      setFile("");
      setFormData({
        bannerText: "",
      });
      setTimeout(() => {
        setShowForm(false);
      }, 100);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.success(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => await axios.get("/api/banner"),
  });

  return (
    <>
      <Toaster />

      <div className="w-full">
        <div className="overflow-x-auto w-full border rounded-2xl">
          <div className="bg-white p-4 flex justify-between items-center flex-col gap-3 lg:flex-row">
            <h2 className="text-xl font-semibold">
              All <span className="text-indigo-600">Products</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div>
                  <input
                    type="search"
                    placeholder="Search Banner"
                    className="relative border border-gray-200 text-gray-400 text-sm pl-3 px-2 py-[6px] lg:w-[12vw] w-[25vw] rounded-full focus:ring-2 transition-colors focus:outline-none focus:text-gray-400"
                  />
                  <span>
                    {loading ? (
                      <i className="fa-solid fa-spinner absolute top-[30%] right-3 text-xs text-gray-500 dashboardSearchSlide"></i>
                    ) : null}{" "}
                  </span>
                </div>
                <i
                  title="Add New Sales Banner"
                  className="absolute top-1/2 -translate-y-1/2 right-3 border-l pl-2 cursor-pointer text-gray-400 hover:text-gray-500 bx bx-search-alt-2"
                ></i>
              </div>
              <div>
                <i
                  onClick={() => setShowForm(true)}
                  className="fa-solid fa-plus rounded-full h-8 w-8 flex items-center justify-center bg-blue-500 text-white transition-all duration-150 cursor-pointer text-sm"
                ></i>
              </div>
            </div>
          </div>
          <table className="text-sm min-w-[1000px] w-full text-left text-gray-500">
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
              {data?.data?.getAllBanners?.map((v, i) => {
                return (
                  <tr key={i} className="bg-white border-b border-gray-100">
                    <td
                      scope="row"
                      className="px-6 flex border-0 items-center py-2 font-medium text-gray-600 whitespace-nowrap"
                    >
                      <div className="w-16 h-8 mr-3 rounded-md overflow-hidden">
                        <img
                          src={v.photo}
                          alt="Image Here"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {v.bannerText}
                    </td>
                    <td className="px-6 py-2 text-lg text-center">
                      <button>
                        <i
                          title="View Deatail"
                          onClick={() => openModal(v)}
                          className="fa fa-solid fa-eye px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-gray-400 text-sm"
                        ></i>
                      </button>
                      <i
                        title="Delete"
                        onClick={() => handleDelete(v._id)}
                        className="fa fa-solid fa-trash px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-full text-red-400 text-sm"
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Sale Banner Modal Here ----------------------------------------------------  */}
      <div
        style={{
          visibility: showForm ? "visible" : "hidden",
          opacity: showForm ? "1" : "0",
          transition: ".4s",
        }}
        className="fixed z-10 top-0 left-0 w-full h-screen backdrop-blur-[2px] bg-[#00000094] overflow-auto"
      >
        <div
          className={`${
            showForm ? "scale-100 opacity-100" : "scale-0 opacity-0"
          } bg-white duration-500 sm:mx-auto mx-3 my-8 relative max-w-xl lg:max-w-4xl rounded-lg overflow-hidden`}
        >
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <h2 className=" text-slate-500 font-semibold text-xl">
              Add New User
            </h2>
            <i
              onClick={() => setShowForm(false)}
              className="fa-solid fa-xmark  bg-gray-100 cursor-pointer text-gray-400 p-1 text-lg rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-200"
            ></i>
          </div>
          {/* -------------------------- UPLOAD Sale Banner HERE -------------------------------------- */}
          <form className="space-y-6 p-4" onSubmit={handleSubmit}>
            <div className=" flex flex-col">
              <label
                htmlFor="text"
                className="block text-sm leading-6 text-gray-500 mb-1"
              >
                Banner Text
              </label>
              <input
                id="text"
                name="bannerText"
                value={formData.bannerText}
                placeholder="Enter Banner Text"
                onChange={formDataChangeHandler}
                className=" hover:ring-1 w-full font-light outline-none text-sm rounded-md py-1.5 text-gray-600 shadow-sm border border-gray-300 px-2 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>

            <div className=" relative">
              {file && (
                <div className=" border border-blue-600 absolute top-0 right-2">
                  <i className="bx bx-trash" onClick={() => setFile(null)}></i>
                </div>
              )}

              <div>
                {!file && (
                  <label
                    htmlFor="banner"
                    className="block text-sm leading-6 text-gray-500 mb-1"
                  >
                    Upload Banner Image <i className="bx bx-cloud-upload"></i>
                  </label>
                )}

                <input
                  type="file"
                  id="banner"
                  onChange={(e) => setFile(e.target.files[0])}
                  className=" hover:ring-1 w-full outline-none text-sm rounded-md py-1.5 text-gray-600 shadow-sm border border-gray-300 px-2 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />

                {file && (
                  <img
                    className=" w-full h-56 object-cover rounded-lg mt-2"
                    src={URL.createObjectURL(file)}
                    alt="Image Here"
                  />
                )}
              </div>
            </div>
            {file && (
              <div className="">
                <button className=" bg-indigo-600 text-white px-4 py-1 my-2 rounded-md">
                  {loading ? "Uploading" : "Upload"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default index;
