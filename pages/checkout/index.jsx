import axios from "axios";
import Image from "next/image";
import InputMask from "react-input-mask";
import { Toaster, toast } from "react-hot-toast";
import React, { useContext, useState } from "react";
import { CartContext } from "@/context/CartProvider";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { cartItems } = useContext(CartContext);
  const [showForm, setShowForm] = useState(false);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = item.price
      ? parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
      : 0;
    return total + itemPrice * item.quantity;
  }, 0);

  var [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // adding new address here ------------
  const [userFormData, setUserFormData] = useState({
    town: "",
    addressDetails: [
      {
        city: "",
        addresses: "",
      },
    ],
  });


  // address router handler here ----------
  const routehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "addressDetails.city") {
      setUserFormData({
        ...userFormData,
        addressDetails: [{ ...userFormData.addressDetails[0], city: value }],
      });
    } else if (name === "addressDetails.addresses") {
      setUserFormData({
        ...userFormData,
        addressDetails: [
          { ...userFormData.addressDetails[0], addresses: value },
        ],
      });
    } else {
      setUserFormData({ ...userFormData, [name]: value });
    }
  };

  // place order funciton api --------------
  var placeOrder = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      var res = await axios.post("/api/orders", {
        items: cartItems.map((v) => {
          var obj = {
            productID: v._id,
            unitPrice: v.price,
            quantity: v.quantity,
          };
          return obj;
        }),
        customerDetail: formData,
      });

      if (res.data.success) {
        toast.success("Order Placed Successfully!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // add address funciton api --------------
  const userSubmitAddressData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const userId = user._id;

      const res = await axios.put(`/api/auth/edit/?id=${userId}`, {
        ...userFormData,
      });

      if (res.data.success) {
        toast.success("User Updated Successfully 😍😎");
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      {/* NEW MODEL DESING ---------------------------------------------------------------------------  */}
      <div
        style={{
          visibility: showForm ? "visible" : "hidden",
          opacity: showForm ? "1" : "0",
          transition: ".4s",
        }}
        className="fixed z-50 top-0 left-0 w-full h-screen border-red-600 backdrop-blur-[2px] bg-[#00000094] overflow-auto"
      >
        <div
          className={`${
            showForm ? "scale-100 opacity-100" : "scale-0 opacity-0"
          } bg-white duration-500 mx-auto my-8 relative p-4 max-w-xl lg:max-w-4xl border rounded-lg`}
        >
          <span onClick={() => setShowForm(false)} className="cursor-pointer">
            close
          </span>

          <form className="space-y-6 mt-4" onSubmit={userSubmitAddressData}>
            {/* Town ----------------------- */}
            <div>
              <label
                htmlFor="town"
                className="block text-sm leading-6 text-gray-500"
              >
                town
              </label>
              <div className="mt-2">
                <input
                  id="town"
                  name="town"
                  onChange={routehandler}
                  value={userFormData.town}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Town / City ----------------------- */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm leading-6 text-gray-500"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  onChange={routehandler}
                  name={"addressDetails.city"}
                  value={userFormData.addressDetails?.city}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* New Address  ----------------------- */}
            <div>
              <label
                htmlFor="addresses"
                className="block text-sm leading-6 text-gray-500"
              >
                New Address
              </label>
              <div className="mt-2">
                <input
                  name={"addressDetails.addresses"}
                  onChange={routehandler}
                  value={userFormData.addressDetails.addresses}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Button here --------------------- */}
            <div>
              <button
                type="submit"
                className="rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
              >
                {loading ? "Processing..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="px-4 my-12">
        <form
          onSubmit={placeOrder}
          className="max-w-6xl mx-auto grid gap-6 grid-cols-5 py-10 bg-white globalShadow rounded-lg p-4"
        >
          {user ? (
            <>
              <div className="p-2 border col-span-3">
                <h2 className="font-semibold text-2xl mb-4">Add Address</h2>
                <span
                  onClick={() => setShowForm(true)}
                  className="border px-4 py-1 rounded-lg cursor-pointer hover:bg-gray-200"
                >
                  Add New Address
                </span>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-6 col-span-5 lg:col-span-3 p-2">
              <h2 className="col-span-2 font-semibold text-2xl">
                Shipping Details
              </h2>
              {/* First Name ----------------- */}
              <div className="">
                <label className="block" htmlFor="">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={changeHandler}
                  value={formData.firstName}
                  className="mt-2 border-0 w-full py-2 px-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
              {/* Last Name ----------------- */}
              <div className="">
                <label className="block" htmlFor="">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={changeHandler}
                  value={formData.lastName}
                  className="mt-2 border-0 w-full py-2 px-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>

              {/* Phone Number ----------------- */}
              <div className="">
                <label className="block" htmlFor="">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <InputMask
                  required
                  name="phone"
                  mask="03999999999"
                  value={formData.phone}
                  onChange={changeHandler}
                  placeholder="Phone Number"
                  className="mt-2 border-0 w-full py-2 px-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>

              {/* Email ----------------- */}
              <div className="">
                <label className="block" htmlFor="">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={changeHandler}
                  className="mt-2 border-0 w-full py-2 px-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>

              {/* Town / City ----------------- */}
              <div className="col-span-2">
                <label className="block" htmlFor="">
                  Town / City <span className="text-red-600">*</span>
                </label>
                <input
                  required
                  name="city"
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={changeHandler}
                  className="mt-2 border-0 w-full py-2 px-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
              {/* Street Address ----------------- */}
              <div className="col-span-2">
                <label className="block" htmlFor="">
                  Street Address <span className="text-red-600">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="address"
                  placeholder="Adress"
                  onChange={changeHandler}
                  value={formData.address}
                  className="mt-2 border-0 w-full py-2 px-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          )}
          {/* Aside of Place Orders ------------------------------- */}
          <aside className="col-span-5 lg:col-span-2 bg-gray-100 p-4 flex flex-col rounded-md">
            <h2 className="col-span-2 mb-4 font-semibold text-2xl text-center">
              Your Order
            </h2>

            <div className="bg-white flex flex-col p-4 flex-1 rounded-md">
              <div className="flex justify-between border-b py-2 mb-2">
                <p className="font-bold">Product</p>
                <p className="font-bold">Sub Total</p>
              </div>

              <div className="flex-1">
                {cartItems?.map((v, i) => {
                  return (
                    <div
                      key={i}
                      className="flex items-center my-4 justify-between"
                    >
                      <div className="flex gap-1 items-center">
                        <div>
                          <i
                            onClick={() => removeItemFromCart(v._id)}
                            className="bx hover:bg-gray-200 text-gray-600 cursor-pointer p-[2px] rounded-full text-xl bx-x"
                          ></i>
                        </div>
                        <Image
                          width={200}
                          height={200}
                          className="w-10"
                          alt="image here"
                          src={v.images[i] || v.images[0] || v.avatar}
                        />
                        <div>
                          <p className="line-clamp-1 font-bold">{v.title}</p>
                          {v.quantity} items x {v.price}
                        </div>
                      </div>

                      <p className="whitespace-nowrap">
                        Rs {v.price * v.quantity}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between border-t py-2">
                <p className="font-bold text-xl">Total</p>
                <p className="font-bold text-xl">Rs {totalPrice}</p>
              </div>
            </div>

            <button className="py-3 px-3 w-full bg-orange-500 hover:bg-orange-600 my-4 text-white rounded-md">
              {loading ? "Processing..." : "Place Order"}
            </button>
          </aside>
        </form>
      </div>
    </>
  );
};

export default index;
