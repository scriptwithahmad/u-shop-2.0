import { useEffect } from "react";

const ShopingCart = ({ setShowCart }) => {
  useEffect(() => {
    const layer = document.querySelector(".opacity-layer");
    const body = document.body

    body.addEventListener('scroll', function () {
      body.classList.add("scroll");
    })
    
  }, []);
  return (
    <>
      <div
        onClick={() => setShowCart(false)}
        className="opacity-layer z-[10] overflow-hidden absolute top-0 left-0 h-screen w-full bg-[#000e]"
      ></div>
      <div className="cart-main-com">
        <div className="cart-head">
          <h1>Shopping Cart</h1>
          <i onClick={() => setShowCart(false)} class="fa-solid fa-xmark"></i>
        </div>
        <div className="cart-items">
          <img
            src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1693159317/blog-image/dcode-cygnal-2-pro-pakistan-priceoye-ick7a-270x270_fkyuxi.webp"
            alt=""
          />
          <div className="cart-info">
            <h2 className="cart-heading">Sumsung Dany Smaprt Phone</h2>
            <i class="opacity-70 hover:opacity-100 cursor-pointer fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="cart-items">
          <img
            src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1693159317/blog-image/dcode-cygnal-2-pro-pakistan-priceoye-ick7a-270x270_fkyuxi.webp"
            alt=""
          />
          <div className="cart-info">
            <h2 className="cart-heading">Sumsung Dany Smaprt Phone</h2>
            <i class="opacity-70 hover:opacity-100 cursor-pointer fa-solid fa-xmark"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopingCart;
