import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const index = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
  });

  const [categories, setCategories] = useState([]);

  const fetchCatgories = async () => {
    try {
      const { data } = await axios.get("/api/products/category");
      setCategories(data.getcat);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCatgories();
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addNewCategory = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`/api/products/category`, { ...formData });
      if (res.data.success) {
        setFormData("");
        toast.success("Catgory Added Successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message);
      setTimeout(() => {
        setError("");
      }, 7000);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/products/category/${id}`);
      if (res.data.success) {
        toast.success("Catgory Deleted Successfully!");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-white max-w-7xl m-auto p-5 rounded-lg">
        <form onSubmit={addNewCategory}>
          <div className=" mb-4 text-2xl font-semibold">
            Manage{" "}
            <span className=" text-orange-500 font-semibold">Category</span>
          </div>
          <div className=" flex items-center flex-wrap gap-4 mt-10">
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              placeholder="Catgory Name"
              onChange={handleAddressChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset hover:ring-orange-400 focus:ring-orange-400 sm:text-sm sm:leading-6"
            />
            <button className=" w-fit whitespace-nowrap px-4 py-1.5 rounded-lg text-white bg-orange-400 hover:bg-orange-500">
              {loading ? "Processing..." : "Add Category"}
              <i className="fa-solid fa-location-arrow ml-2"></i>
            </button>
          </div>
          <p className="errorPara">{error}</p>
        </form>

        <div className=" mt-6 px-2">
          {categories?.map((v, i) => {
            return (
              <div
                key={i}
                className="flex items-center justify-between gap-4 border-b py-2"
              >
                <h3 className=" text-slate-600">{v.name} </h3>
                <div>
                  <i
                    onClick={() => {
                      window.confirm("Are you sure to delete this Category?") &&
                        deleteCategory(v._id);
                    }}
                    className="fa-solid fa-trash-can text-sm text-red-400 hover:text-red-500 cursor-pointer transition"
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default index;
