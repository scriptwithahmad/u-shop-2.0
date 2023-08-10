import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LatestTablets = () => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <>
      <div className="productHeader">
        <h2>Latest Mobiles</h2>
        <span>View All</span>
      </div>

      <Slider className="main-cards" {...settings}>
        <div className="slide-card">
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/samsung-galaxy-tab-s8-x700-pakistan-priceoye-ay60g-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Samsung Galaxy Tab S8 (X700) </h3>
              <p>Rs. 176,499</p>
              <span className="cutPrice">Rs. 184,999</span>
              <span>5% OFF</span>
            </div>
          </div>
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/samsung-galaxy-tab-s8-x700-pakistan-priceoye-ay60g-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Samsung Galaxy Tab S8 (X700) </h3>
              <p>Rs. 176,499</p>
              <span className="cutPrice">Rs. 184,999</span>
              <span>5% OFF</span>
            </div>
          </div>
        </div>
        <div className="slide-card">
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/samsung-galaxy-tab-s8-x700-pakistan-priceoye-ay60g-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Samsung Galaxy Tab S8 (X700) </h3>
              <p>Rs. 176,499</p>
              <span className="cutPrice">Rs. 184,999</span>
              <span>5% OFF</span>
            </div>
          </div>
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/samsung-galaxy-tab-s8-x700-pakistan-priceoye-ay60g-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Samsung Galaxy Tab S8 (X700) </h3>
              <p>Rs. 176,499</p>
              <span className="cutPrice">Rs. 184,999</span>
              <span>5% OFF</span>
            </div>
          </div>
        </div>
        <div className="slide-card">
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/samsung-galaxy-tab-s8-x700-pakistan-priceoye-ay60g-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Samsung Galaxy Tab S8 (X700) </h3>
              <p>Rs. 176,499</p>
              <span className="cutPrice">Rs. 184,999</span>
              <span>5% OFF</span>
            </div>
          </div>
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/samsung-galaxy-tab-s8-x700-pakistan-priceoye-ay60g-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Samsung Galaxy Tab S8 (X700) </h3>
              <p>Rs. 176,499</p>
              <span className="cutPrice">Rs. 184,999</span>
              <span>5% OFF</span>
            </div>
          </div>
        </div>
        <div className="slide-card">
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/samsung-galaxy-tab-s8-x700-pakistan-priceoye-ay60g-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Samsung Galaxy Tab S8 (X700) </h3>
              <p>Rs. 176,499</p>
              <span className="cutPrice">Rs. 184,999</span>
              <span>5% OFF</span>
            </div>
          </div>
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/samsung-galaxy-tab-s8-x700-pakistan-priceoye-ay60g-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Samsung Galaxy Tab S8 (X700) </h3>
              <p>Rs. 176,499</p>
              <span className="cutPrice">Rs. 184,999</span>
              <span>5% OFF</span>
            </div>
          </div>
        </div>
        <div className="slide-card">
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/samsung-galaxy-tab-s8-x700-pakistan-priceoye-ay60g-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Samsung Galaxy Tab S8 (X700) </h3>
              <p>Rs. 176,499</p>
              <span className="cutPrice">Rs. 184,999</span>
              <span>5% OFF</span>
            </div>
          </div>
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/samsung-galaxy-tab-s8-x700-pakistan-priceoye-ay60g-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Samsung Galaxy Tab S8 (X700) </h3>
              <p>Rs. 176,499</p>
              <span className="cutPrice">Rs. 184,999</span>
              <span>5% OFF</span>
            </div>
          </div>
        </div>
        <div className="slide-card">
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/samsung-galaxy-tab-s8-x700-pakistan-priceoye-ay60g-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Samsung Galaxy Tab S8 (X700) </h3>
              <p>Rs. 176,499</p>
              <span className="cutPrice">Rs. 184,999</span>
              <span>5% OFF</span>
            </div>
          </div>
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/samsung-galaxy-tab-s8-x700-pakistan-priceoye-ay60g-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Samsung Galaxy Tab S8 (X700) </h3>
              <p>Rs. 176,499</p>
              <span className="cutPrice">Rs. 184,999</span>
              <span>5% OFF</span>
            </div>
          </div>
        </div>
      </Slider>
    </>
  );
};

export default LatestTablets;
