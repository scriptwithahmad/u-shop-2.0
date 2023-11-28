import StarRatings from "react-star-ratings";
import { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SingleProduct = ({ data }) => {
  const [loading, setLoading] = useState(false);
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

  // REVIEWS SYSTEMS HERE
  const [reviewData, setReviewData] = useState({
    costomerName: "",
    NoOfreviews: "",
    comment: "",
    createdAt: "",
  });
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(null);
  const [newReviews, setNewReviews] = useState([...data.singleProduct.reviews])

  // input handler
  const inputHandler = (e) => {
    const { value, name } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  // Reviews on Sumbit
  const submitReview = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.put(
        `/api/products/${data.singleProduct.slug}?reviews=POST`,
        reviewData
      );
      const updatedReview = res.data;

      setNewReviews([...newReviews, updatedReview]);

      toast.success("Review Added Successfully!")
      setTimeout(() => {
        window.location.reload()
      }, 2000);

      setReviewData({
        costomerName: "",
        NoOfreviews: "",
        comment: "",
        createdAt: "",
      });
    } catch (error) {
      console.log(error)
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  // SLIDER -----------------
  var settings = {
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: true,
    prevArrow: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          nextArrow: true,
          prevArrow: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 768,
        settings: {
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 425,
        settings: {
          nextArrow: false,
          prevArrow: false,
        },
      },
    ],
  };


  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <i
        id="slickBtnNext"
        style={{ ...style }}
        onClick={onClick}
        className="fa-solid fa-arrow-right-long"
      ></i>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <i
        id="slickBtnPrev"
        style={{ ...style }}
        onClick={onClick}
        className="fa-solid fa-arrow-left-long"
      ></i>
    );
  }

  return (
    <>
      <Toaster />
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
          </div>
        </div>
      </div>

      <div className="flex gap-3 bg-gray-100 rounded-lg max-w-[1200px] m-auto">

        <div className="px-8 py-24 w-1/2">
          <h1 className="mb-4 text-xl font-semibold text-sky-700">Reviews</h1>
          <Slider className="Slider" {...settings}>
            {
              newReviews.map((v, i) => {
                return (
                  <blockquote key={i} className="rounded-lg bg-white border p-6 shadow-sm sm:p-8">
                    <div class="flex items-center gap-4">
                      <img
                        alt="Man"
                        src="https://static.priceoye.pk/images/user-icon.svg"
                        class="h-12 w-12 rounded-full object-cover border"
                      />

                      <div>
                        <p class="mt-0.5 text-sm mb-1 font-medium text-gray-900">
                          {v.costomerName}
                        </p>
                        <div class="flex text-xs gap-0.5 text-sky-600">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star-half"></i>
                        </div>

                        {/* <span>{v.NoOfreviews}</span> */}
                      </div>
                    </div>

                    <p class="mt-4 text-xs text-gray-700">
                      {v.comment}
                    </p>
                  </blockquote>
                )
              })
            }
          </Slider>
        </div>
        {/* REVIEW FORM HERE  */}
        <form
          onSubmit={submitReview}
          className="border bg-white rounded-lg m-auto globalShadow p-4 min-w-[400px] my-8"
        >
          <h1 className="text-sky-700 font-semibold mb-4 text-lg">
            Submit Your Review
          </h1>
          {/* Name */}
          <div className="">
            {/* <label htmlFor="name">Name</label> */}
            <input
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
              // className="hidden"
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
            <button type="submit" className="bg-sky-500 hover:bg-sky-600 rounded-md w-full py-1  text-white">
              {loading ? "Loading..." : "Submit Review"}
            </button>
          </div>
        </form>
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