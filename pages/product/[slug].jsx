import StarRatings from "react-star-ratings";
import { CartContext } from "@/context/CartProvider";
import { useState, useEffect, useContext } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import axios from "axios";

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
  const {
    cartItems,
    addToCart,
    clearCart,
    decreaseItemQuantity,
    RemoveSpecificItemFromCart,
  } = useContext(CartContext);

  // REVIEWS SYSTEMS HERE
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(null);
  const [reviewData, setReviewData] = useState({
    costomerName: "",
    NoOfreviews: "",
    comment: "",
    createdAt: "",
  });
  const [newReviews, setNewReviews] = useState([...data.singleProduct.reviews]);

  // input handler
  const inputHandler = (e) => {
    const { value, name } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  // Reviews on Sumbit
  const submitReview = async (e) => {
    console.log(e)
    e.preventDefault();

    try {
      const res = await axios.put(
        `/api/products/${data.singleProduct.slug}?reviews=POST`,
        reviewData
      );

      setNewReviews([...newReviews, reviewData]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* SLUG PAGE HERE  */}
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
                  <span> {data.singleProduct.price} </span>
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
            <button
              className="cartBtn"
              onClick={() => addToCart(data.singleProduct)}
            >
              Add to Cart
            </button>
            <button
              className="cartBtn"
              onClick={() => {
                decreaseItemQuantity(data.singleProduct);
              }}
            >
              Remove From Cart
            </button>
            <button
              className="cartBtn"
              onClick={() => {
                clearCart();
              }}
            >
              Clear Cart
            </button>
            <button
              className="cartBtn"
              onClick={() => RemoveSpecificItemFromCart(data.singleProduct._id)}
            >
              Remove
            </button>
            {/* <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1> */}
          </div>
        </div>
      </div>

      {/* REVIEW FORM HERE  */}
      <form
        onSubmit={submitReview}
        method="POST"
        className="border max-w-[400px] rounded-lg m-auto globalShadow p-4"
      >
        <h1 className="text-blue-400 font-medium mb-4 text-lg">
          Submit Your Review
        </h1>
        {/* Name */}
        <div className="">
          {/* <label htmlFor="name">Name</label> */}
          <input
            required
            id="name"
            name="costomerName"
            placeholder="Your Name"
            onChange={inputHandler}
            value={reviewData.costomerName}
            className="text-sm font-light border w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          />
        </div>

        {/* Ratings ---------------- */}
        <div className="my-3">
          <p className=" text-gray-700 font-medium text-sm mb-2">
            Your Ratings
          </p>
          {/* NoOfreviews -----------*/}
          <div className="">
            {/* <label htmlFor="NoOfReviews">No Of Reviews</label> */}
            <input
              type="number"
              name="NoOfreviews"
              onChange={inputHandler}
              value={reviewData.NoOfreviews}
              placeholder="Stars Ratings"
              min="1"
              id="NoOfReviews"
              max="5"
              required
              className="hidden"
            />
          </div>
          <div>
            {[...Array(5)]?.map((star, index) => {
              const currentRating = index + 1;

              return (
                <label>
                  <FaStar
                    className="fa-regular fa-star cursor-pointer"
                    size={20}
                    color={
                      currentRating <= (hover || rating)
                        ? "rgb(230, 67, 47)"
                        : "#c8c8c8"
                    }
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  />
                  <input
                    type="radio"
                    className="hidden"
                    name="NoOfreviews"
                    onClick={() => setRating(currentRating)}
                    value={reviewData.NoOfreviews}
                  />
                </label>
              );
            })}
          </div>
        </div>
        {/* Comment -------------*/}
        <div className="reviewtextarea reviewsInput">
          {/* <label htmlFor="comment">Comment</label> */}
          <textarea
            rows="3"
            cols="30"
            id="comment"
            name="comment"
            placeholder="Comment"
            onChange={inputHandler}
            value={reviewData.comment}
            className="text-sm font-light border w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          ></textarea>
        </div>

        <div className="my-2">
          <button className="bg-sky-500 hover:bg-sky-600 rounded-md w-full py-1  text-white">
            Submit Review
          </button>
        </div>
      </form>
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
