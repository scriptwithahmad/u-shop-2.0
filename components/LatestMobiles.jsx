import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LatestMobiles = () => {
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
                src="https://images.priceoye.pk/infinix-hot-12i-pakistan-priceoye-9ga0s-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Infinix Hot 12</h3>
              <p>Rs. 1,149</p>
              <span className="cutPrice">Rs. 2,499</span>
              <span>54% OFF</span>
            </div>
          </div>
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/infinix-hot-12i-pakistan-priceoye-9ga0s-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Infinix Hot 12</h3>
              <p>Rs. 1,149</p>
              <span className="cutPrice">Rs. 2,499</span>
              <span>54% OFF</span>
            </div>
          </div>
        </div>
        <div className="slide-card">
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/infinix-hot-12i-pakistan-priceoye-9ga0s-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Infinix Hot 12</h3>
              <p>Rs. 1,149</p>
              <span className="cutPrice">Rs. 2,499</span>
              <span>54% OFF</span>
            </div>
          </div>
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/infinix-hot-12i-pakistan-priceoye-9ga0s-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Infinix Hot 12</h3>
              <p>Rs. 1,149</p>
              <span className="cutPrice">Rs. 2,499</span>
              <span>54% OFF</span>
            </div>
          </div>
        </div>
        <div className="slide-card">
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/infinix-hot-12i-pakistan-priceoye-9ga0s-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Infinix Hot 12</h3>
              <p>Rs. 1,149</p>
              <span className="cutPrice">Rs. 2,499</span>
              <span>54% OFF</span>
            </div>
          </div>
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/infinix-hot-12i-pakistan-priceoye-9ga0s-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Infinix Hot 12</h3>
              <p>Rs. 1,149</p>
              <span className="cutPrice">Rs. 2,499</span>
              <span>54% OFF</span>
            </div>
          </div>
        </div>
        <div className="slide-card">
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/infinix-hot-12i-pakistan-priceoye-9ga0s-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Infinix Hot 12</h3>
              <p>Rs. 1,149</p>
              <span className="cutPrice">Rs. 2,499</span>
              <span>54% OFF</span>
            </div>
          </div>
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/infinix-hot-12i-pakistan-priceoye-9ga0s-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Infinix Hot 12</h3>
              <p>Rs. 1,149</p>
              <span className="cutPrice">Rs. 2,499</span>
              <span>54% OFF</span>
            </div>
          </div>
        </div>
        <div className="slide-card">
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/infinix-hot-12i-pakistan-priceoye-9ga0s-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Infinix Hot 12</h3>
              <p>Rs. 1,149</p>
              <span className="cutPrice">Rs. 2,499</span>
              <span>54% OFF</span>
            </div>
          </div>
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/infinix-hot-12i-pakistan-priceoye-9ga0s-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Infinix Hot 12</h3>
              <p>Rs. 1,149</p>
              <span className="cutPrice">Rs. 2,499</span>
              <span>54% OFF</span>
            </div>
          </div>
        </div>
        <div className="slide-card">
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/infinix-hot-12i-pakistan-priceoye-9ga0s-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Infinix Hot 12</h3>
              <p>Rs. 1,149</p>
              <span className="cutPrice">Rs. 2,499</span>
              <span>54% OFF</span>
            </div>
          </div>
          <div className="card">
            <div className="imgDiv">
              <img
                src="https://images.priceoye.pk/infinix-hot-12i-pakistan-priceoye-9ga0s-270x270.webp"
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>Infinix Hot 12</h3>
              <p>Rs. 1,149</p>
              <span className="cutPrice">Rs. 2,499</span>
              <span>54% OFF</span>
            </div>
          </div>
        </div>
      </Slider>
    </>
  );
};

export default LatestMobiles;
