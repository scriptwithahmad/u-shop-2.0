import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      id="slickBtnNext"
      className={className}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      id="slickBtnPrev"
      className={className}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

const Header = () => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          nextArrow: false,
          prevArrow: false,
        }
      }
    ]
  };
  return (
    <>
      <Slider className="Slider" {...settings}>
        <div className="headerImageDiv">
          <img
            src="https://images.priceoye.pk/banners/pakistan-priceoye-slider-sbz4c.jpg"
            alt=""
          />
        </div>
        <div className="headerImageDiv">
          <img
            src="	https://images.priceoye.pk/banners/pakistan-priceoye-slider-p93sw.jpg"
            alt=""
          />
        </div>
        <div className="headerImageDiv">
          <img
            src="https://images.priceoye.pk/banners/pakistan-priceoye-slider-8g2l9.jpg"
            alt=""
          />
        </div>
        <div className="headerImageDiv">
          <img
            src="https://images.priceoye.pk/banners/pakistan-priceoye-slider-rx1r8.jpg"
            alt=""
          />
        </div>
        <div className="headerImageDiv">
          <img
            src="	https://images.priceoye.pk/banners/pakistan-priceoye-slider-9z2jh.jpg"
            alt=""
          />
        </div>
        <div className="headerImageDiv">
          <img
            src="	https://images.priceoye.pk/banners/pakistan-priceoye-slider-ue36y.jpg"
            alt=""
          />
        </div>
      </Slider>
    </>
  );
};

export default Header;
