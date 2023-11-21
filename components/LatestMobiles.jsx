import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

const LatestMobiles = ({ props }) => {
  const AllProductsData = props.ProductData;

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    centerMode: true,
    autoplay: true,
    speed: 3000,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
          autoplay: true,
          speed: 2000,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          slidesToScroll: 1,
          dots: false,
          autoplay: true,
          speed: 2000,
        },
      },
    ],
  };

  return (
    <>
      <div className="flex justify-between max-w-[1200px] m-auto my-6 px-2 lg:px-0">
        <h2 className="text-lg font-semibold text-blue-600">Latest Mobiles</h2>
        <Link href="/categories" className="text-gray-600 hover:text-gray-900 cursor-pointer">View All</Link>
      </div>

      {AllProductsData?.length === 0 ? (
        <p>No products have been uploaded yet.</p>
      ) : (
        <Slider className="main-cards" {...settings}>
          {AllProductsData?.map((v) => {
            return (
              <div key={v.id} className="slide-card">
                <div className="card md:border-none border">
                  <div className="imgDiv">
                    <img src={v.avatar} alt="" />
                  </div>
                  <div className="card-info">
                    <Link href={`/product/${v.slug}`}>
                      <h3 className="card-title">{v.name}</h3>
                    </Link>
                    <p>Rs. {v.price}</p>
                    <span>{v.category}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      )}
    </>
  );
};

export default LatestMobiles;
