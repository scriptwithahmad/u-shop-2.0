import InputMask from "react-input-mask";
import React, { useContext, useState } from "react";
import { CartContext } from "@/context/CartProvider";
import Image from "next/image";
import axios from "axios";

const index = () => {
  const { cartItems } = useContext(CartContext);

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

  var placeOrder = async (e) => {
    e.preventDefault();
    try {
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
        alert("Order Placed Successfully!");
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <div className="px-4">
        <form
          onSubmit={placeOrder}
          className="max-w-6xl mx-auto grid gap-6 grid-cols-5 py-10 bg-white globalShadow rounded-lg p-4"
        >
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
                className="border w-full py-2 px-3 rounded-md"
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
                className="border w-full py-2 px-3 rounded-md"
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
                className="border w-full py-2 px-3 rounded-md"
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
                className="border w-full py-2 px-3 rounded-md"
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
                className="border w-full py-2 px-3 rounded-md"
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
                className="border w-full py-2 px-3 rounded-md"
              />
            </div>
          </div>

          <aside className="col-span-5 lg:col-span-2 bg-gray-200 p-4 flex flex-col rounded-md">
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
                          src={v.images[0]}
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

            <button className="py-3 px-3 w-full bg-red-700 my-4 text-white rounded-md">
              Place Order
            </button>
          </aside>
        </form>
      </div>
    </>
  );
};

export default index;
