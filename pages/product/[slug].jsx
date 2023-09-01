import React, { useEffect, useState } from "react";

const SingleProduct = ({ data }) => {
  // console.log(data.singleProduct);
  const [value, setValue] = useState(1);
  const [text, setText] = useState(true);

  const [showBorder, setShowBorder] = useState(false);
  const [totalPrice, setTotalPrice] = useState(data.singleProduct.price);

  const updateTotalPrice = () => {
    const newTotalPrice = data.singleProduct.price * value;
    setTotalPrice(newTotalPrice);
  };

  useEffect(() => {
    updateTotalPrice();
  }, [value]); // Update the total price whenever the quantity changes

  const toggleBorder = () => {
    setShowBorder(!showBorder);
  };
  const toggleText = () => {
    setText(!text);
  };

  const [textLimit, setTextLimit] = useState(data.singleProduct.description.slice(0, 200))


  return (
    <>
      <div className="product-main">
        <div className="product-col-left">
          <div className="productImg">
            <img src={data.singleProduct.avatar} alt="product Image here" />
          </div>
          <div className="product-col-inner">
            {data.singleProduct.images.map((v, i) => {
              return <img key={i} src={v} alt="product Images" />;
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
            <button onClick={toggleText}>
              {text ? "Read More" : "Read Less"}
            </button>
            <div className="contentMain">
              <div className="quantitiyDiv">
                <button
                  className="MinusBtn"
                  disabled={value === 0}
                  onClick={() => {
                    if (value > 0) {
                      setValue(value - 1);
                      updateTotalPrice(); // Update total price when quantity decreases
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
                      updateTotalPrice(); // Update total price when quantity increases
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
            <button className="cartBtn">Add to Cart</button>
          </div>
        </div>
      </div>
      <div className="productDetails">
        <h1>Product Details</h1>
        {textLimit.length === 200 ? (
          <p className="fullDesc">{data.singleProduct.description}</p>
        ) : (
          <p>Nothing in this section.</p>
        )}
      </div>
    </>
  );
};

export default SingleProduct;

export async function getServerSideProps({ params }) {
  const slug = params.slug;
  const res = await fetch(`http://localhost:3000/api/products/${slug}`);
  const data = await res.json();

  return { props: { data } };
}
