import React from "react";

const Testimonials = () => {
  return (
    <>
      <div className=" my-8 max-w-[1200px] m-auto grid grid-cols-1 gap-5 md:grid-cols-2">
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
      </div>
    </>
  );
};

export default Testimonials;
