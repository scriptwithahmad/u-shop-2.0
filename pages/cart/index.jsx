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
    <div className="cartMain border rounded-lg p-4">
      <h2 className="text-blue-600 py-2 mb-4 pb-4 text-3xl font-bold border-b border-gray-200">
        Shopping Cart
      </h2>
      <div className="cartInner">
        <div className="leftSide">
          {cartLength == 0 ? (
            <div className="my-2">
              <h1 className="text-slate-950 text-lg my-3">
                Shoping Cart Empty
              </h1>
              <Link
                href="/categories"
                className=" bg-blue-500 px-4 py-1 rounded-lg text-white hover:bg-blue-600"
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
                    className="cartSubInner border mb-3 rounded-lg bg-[#f7f7f7]"
                  >
                    <div className="cartImgDiv border-r border-r-gray-200">
                      <img className="p-8" src={v.avatar} alt="img here" />
                    </div>
                    <div className="infoMain w-[350px]">
                      <div className="info">
                        <h2 className="text-indigo-900 font-semibold text-lg mb-2">
                          {v.name}
                        </h2>
                        <h3 className="text-[#0000008e] text-xs mb-2">
                          {v.color}
                        </h3>
                        <p className="text-[#000000d7] text-sm mb-1">
                          Only/- RS. {v.price}
                        </p>
                        <p className="text-[#000000d7] text-sm">{v.category}</p>
                      </div>
                      <div className="flex flex-col ">
                        <span className="text-xs text-gray-600">
                          Available Stock
                        </span>
                        <span className="text-sm text-gray-900">{v.stock}</span>
                      </div>
                    </div>
                    <div>
                      <button
                        className="px-2 rounded text-red-600 text-sm hover:text-red-700"
                        onClick={() => RemoveSpecificItemFromCart(v._id)}
                      >
                        Remove
                      </button>
                      <div className="contentMain">
                        <div className="mt-4">
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
        <div className="rightSide">
          <div className="OrderDivMain">
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
