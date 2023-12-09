import React from "react";

const Features = () => {
  return (
    <>
      <div class="grid grid-cols-3 grid-rows-2 gap-5 max-w-[1200px] m-auto my-4 lg:my-16">
        <div class="col-span-1 row-span-1 bg-gray-200 h-full overflow-hidden rounded-lg shadow-xl">
          <div className="flex items-center h-full relative font-medium tracking-wide">
            <h1 className="z-30 text-3xl p-4">
              Live with{" "}
              <span className=" block font-semibold text-orange-500">
                Comfort
              </span>
            </h1>
            <img
              src="/fp2.png"
              alt="image here"
              className="h-[230px] w-[200px]"
            />
          </div>
        </div>
        <div class="col-span-1 row-span-1 bg-gray-200 h-full overflow-hidden rounded-lg shadow-xl">
          <div className="flex items-center h-full relative font-medium tracking-wide">
            <h1 className="z-30 text-3xl p-4">
              Live with{" "}
              <span className=" block font-semibold text-orange-500">
                Comfort
              </span>
            </h1>
            <img
              src="/fp3.png"
              alt="image here"
              className="h-[230px] w-[200px]"
            />
          </div>
        </div>
        <div class="col-span-1 row-span-2 bg-[url('/fp5.png')] bg-gray-200 rounded-lg shadow-xl opacity-80">
          <button>Sale</button>
          <h1>Discover Our Premium Products and Irresistible Sales!</h1>
        </div>
        <div class="col-span-2 row-span-1 bg-gray-200 rounded-lg shadow-xl">
          <div className=" flex items-center gap-8 justify-center">
            <img src="/fp4.png" alt="image here" className=" w-[180px]" />
            <div>
              <h2>Seek Out Your Ideal Attire!</h2>
              <button>Shop Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
