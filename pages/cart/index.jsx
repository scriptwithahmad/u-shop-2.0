import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartProvider";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: "In Stock",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];
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
  console.log(cartItems);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return total + itemPrice * item.quantity;
  }, 0);

  return (
    <div className="cartMain border rounded-lg p-4">
      <h2 className="text-blue-600 py-8 text-3xl font-bold">Shopping Cart</h2>
      <div className="cartInner">
        <div className="leftSide">
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
                    <h3 className="text-[#0000008e] text-xs mb-2">{v.color}</h3>
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
                        disabled={value === 1}
                        onClick={() => {
                          if (value > 1) {
                            setValue(value - 1);
                          }
                        }}
                      >
                        -
                      </button>
                      <span className="bg-gray-200 border border-gray-300 px-2">
                        {" "}
                        {value}{" "}
                      </span>
                      <button
                        className="bg-gray-200 px-2 rounded-sm border disabled:border-red-300 disabled:bg-red-100 disabled:cursor-not-allowed"
                        disabled={value === 9}
                        onClick={() => {
                          if (value < 9) {
                            setValue(value + 1);
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
              <p className="text-sm text-[#000000b0]">{`RS. ${totalPrice.toFixed(1)}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
