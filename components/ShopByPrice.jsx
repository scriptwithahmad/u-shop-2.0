import React from "react";

const ShopByPrice = () => {
  return (
    <>
      <h3 className="globalTitle">Shop By Price</h3>
      <div className="shopByPriceBtn">
        <button className="myBtn">Below Rs. 10,000</button>
        <button className="myBtn">Rs. 10,000 - Rs 20,000</button>
        <button className="myBtn">Rs. 20,000 - Rs 30,000</button>
        <button className="myBtn">Rs. 30,000 - Rs 40,000</button>
        <button className="myBtn">Rs. 40,000 - Rs 50,000</button>
        <button className="myBtn">Rs. 50,000 - Rs 70,000</button>
        <button className="myBtn">Rs. 70,000 - Rs 90,000</button>
        <button className="myBtn">Above Rs.90,000</button>
      </div>
      <h3 className="globalTitle">Shop By Price</h3>
      <div className="shopByBrand">
        <div className="shopByBrandBtn">
          <div className="brandDiv">
            <img
              src="https://static.priceoye.pk/images/brands/svg/samsung.svg "
              alt=""
            />
            <p>Samsung</p>
          </div>
          <div className="brandDiv">
            <img
              src="https://static.priceoye.pk/images/brands/svg/oppo.svg"
              alt=""
            />
            <p>Oppo</p>
          </div>
          <div className="brandDiv">
            <img
              src="https://static.priceoye.pk/images/brands/svg/xiaomi.svg"
              alt=""
            />
            <p>Xiaomi</p>
          </div>
          <div className="brandDiv">
            <img
              src="	https://static.priceoye.pk/images/brands/svg/vivo.svg"
              alt=""
            />
            <p>Vivo</p>
          </div>
          <div className="brandDiv">
            <img
              src="https://static.priceoye.pk/images/brands/svg/tecno.svg"
              alt=""
            />
            <p>Tecno</p>
          </div>
          <div className="brandDiv">
            <img
              src="https://static.priceoye.pk/images/brands/svg/realme.svg"
              alt=""
            />
            <p>Realme</p>
          </div>
          <div className="brandDiv">
            <img
              src="	https://static.priceoye.pk/images/brands/svg/itel.svg"
              alt=""
            />
            <p>Itel</p>
          </div>
          <div className="brandDiv">
            <img
              src="https://static.priceoye.pk/images/brands/svg/apple.svg"
              alt=""
            />
            <p>Apple</p>
          </div>
          <div className="brandDiv">
            <img
              src="https://static.priceoye.pk/images/brands/svg/nokia.svg"
              alt=""
            />
            <p>Nokia</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopByPrice;
