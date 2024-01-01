import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
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
      const user = await axios.post("/api/auth/register", formData, {});
      console.log(user);
      toast.success("User Register Successfully!");
      router.push("/login");
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
      <div className="flex items-center flex-col px-6 py-12 lg:px-8">
        <h2 className="my-4 text-slate-700 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
        <div className="shadow-2xl border-y-4 border-y-orange-200 rounded-lg px-6 py-8 mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitForm}>
            {/* Full name  ----------------*/}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm leading-6 text-gray-500"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="fullName"
                  name="fullname"
                  onChange={routehandler}
                  value={formData.fullname}
                  autoComplete="fullName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Username  ----------------*/}
            <div>
              <label
                htmlFor="username"
                className="block text-sm leading-6 text-gray-500"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  onChange={routehandler}
                  autoComplete="username"
                  value={formData.username}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Phone  ----------------*/}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm leading-6 text-gray-500"
              >
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  onChange={routehandler}
                  autoComplete="phone"
                  value={formData.phone}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Email ----------------*/}
            <div>
              <label
                htmlFor="email"
                className="block text-sm leading-6 text-gray-500"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={routehandler}
                  value={formData.email}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Password ----------------*/}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm leading-6 text-gray-500"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="block text-sm leading-6 text-gray-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={routehandler}
                  value={formData.password}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* button ----------------*/}
            <div>
              <button
                type="submit"
                className="rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
              >
                {loading ? "Processing..." : "Sign Up"}
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already Have an Account /
            <a
              href="/login"
              className="leading-6 text-orange-500 hover:text-orange-600"
            >
              {" "}
              Sign In
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
