import Image from "next/image";
import Slider from "react-slick";
import { Rating } from "primereact/rating";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  // adding slider to the team reviews
  var settings = {
    infinite: true,
    arrows: false,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    pauseOnHover: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  // adding user data for the reviews
  const Data = [
    {
      rating: 5,
      name: "John Doe",
      desgnation: "Designation",
      img: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png",
      revs: "I recently bought a laptop from this e-commerce store, and it was fantastic! The product matched the description perfectly, and the delivery was incredibly fast. I highly recommend this site",
    },
    {
      rating: 5,
      name: "Jane Smith",
      desgnation: "Designation",
      img: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png",
      revs: "The quality of the products on this e-commerce platform is outstanding. I've made multiple purchases, and each time, the items exceeded my expectations. Great value for money",
    },
    {
      rating: 5,
      desgnation: "Designation",
      name: "Alex Johnson",
      img: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png",
      revs: "Seamless shopping, user-friendly website. Top-notch customer service. Reliable e-commerce destination.",
    },
    {
      rating: 5,
      desgnation: "Designation",
      name: "Emily Rodriguez",
      img: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png",
      revs: "Loyal customer for years. Extensive product range, competitive prices. Quick delivery, hassle-free returns.",
    },
    {
      rating: 5,
      desgnation: "Designation",
      name: "Daniel Chang",
      img: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png",
      revs: "Impressed with unique products. Easy navigation, informative customer reviews. Go-to online shopping destination.",
    },
  ];

  return (
    <>
      <div id="review" className="max-w-[1250px] m-auto">
        <Slider {...settings}>
          {Data.map((v, i) => {
            return (
              <div key={i} className="py-12 px-5 md:px-0">
                <div className="flex md:flex-row flex-col bg-white globalShadow md:shadow-none px-2 md:px-4 py-4 md:py-8 md:p-0 rounded-lg md:rounded-none overflow-hidden">
                  <div className=" w-full relative z-50 flex flex-row md:flex-col justify-between md:justify-center bg-white px-2 md:px-4 pr-2 md:pr-12 rounded-lg shadow-none md:shadow-lg hover:shadow-2xl transition-all">
                    <img
                      src="/qoute.png"
                      placeholder="Qoute Image Here"
                      className=" absolute -bottom-12 md:bottom-[40%] left-1/4 md:left-1 -z-10 opacity-[0.025] w-full"
                    />
                    <div className=" md:mb-3 mb-2">
                      <h2 className=" font-semibold text-xl text-slate-800 mb-1">
                        {v.name}
                      </h2>
                      <span className="text-xs text-gray-500 border-b py-2 w-fit">
                        Web Developer
                      </span>
                    </div>
                    <div>
                      <Rating
                        disabled
                        value={v.rating}
                        cancel={false}
                        className="text-orange-400 mt-1"
                      />
                    </div>
                  </div>
                  <div className=" relative top-0 left-0 md:-left-12 flex items-center flex-row z-50 mt-4 md:mt-0 px-2 md:px-0 gap-3 md:gap-0">
                    <img
                      alt="image here"
                      className=" h-[50px] w-[15%] md:w-full md:h-[70%] object-cover md:rounded-lg rounded-full"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq2lidOY4xtl4mU06Cqqd0QF1zgFBQ98HJ8w&usqp=CAU"
                    />
                    <span className=" w-[90%] md:w-full text-gray-500 text-xs pl-0 md:pl-3 md:line-clamp-3 line-clamp-2">
                      {v.revs}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default Testimonials;
