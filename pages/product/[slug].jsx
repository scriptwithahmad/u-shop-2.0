import axios from "axios";
import { Rating } from "primereact/rating";
import { Toaster, toast } from "react-hot-toast";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { TabView, TabPanel } from "primereact/tabview";
import { useState, useEffect, useContext } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from "@/context/CartProvider";

const SingleProduct = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(1);
  const [totalPrice, setTotalPrice] = useState(data.singleProduct.price);
  const [activeImage, setActiveImage] = useState(data.singleProduct.images[0]);
  const { addToCart } = useContext(CartContext);
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

  // REVIEWS SYSTEMS HERE ======================================/
  const [reviewData, setReviewData] = useState({
    costomerName: "",
    NoOfreviews: "",
    comment: "",
    createdAt: "",
  });
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(0);
  const [newReviews, setNewReviews] = useState([...data.singleProduct.reviews]);

  // input handler =============================================/
  const inputHandler = (e) => {
    const { value, name } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const onStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  // Reviews on Sumbit =========================================/
  const submitReview = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.put(
        `/api/products/${data.singleProduct.slug}?reviews=POST`,
        { ...reviewData, NoOfreviews: rating }
      );
      const updatedReview = res.data;

      setNewReviews([...newReviews, updatedReview]);

      toast.success("Review Added Successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);

      setReviewData({
        costomerName: "",
        NoOfreviews: "",
        comment: "",
        createdAt: "",
      });
      setRating(0);
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  // SLIDER ====================================================/
  var settings = {
    infinite: true,
    autoplay: true,
    vertical: true,
    speed: 2000,
    autoplaySpeed: 4000,
    slidesToShow: 4,
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
          slidesToShow: 2,
          centerMode: true,
          vertical: false,
          nextArrow: true,
          prevArrow: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          vertical: false,
          nextArrow: true,
          prevArrow: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
    ],
  };

  // SLIDER OF Product Images ===================================/
  const settings2 = {
    speed: 2000,
    autoplay: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    autoplaySpeed: 1000,
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
          slidesToShow: 2,
          vertical: true,
          verticalSwiping: true,
          nextArrow: true,
          prevArrow: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
    ],
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <i
        id="slickBtnNextReview"
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
        id="slickBtnPrevReview"
        style={{ ...style }}
        onClick={onClick}
        className="fa-solid fa-arrow-left-long"
      ></i>
    );
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {/* Single PAGE HERE ---------------------------------- */}
      <div className="product-main">
        <div className="product-col-left">
          <div className="productImg border">
            <img src={activeImage} alt="product Image here" />
          </div>

          <div className="product-col-inner h-full w-[150px]">
            {data.singleProduct.images.length >= 5 ? (
              <Slider className="h-full w-full" {...settings}>
                {data.singleProduct.images.map((v, i) => {
                  return (
                    <img
                      key={i}
                      src={v}
                      alt="product Images"
                      onClick={() => changeMainImage(v)}
                      className={
                        v === activeImage
                          ? "border border-sky-300 bg-gray-100"
                          : "border hover:bg-gray-50 hover:border-sky-200"
                      }
                    />
                  );
                })}
              </Slider>
            ) : (
              <div className="h-full w-full">
                {data.singleProduct.images.map((v, i) => {
                  return (
                    <img
                      key={i}
                      src={v}
                      alt="product Images"
                      onClick={() => changeMainImage(v)}
                      className={
                        v === activeImage
                          ? "border border-sky-300 bg-gray-100"
                          : "border hover:bg-gray-50 hover:border-sky-200"
                      }
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="product-col-right">
          <div className="col-right-info">
            <h2 className="text-xs lg:text-sm text-slate-500">
              {data.singleProduct.category}
            </h2>
            <h1 className=" text-xl lg:text-[28px] my-3 font-semibold text-slate-700">
              {data.singleProduct.name}
            </h1>
            <span className=" text-sm lg:text-xl text-gray-700 line-clamp-1 font-medium">
              Rs. {data.singleProduct.price}
            </span>
            <p className="text-gray-500 text-[13px] lg:text-sm mt-4 mb-8 text-justify">
              {data.singleProduct.description.slice(0, 200) + "..."}
            </p>
            <div className=" flex items-center gap-4 my-4">
              <div className="border rounded-full w-fit px-8 lg:px-9 flex items-center justify-center py-1 lg:py-2 gap-4">
                <span className=" text-gray-500 text-xl w-[20px]">{value}</span>
                <div className="flex flex-col">
                  <button
                    disabled={value === 9}
                    onClick={() => {
                      if (value < 9) {
                        setValue(value + 1);
                        updateTotalPrice();
                      }
                    }}
                  >
                    <i className="fa-solid fa-angle-up text-gray-500 text-xs block"></i>
                  </button>
                  <button
                    disabled={value === 1}
                    onClick={() => {
                      if (value > 0) {
                        setValue(value - 1);
                        updateTotalPrice();
                      }
                    }}
                  >
                    <i className="fa-solid fa-angle-down text-gray-500 text-xs block"></i>
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  addToCart(data.singleProduct);
                  toast.success("Add To Cart Successfully 😍");
                }}
                className="px-8 lg:px-10 py-3 lg:py-4 text-white text-sm bg-gray-700 rounded-full hover:bg-slate-800"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs here  ----------------------------------------- */}
      <div className="border max-w-[1200px] m-auto p-4 rounded-lg my-16">
        <TabView>
          <TabPanel header="Description" className="mb-4 mr-4">
            <p className="m-0 text-slate-500 text-xs leading-5 lg:text-sm">
              {data.singleProduct.description}
            </p>
          </TabPanel>
          <TabPanel header="Review" className="mb-4 mr-4">
            <div className="flex flex-col w-full lg:flex-row md:flex-col gap-3 my-8 bg-gray-100 rounded-lg max-w-[1200px] m-auto">
              <div className="px-8 py-24 w-full lg:w-1/2 md:w-full">
                <h1 className="mb-4 text-xl font-semibold text-sky-700">
                  Reviews
                </h1>
                <Slider className="Slider" {...settings2}>
                  {newReviews.map((v, i) => {
                    return (
                      <blockquote
                        key={i}
                        className="rounded-lg bg-white border p-6 shadow-sm sm:p-8 h-40 max-h-full"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            alt="Man"
                            src="https://static.priceoye.pk/images/user-icon.svg"
                            className="h-12 w-12 rounded-full object-cover border"
                          />

                          <div>
                            <p className="mt-0.5 text-sm mb-1 font-medium text-gray-900">
                              {v.costomerName}
                            </p>
                            <div className="flex text-xs gap-0.5 text-sky-600">
                              <Rating
                                value={v.NoOfreviews}
                                readOnly
                                cancel={false}
                              />
                            </div>

                            {/* <span>{v.NoOfreviews}</span> */}
                          </div>
                        </div>

                        <p className="mt-4 text-xs text-gray-700">
                          {v.comment}
                        </p>
                      </blockquote>
                    );
                  })}
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  />
                </div>

                {/* Ratings ---------------- */}
                <div className="my-3">
                  {/* NoOfreviews -----------*/}
                  <div className="flex flex-col">
                    <label
                      htmlFor="NoOfReviews"
                      className="text-gray-600 font-medium text-sm mb-2"
                    >
                      Your Ratings
                    </label>
                    <input
                      type="number"
                      name="NoOfreviews"
                      onChange={inputHandler}
                      value={rating}
                      placeholder="Stars Ratings"
                      min="1"
                      id="NoOfReviews"
                      max="5"
                      className="hidden"
                    />
                  </div>
                  <div>
                    {[...Array(5)]?.map((star, index) => {
                      const currentRating = index + 1;

                      return (
                        <label key={index}>
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
                            onClick={() => onStarClick(currentRating)}
                          />
                          <input
                            type="radio"
                            className="hidden"
                            name="NoOfreviews"
                            value={currentRating}
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
                {/* Comment -------------*/}
                <div className="reviewtextarea reviewsInput">
                  {/* <label
                    className="text-gray-700 font-medium text-sm mb-2"
                    htmlFor="comment"
                  >
                    Your Comment
                  </label> */}
                  <textarea
                    rows="3"
                    cols="30"
                    id="comment"
                    name="comment"
                    placeholder="Write Comment"
                    onChange={inputHandler}
                    value={reviewData.comment}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>

                <div className="my-2">
                  <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-600 rounded-md w-full py-1  text-white"
                  >
                    {loading ? "Loading..." : "Submit Review"}
                  </button>
                </div>
              </form>
            </div>
          </TabPanel>
          <TabPanel header="Price" className="mb-4 mr-4">
            <p className="m-0">03 here</p>
          </TabPanel>
        </TabView>
      </div>
    </>
  );
};

export default SingleProduct;

export async function getServerSideProps({ params }) {
  const slug = params.slug;
  const res = await fetch(
    `https://u-shop-liart.vercel.app/api/products/${slug}`
  );
  const data = await res.json();

  return { props: { data } };
}
