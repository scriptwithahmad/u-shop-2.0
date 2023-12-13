import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

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

const Header = () => {
  var settings = {
    infinite: true,
    fade: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    slidesToShow: 1,
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

  return (
    <>
      <div className=" overflow-hidden min-h-[90vh] relative">
        <Slider className="Slider" {...settings}>
          <div className="headerImageDiv2 px-2 md:px-12 2xl:px-0">
            <div className="flex flex-col justify-center max-w-[1200px] m-auto h-full">
              <span className="text-orange-600 mb-5 text-sm">
                WINTER COLLECTION
              </span>
              <h1 className="text-4xl mb-3 leading-snug text-slate-700 font-semibold tracking-wide lg:max-w-[55%] w-full">
                Fall - Winter Collections 2030
              </h1>
              <p className="text-[#3d3d3d] mb-4 text-sm font-light lg:max-w-[45%] w-full leading-6">
                A specialist label creating luxury essentials. Ethically crafted
                with an unwavering commitment to exceptional quality.
              </p>
              <Link
                href={"/categories"}
                className="w-fit rounded-full z-40 group flex items-center gap-3 px-5 py-[10px] bg-slate-600 hover:bg-slate-800 text-white"
              >
                Shop Now{" "}
                <i className="fa-solid fa-arrow-right-long cursor-pointer z-50 group-hover:translate-x-1 transition-all duration-300 asideAnimate"></i>
              </Link>
            </div>
          </div>
          <div className="headerImageDiv px-2 md:px-12 2xl:px-0">
            <div className="flex flex-col justify-center max-w-[1200px] m-auto h-full">
              <span className="text-orange-600 mb-5 text-sm">
                SUMMER COLLECTION
              </span>
              <h1 className="text-4xl mb-3 leading-snug text-slate-700 font-semibold tracking-wide lg:max-w-[55%] w-full">
                Fall - Winter Collections 2030
              </h1>
              <p className="text-[#3d3d3d] mb-4 text-sm font-light lg:max-w-[45%] w-full leading-6">
                A specialist label creating luxury essentials. Ethically crafted
                with an unwavering commitment to exceptional quality.
              </p>
              <Link
                href={"/categories"}
                className="w-fit rounded-full  group flex items-center gap-3 px-5 py-[10px] bg-slate-600 hover:bg-slate-800 text-white"
              >
                Shop Now{" "}
                <i className="fa-solid fa-arrow-right-long cursor-pointer z-50 group-hover:translate-x-1 transition-all duration-300 asideAnimate"></i>
              </Link>
            </div>
          </div>
        </Slider>
        <div className="absolute -bottom-1/2 -translate-x-1/2 bg-gradient-to-tr from-blue-300 to-green-300 blur-3xl opacity-20 h-[700px] w-[700px] rounded-full"></div>
      </div>
    </>
  );
};

export default Header;
