import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartProvider";
import Link from "next/link";
const ShoppingCart = () => {
  const router = useRouter();
  const [value, setValue] = useState(1);

  const {
    cartItems,
    addToCart,
    clearCart,
    decreaseItemQuantity,
    RemoveSpecificItemFromCart,
  } = useContext(CartContext);
  const cartLength = cartItems.length;

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = item.price
      ? parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
      : 0;
    return total + itemPrice * item.quantity;
  }, 0);

  return (
    <div className="max-w-[1200px] 2xl:m-auto 2xl:my-12 md:m-5 border rounded-lg p-4 globalShadow">
      <h2 className="text-blue-600 py-2 mb-4 pb-4 text-3xl font-bold border-b border-gray-200">
        Shopping Cart
      </h2>
      <div className="flex gap-3 lg:flex-row md:flex-row flex-col items-center justify-center lg:items-start md:items-start">
        <div className="lg:w-[65%] md:w-[50%]">
          {cartLength == 0 ? (
            <div className="my-2">
              <h1 className="text-slate-950 text-lg my-3">
                Shoping Cart Empty
              </h1>
              <Link
                href="/categories"
                className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {cartItems.map((v, i) => {
                return (
                  <div
                    key={i}
                    className="flex p-4 lg:flex-row items-center lg:gap-5 border mb-3 rounded-lg bg-[#f7f7f7] flex-col gap-0"
                  >
                    <div className="w-[200px] h-[150px] lg:w-[180px] lg:h-[180px] bg-[#f7f7f7] rounded-md lg:border-r lg:border-r-gray-200">
                      <img
                        className="lg:p-4 md:p-2 mix-blend-multiply h-full w-full object-contain lg:object-cover"
                        src={v.avatar || v.images[i]}
                        alt="img here"
                      />
                    </div>
                    <div className="lg:h-[180px] flex flex-col justify-between lg:py-2 lg:w-[300px] 2xl:w-[400px]">
                      <div className="">
                        <h2 className="text-blue-600 line-clamp-2 font-semibold md:text-lg lg:text-lg mb-2 mt-3">
                          {v.name}
                        </h2>
                        <p className="text-[#000000d7] text-sm md:text-xs mb-1 md:mb-2">
                          <span className=" text-gray-600 md:text-xs">
                            Only/- RS.
                          </span>{" "}
                          {v.price}
                        </p>
                        <p className="text-[#000000c1] text-sm md:text-xs">
                          {v.category}
                        </p>
                      </div>
                      <div className="flex flex-col md:my-2">
                        <span className="text-xs text-gray-600">
                          Available Stock
                        </span>
                        <span className="lg:text-sm md:text-xs text-gray-800">
                          {v.stock}
                        </span>
                      </div>
                    </div>
                    <div className="md:flex md:w-full lg:w-fit lg:h-[180px] lg:justify-end md:items-center md:justify-between lg:flex-col">
                      <div className="contentMain md:mb-2">
                        <div className="mt-4 md:mt-1">
                          <button
                            className="bg-gray-200 px-2 rounded-sm border disabled:border-red-300 disabled:bg-red-100 disabled:cursor-not-allowed"
                            onClick={() => {
                              decreaseItemQuantity(cartItems[i]);
                            }}
                          >
                            -
                          </button>
                          <span className="bg-gray-200 border border-gray-300 px-2">
                            {cartItems[i].quantity}
                          </span>
                          <button
                            className="bg-gray-200 px-2 rounded-sm border disabled:border-red-300 disabled:bg-red-100 disabled:cursor-not-allowed"
                            onClick={() => addToCart(v)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="lg:px-2 rounded text-red-600 text-sm hover:text-red-700"
                        onClick={() => RemoveSpecificItemFromCart(v._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          <button
            onClick={() => {
              clearCart();
            }}
            disabled={cartLength == 0}
            className=" disabled:cursor-not-allowed disabled:bg-transparent disabled:border disabled:text-gray-300 bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded-md my-2"
          >
            Clear Cart
          </button>
        </div>
        <div className="md:w-[50%] lg:w-[35%] w-full">
          <div className="OrderDivMain border">
            <h1 className="text-blue-600 text-xl mb-8 font-bold">
              Order Summary
            </h1>
            <div className="orderFlex mb-4 pb-4 border-b-[1px]">
              <h1 className="text-sm text-[#000000b0]">Sub Total</h1>
              <p className="text-sm text-[#000000b0]">RS. 35,099</p>
            </div>
            <div className="orderFlex mb-4 pb-4 border-b-[1px]">
              <h1 className="text-sm text-[#000000b0]">Shipping estimate</h1>
              <p className="text-sm text-[#000000b0]">RS. 2.00</p>
            </div>
            <div className="orderFlex mb-4 pb-4 border-b-[1px]">
              <h1 className="text-sm text-[#000000b0]">Tax estimate</h1>
              <p className="text-sm text-[#000000b0]">RS. 8.32</p>
            </div>
            <div className="orderFlex mb-4 pb-4 border-b-[1px]">
              <h1 className="text-sm text-[#000000b0]">Order Sub Total</h1>
              <p className="text-sm text-[#000000b0]">{`RS. ${totalPrice.toFixed(
                2
              )}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
