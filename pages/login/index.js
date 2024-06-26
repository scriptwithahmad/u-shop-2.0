import axios from "axios";
import { useState } from "react";
import mailjet from "@/helpers/mailjet";
import { Toaster, toast } from "react-hot-toast";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const routehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const loginUser = await axios.post("/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("User Logged In");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center px-6 py-12 lg:px-8">
        <div className="globalShadow rounded-lg px-6 py-8 mt-2 md:w-[600px] w-[350px]">
          <div className="mb-2">
            <div className=" flex items-center gap-2">
              <img
                alt="Logo Here"
                className=" w-8 animate-pulse"
                src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1706707781/ulogo_hclp4i.png"
              />
              <h2 className="text-slate-700 text-xl font-bold">SHOP</h2>
            </div>
            <p className="my-4 text-slate-700 text-lg font-medium leading-9 tracking-tight">
              Sign in to your account
            </p>
          </div>

          <form className="space-y-6" onSubmit={submitForm}>
            {/* Username ----------------------- */}
            <div>
              <label
                for="username"
                className="block text-sm leading-6 text-gray-500"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  onChange={routehandler}
                  autocomplete="username"
                  value={formData.username}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Password ----------------------- */}
            <div>
              <label
                for="password"
                className="block text-sm leading-6 text-gray-500"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={routehandler}
                  value={formData.password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Button here --------------------- */}
            <div>
              <button
                type="submit"
                className="rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
              >
                {loading ? "Processing..." : "Log In"}
              </button>
            </div>
          </form>
          {/* accout Info ----------------------- */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Don't Have an Accout /
            <a
              href="/register"
              className="leading-6 text-orange-500 hover:text-orange-600"
            >
              {" "}
              Sigin Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
