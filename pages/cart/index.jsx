import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  const [newItems, setNewItems] = useState(null)
  const { newItem } = router.query;
  const parsedItems = newItem ? [JSON.parse(decodeURIComponent(newItem))] : [];
  console.log(parsedItems)

  useEffect(() => {
    const storeItems = localStorage.getItem('newItems')
    if(storeItems){
      setNewItems(JSON.parse(storeItems))
    }
  },[])

  return (
    <div className="cartMain">
      <h2 className="text-blue-600 py-8 text-3xl font-bold">Shopping Cart</h2>
      <div className="cartInner">
        <div className="leftSide">
          {parsedItems.map((v,i) => {
            return (
              <div key={i} className="cartSubInner">
                <div className="cartImgDiv">
                  <img className="p-8" src={v.avatar} alt="img here" />
                </div>
                <div className="infoMain">
                  <div className="info">
                    <h2 className="text-blue-900 text-base mb-2">{v.name}</h2>
                    <h3 className="text-[#0000008e] text-xs mb-2">{v.color}</h3>
                    <p className="text-[#000000d7] text-sm mb-1">RS. {v.price}</p>
                    <p className="text-[#000000d7] text-sm">Color: Light Green</p>
                  </div>
                  <div>
                    <i class="text-green-600 text-sm fa-solid fa-check"></i>
                    <span className="ml-3 text-sm">{v.quantity}</span>
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
              <h1 className="text-sm text-[#000000b0]">Order Total</h1>
              <p className="text-sm text-[#000000b0]">RS. 112.32</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
