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
      name: "John Doe",
      img: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png",
      revs: "Edify feels like a big family where everyone is welcome. They don't just talk about diversity; they live it. Working here is like being part of a colorful puzzle where each piece matters and adds to the bigger picture.",
      rating: 5,
      desgnation: "Designation",
    },
    {
      name: "Jane Smith",
      img: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png",
      revs: "Edify isn't just a workplace; it's a place that cares about you as a person. They encourage you to bring your true self to work, and that's pretty cool. It's not about fitting into a mold; it's about adding your unique flavor to the mix.",
      rating: 5,
      desgnation: "Designation",
    },
    {
      name: "Alex Johnson",
      img: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png",
      revs: "At Edify, every day is a chance to learn and grow. The bosses aren't just bosses; they're mentors who want to see you succeed. It's like having a bunch of cheerleaders at work, and that makes the whole journey more exciting.",
      rating: 5,
      desgnation: "Designation",
    },
    {
      name: "Emily Rodriguez",
      img: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png",
      revs: "Edify is not just about making money, it's about making a difference. They're all about giving back to the community, and that makes me proud to be part of the team. It's more than just a job; it's about making a positive impact.",
      rating: 5,
      desgnation: "Designation",
    },
    {
      name: "Daniel Chang",
      img: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png",
      revs: "The team spirit here is infectious, and celebrating victories – big or small – is a regular thing. It feels good to be part of a place that values both the work and the people.",
      rating: 5,
      desgnation: "Designation",
    },
  ];

  return (
    <>
      {/* <div className=" my-8 max-w-[1200px] m-auto grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex">
          <div className="w-full relative z-50 flex flex-col justify-center bg-white px-4 pr-12 rounded-lg globalShadow hover:shadow-2xl transition-all">
            <Image
              height={200}
              width={200}
              src="/quote.png"
              className=" absolute bottom-0 left-0 -z-10 opacity-10"
            ></Image>
            <h2 className=" font-semibold text-xl text-slate-800 mb-1">
              Sameer <br /> Aadil
            </h2>
            <span className=" text-xs text-gray-500 border-b py-2 w-fit mb-3">
              Web Developer
            </span>
            <div>
              <i class="bx bxs-star text-blue-400"></i>
              <i class="bx bxs-star text-blue-400"></i>
              <i class="bx bxs-star text-blue-400"></i>
              <i class="bx bxs-star text-blue-400"></i>
              <i class="bx bxs-star-half text-blue-400"></i>
            </div>
          </div>
          <div className=" relative top-0 -left-12 flex items-center z-50">
            <img
              alt="image here"
              className=" h-[70%] object-cover rounded-lg"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq2lidOY4xtl4mU06Cqqd0QF1zgFBQ98HJ8w&usqp=CAU"
            />
            <span className=" text-gray-500 text-xs pl-3">
              Lorem ipsum, dolor sit amet consectetur elit. Pariatur asperiores
              fuga tempora mollitia est minus quia consequuntur ratione
              obcaecati praesentium quasi incidunt suscipit quod doloribus,
              quas.
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="w-full relative z-50 flex flex-col justify-center bg-white px-4 pr-12 rounded-lg globalShadow hover:shadow-2xl transition-all">
            <Image
              height={200}
              width={200}
              src="/quote.png"
              className=" absolute bottom-0 left-0 -z-10 opacity-10"
            ></Image>
            <h2 className=" font-semibold text-xl text-slate-800 mb-1">
              Muhammad <br /> Ahmad
            </h2>
            <span className=" text-xs text-gray-500 border-b py-2 w-fit mb-3">
              Web Developer
            </span>
            <div>
              <i class="bx bxs-star text-blue-400"></i>
              <i class="bx bxs-star text-blue-400"></i>
              <i class="bx bxs-star text-blue-400"></i>
              <i class="bx bxs-star text-blue-400"></i>
              <i class="bx bxs-star-half text-blue-400"></i>
            </div>
          </div>
          <div className=" relative top-0 -left-12 flex items-center z-50">
            <img
              alt="image here"
              className=" h-[70%] object-cover rounded-lg"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq2lidOY4xtl4mU06Cqqd0QF1zgFBQ98HJ8w&usqp=CAU"
            />
            <span className=" text-gray-500 text-xs pl-3">
              Lorem ipsum, dolor sit amet consectetur elit. Pariatur asperiores
              fuga tempora mollitia est minus quia consequuntur ratione
              obcaecati praesentium quasi incidunt suscipit quod doloribus,
              quas.
            </span>
          </div>
        </div>
      </div>  */}
      <div className="max-w-[1300px] m-auto">
        <Slider {...settings}>
          {Data.map((v, i) => {
            return (
              <div key={i} className="px-8 py-12">
                <div className="flex">
                  <div className="w-full relative z-50 flex flex-col justify-center bg-white px-4 pr-12 rounded-lg globalShadow hover:shadow-2xl transition-all">
                    <Image
                      height={200}
                      width={200}
                      src="/quote.png"
                      priority="true"
                      className=" absolute bottom-0 left-0 -z-10 opacity-10"
                    ></Image>
                    <h2 className=" font-semibold text-xl text-slate-800 mb-1">
                      {v.name}
                    </h2>
                    <span className=" text-xs text-gray-500 border-b py-2 w-fit mb-3">
                      Web Developer
                    </span>
                    <div>
                      <Rating
                        disabled
                        value={v.rating}
                        cancel={false}
                        className="text-orange-600 mt-4"
                      />
                    </div>
                  </div>
                  <div className=" relative top-0 -left-12 flex items-center z-50">
                    <img
                      alt="image here"
                      className=" h-[70%] object-cover rounded-lg"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq2lidOY4xtl4mU06Cqqd0QF1zgFBQ98HJ8w&usqp=CAU"
                    />
                    <span className=" text-gray-500 text-xs pl-3">
                      Lorem ipsum, dolor sit amet consectetur elit. Pariatur
                      asperiores fuga tempora mollitia est minus quia
                      consequuntur ratione obcaecati praesentium quasi incidunt
                      suscipit quod doloribus, quas.
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
