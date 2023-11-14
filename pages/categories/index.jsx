import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Categories() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <>
      <div className="bg-[#ffffff]">
        <div>
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
            <div className="border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Category
              </h1>
            </div>
            <div className="grid gap-4 grid-cols-[200px_minmax(1000px,_1fr)_100px] mt-4">
              <div className="border-[1px] h-full hover:bg-[#dddde63a]">
                <h2 className="px-2 text-xl mt-4 mb-4 font-semibold text-blue-700">
                  Category
                </h2>
                <div className="flex gap-4 px-4 py-2">
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    name="Mobiles"
                    id="Mobiles"
                  />
                  <label className="cursor-pointer" htmlFor="Mobiles">
                    Mobiles
                  </label>
                </div>
                <div className="flex gap-4 px-4 py-2">
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    name="Earbuds"
                    id="Earbuds"
                  />
                  <label className="cursor-pointer" htmlFor="Earbuds">
                    Earbuds
                  </label>
                </div>
                <div className="flex gap-4 px-4 py-2">
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    name="Tablets"
                    id="Tablets"
                  />
                  <label className="cursor-pointer" htmlFor="Tablets">
                    Tablets
                  </label>
                </div>
                <div className="flex gap-4 px-4 py-2">
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    name="Smart Watches"
                    id="Smart Watches"
                  />
                  <label className="cursor-pointer" htmlFor="Smart Watches">
                    Smart Watches
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 h-full border-[1px] px-4 py-2">
                <div className="border-[1px] rounded-md border-blue-100 h-fit mt-3 pb-4">
                  <div>
                    <div className="w-full h-[150px] bg-sky-50">
                      <img
                        className="cateImg"
                        src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1693159317/blog-image/dcode-cygnal-2-pro-pakistan-priceoye-ick7a-270x270_fkyuxi.webp"
                        alt="img here"
                      />
                    </div>
                    <div className="mt-3 p-[8px]">
                      <h2 className="text-sm line-clamp-1	">
                        Sumsung Dany Smaprt Phone
                      </h2>
                      <h2 className="text-xs bg-blue-50 w-fit p-[4px] px-3 rounded-md mt-2 text-blue-900">
                        Earbuds
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="border-[1px] rounded-md border-blue-100 h-fit mt-3 pb-4">
                  <div>
                    <div className="w-full h-[150px] bg-sky-50">
                      <img
                        className="cateImg"
                        src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1693159317/blog-image/dcode-cygnal-2-pro-pakistan-priceoye-ick7a-270x270_fkyuxi.webp"
                        alt="img here"
                      />
                    </div>
                    <div className="mt-3 p-[8px]">
                      <h2 className="text-sm line-clamp-1	">
                        Sumsung Dany Smaprt Phone
                      </h2>
                      <h2 className="text-xs bg-blue-50 w-fit p-[4px] px-3 rounded-md mt-2 text-blue-900">
                        Earbuds
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="border-[1px] rounded-md border-blue-100 h-fit mt-3 pb-4">
                  <div>
                    <div className="w-full h-[150px] bg-sky-50">
                      <img
                        className="cateImg"
                        src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1693159317/blog-image/dcode-cygnal-2-pro-pakistan-priceoye-ick7a-270x270_fkyuxi.webp"
                        alt="img here"
                      />
                    </div>
                    <div className="mt-3 p-[8px]">
                      <h2 className="text-sm line-clamp-1	">
                        Sumsung Dany Smaprt Phone
                      </h2>
                      <h2 className="text-xs bg-blue-50 w-fit p-[4px] px-3 rounded-md mt-2 text-blue-900">
                        Earbuds
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="border-[1px] rounded-md border-blue-100 h-fit mt-3 pb-4">
                  <div>
                    <div className="w-full h-[150px] bg-sky-50">
                      <img
                        className="cateImg"
                        src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1693159317/blog-image/dcode-cygnal-2-pro-pakistan-priceoye-ick7a-270x270_fkyuxi.webp"
                        alt="img here"
                      />
                    </div>
                    <div className="mt-3 p-[8px]">
                      <h2 className="text-sm line-clamp-1	">
                        Sumsung Dany Smaprt Phone
                      </h2>
                      <h2 className="text-xs bg-blue-50 w-fit p-[4px] px-3 rounded-md mt-2 text-blue-900">
                        Earbuds
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="border-[1px] rounded-md border-blue-100 h-fit mt-3 pb-4">
                  <div>
                    <div className="w-full h-[150px] bg-sky-50">
                      <img
                        className="cateImg"
                        src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1693159317/blog-image/dcode-cygnal-2-pro-pakistan-priceoye-ick7a-270x270_fkyuxi.webp"
                        alt="img here"
                      />
                    </div>
                    <div className="mt-3 p-[8px]">
                      <h2 className="text-sm line-clamp-1	">
                        Sumsung Dany Smaprt Phone
                      </h2>
                      <h2 className="text-xs bg-blue-50 w-fit p-[4px] px-3 rounded-md mt-2 text-blue-900">
                        Earbuds
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
