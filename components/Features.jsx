import Link from "next/link";
import React, { useEffect, useState } from "react";

const Features = () => {
  const [hoursRemaining, setHoursRemaining] = useState(20);
  const [minutesRemaining, setMinutesRemaining] = useState(20);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (secondsRemaining === 0) {
        if (minutesRemaining === 0) {
          if (hoursRemaining === 0) {
            // Timer finished
            clearInterval(intervalId);
          } else {
            setHoursRemaining(hoursRemaining - 1);
            setMinutesRemaining(59);
          }
        } else {
          setMinutesRemaining(minutesRemaining - 1);
          setSecondsRemaining(59);
        }
      } else {
        setSecondsRemaining(secondsRemaining - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [hoursRemaining, minutesRemaining, secondsRemaining]);

  return (
    <>
      <div className="max-w-[1200px] m-auto my-4 lg:my-16 px-6 lg:px-6 2xl:px-0">
        <div class="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3 gap-5">
          <div class="col-span-1 row-span-1 bg-gray-200 h-full overflow-hidden rounded-lg shadow-xl">
            <div className="flex items-center h-full relative font-medium tracking-wide">
              <div>
                <h1 className=" text-3xl ml-4 mb-1">
                  Live with{" "}
                  <span className=" block font-semibold text-orange-500">
                    Comfort
                  </span>
                </h1>
                <Link
                  href={"/categories"}
                  className=" ml-4 text-gray-500 text-sm z-50 border-b border-b-gray-400 pb-1 w-fit hover:text-orange-500 hover:border-b-orange-400 transition-all duration-300 cursor-pointer"
                >
                  Shop Now
                </Link>
              </div>
              <img
                src="/fp2.png"
                alt="image here"
                className="h-[230px] w-[200px]"
              />
            </div>
          </div>
          <div class="col-span-1 row-span-1 bg-gray-200 h-full overflow-hidden rounded-lg shadow-xl">
            <div className="flex items-center h-full relative font-medium tracking-wide">
              <div>
                <h1 className=" text-3xl ml-4 mb-1">
                  Shose
                  <span className=" block font-semibold text-orange-500">
                    Collection
                  </span>
                </h1>
                <Link
                  href={"/categories"}
                  className=" ml-4 text-gray-500 text-sm z-50 border-b border-b-gray-400 pb-1 w-fit hover:text-orange-500 hover:border-b-orange-400 transition-all duration-300 cursor-pointer"
                >
                  Shop Now
                </Link>
              </div>
              <img
                src="/fp3.png"
                alt="image here"
                className="h-[230px] w-[200px]"
              />
            </div>
          </div>
          <div class="col-span-1 md:col-span-2 lg:col-span-1 row-span-2 relative bg-gray-200 rounded-lg shadow-xl overflow-hidden">
            <img
              src="/fp5.png"
              alt="image here"
              className="absolute top-0 z-10 opacity-30"
            />
            <div className="p-4 flex justify-end h-full flex-col z-50">
              <button className="bg-orange-400 text-white px-4 py-1 text-xs md:text-sm rounded-sm cursor-text w-fit z-50">
                UP TO 30% OFF
              </button>
              <span className=" text-gray-600 text-2xl mt-2 font-extrabold z-50">
                Winter Styles
              </span>
              <Link
                href={"/categories"}
                className="mt-2 text-gray-500 text-xs md:text-sm z-50 border-b border-b-gray-400 pb-1 w-fit hover:text-orange-500 hover:border-b-orange-400 transition-all duration-300 cursor-pointer"
              >
                Shop Now
              </Link>

              <div className=" mt-8 z-50">
                <h1 className="mb-4 text-lg md:text-xl font-semibold text-orange-400">
                  Count Down Starts
                </h1>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
                  <div className="grid place-items-center rounded-xl py-2 bg-gray-100 shadow-lg">
                    <h2
                      id="Hours"
                      className=" text-xl font-semibold text-gray-500"
                    >
                      {hoursRemaining}
                    </h2>
                    <span className="text-gray-700 text-xs">Hours</span>
                  </div>
                  <div className="grid place-items-center rounded-xl py-2 bg-gray-100 shadow-lg">
                    <h2
                      id="Min"
                      className=" text-xl font-semibold text-gray-500"
                    >
                      {minutesRemaining}
                    </h2>
                    <span className="text-gray-700 text-xs">Min</span>
                  </div>
                  <div className="grid place-items-center rounded-xl py-2 bg-gray-100 shadow-lg">
                    <h2
                      id="Sec"
                      className=" text-xl font-semibold text-gray-500"
                    >
                      {secondsRemaining}
                    </h2>
                    <span className="text-gray-700 text-xs">Sec</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-1 md:col-span-2 row-span-1 bg-gray-200 rounded-lg shadow-xl">
            <div className=" flex items-center gap-2 md:gap-8 lg:gap-8 justify-center">
              <img src="/fp4.png" alt="image here" className=" w-[180px]" />
              <div>
                <h2 className="text-sm md:text-lg text-gray-800 mb-2">
                  Seek Out Your Ideal Attire!
                </h2>
                <Link
                  href="/categories"
                  className="text-sm bg-orange-400 px-2 my-0 md:px-3 md:py-1 rounded-md text-white hover:bg-orange-500 transition-all"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
