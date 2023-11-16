import { CartContext } from "@/context/CartProvider";
import { useState, useEffect, useContext } from "react";

const SingleProduct = ({ data }) => {
  const [value, setValue] = useState(1);
  const [totalPrice, setTotalPrice] = useState(data.singleProduct.price);
  const [activeImage, setActiveImage] = useState(data.singleProduct.avatar);

  const changeMainImage = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const updateTotalPrice = () => {
    const newTotalPrice = data.singleProduct.price * value;
    setTotalPrice(newTotalPrice);
  };

  useEffect(() => {
    updateTotalPrice();
  }, [value]);

   
  // Cart Functionality -----------
  const {addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)  




  return (
    <>
      <div className="product-main">
        <div className="product-col-left">
          <div className="productImg">
            <img src={activeImage} alt="product Image here" />
          </div>
          <div className="product-col-inner">
            {data.singleProduct.images.map((v, i) => {
              return (
                <img
                  key={i}
                  src={v}
                  alt="product Images"
                  onClick={() => changeMainImage(v)}
                  className={v === activeImage ? "active" : ""}
                />
              );
            })}
          </div>
        </div>
        <div className="product-col-right">
          <div className="col-right-info">
            <h2 className="brand">{data.singleProduct.category}</h2>
            <h1 className="name">{data.singleProduct.name}</h1>
            <span className="price">Rs. {data.singleProduct.price}</span>
            <p className="desc">
              {data.singleProduct.description.slice(0, 200) + "..."}
            </p>
            <div className="contentMain">
              <div className="quantitiyDiv">
                <button
                  className="MinusBtn"
                  disabled={value === 0}
                  onClick={() => {
                    if (value > 0) {
                      setValue(value - 1);
                      updateTotalPrice();
                    }
                  }}
                >
                  -
                </button>
                <span> {value} </span>
                <button
                  className="PlusBtn"
                  disabled={value === 9}
                  onClick={() => {
                    if (value < 9) {
                      setValue(value + 1);
                      updateTotalPrice();
                    }
                  }}
                >
                  +
                </button>
              </div>
              <div className="priceInfoCard">
                <div className="card">
                  <h2>Actual Price</h2>
                  <span>29,999</span>
                </div>
                <div className="card">
                  <h2>Discount Price</h2>
                  <span>Not Available</span>
                </div>
                {/* Display the updated total price */}
                <div className="card card3">
                  <h2>Total Price</h2>
                  <span>{totalPrice}</span>
                </div>
              </div>
            </div>
            <button className="cartBtn" onClick={() => addToCart(data.singleProduct)}>Add to Cart</button>
            <button className="cartBtn" onClick={() => {removeFromCart(data.singleProduct)}}>Remove From Cart</button>
            <button className="cartBtn" onClick={() => {clearCart()}}>Clear Cart</button>
            <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;

export async function getServerSideProps({ params }) {
  const slug = params.slug;
  const res = await fetch(
    `https://e-commerce-frontend-zeta.vercel.app/api/products/${slug}`
  );
  const data = await res.json();

  return { props: { data } };
}
