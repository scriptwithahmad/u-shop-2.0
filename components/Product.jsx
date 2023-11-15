

import { Fragment, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";

const product = {
  name: "Basic Tee 6-Pack ",
  price: "$192",
  rating: 3.9,
  reviewCount: 117,
  href: "#",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
  imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: true },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "XXL", inStock: true },
    { name: "XXXL", inStock: false },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  return (
      <Dialog as="div" className="relative z-10" onClose={setOpen}>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        {product.name}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <p className="text-2xl text-gray-900">
                          {product.price}
                        </p>

                        {/* Reviews */}
                        <div className="mt-6">
                          <h4 className="sr-only">Reviews</h4>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    product.rating > rating
                                      ? "text-gray-900"
                                      : "text-gray-200",
                                    "h-5 w-5 flex-shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <p className="sr-only">
                              {product.rating} out of 5 stars
                            </p>
                            <a
                              href="#"
                              className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              {product.reviewCount} reviews
                            </a>
                          </div>
                        </div>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-10"
                      >
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        <form>
                          {/* Colors */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              Color
                            </h4>

                            <RadioGroup
                              value={selectedColor}
                              onChange={setSelectedColor}
                              className="mt-4"
                            >
                              <RadioGroup.Label className="sr-only">
                                Choose a color
                              </RadioGroup.Label>
                              <span className="flex items-center space-x-3">
                                {product.colors.map((color) => (
                                  <RadioGroup.Option
                                    key={color.name}
                                    value={color}
                                    className={({ active, checked }) =>
                                      classNames(
                                        color.selectedClass,
                                        active && checked
                                          ? "ring ring-offset-1"
                                          : "",
                                        !active && checked ? "ring-2" : "",
                                        "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                      )
                                    }
                                  >
                                    <RadioGroup.Label
                                      as="span"
                                      className="sr-only"
                                    >
                                      {color.name}
                                    </RadioGroup.Label>
                                    <span
                                      aria-hidden="true"
                                      className={classNames(
                                        color.class,
                                        "h-8 w-8 rounded-full border border-black border-opacity-10"
                                      )}
                                    />
                                  </RadioGroup.Option>
                                ))}
                              </span>
                            </RadioGroup>
                          </div>

                          {/* Sizes */}
                          <div className="mt-10">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-gray-900">
                                Size
                              </h4>
                              <a
                                href="#"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Size guide
                              </a>
                            </div>

                            <RadioGroup
                              value={selectedSize}
                              onChange={setSelectedSize}
                              className="mt-4"
                            >
                              <RadioGroup.Label className="sr-only">
                                Choose a size
                              </RadioGroup.Label>
                              <div className="grid grid-cols-4 gap-4">
                                {product.sizes.map((size) => (
                                  <RadioGroup.Option
                                    key={size.name}
                                    value={size}
                                    disabled={!size.inStock}
                                    className={({ active }) =>
                                      classNames(
                                        size.inStock
                                          ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                          : "cursor-not-allowed bg-gray-50 text-gray-200",
                                        active ? "ring-2 ring-indigo-500" : "",
                                        "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                                      )
                                    }
                                  >
                                    {({ active, checked }) => (
                                      <>
                                        <RadioGroup.Label as="span">
                                          {size.name}
                                        </RadioGroup.Label>
                                        {size.inStock ? (
                                          <span
                                            className={classNames(
                                              active ? "border" : "border-2",
                                              checked
                                                ? "border-indigo-500"
                                                : "border-transparent",
                                              "pointer-events-none absolute -inset-px rounded-md"
                                            )}
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                          >
                                            <svg
                                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                              viewBox="0 0 100 100"
                                              preserveAspectRatio="none"
                                              stroke="currentColor"
                                            >
                                              <line
                                                x1={0}
                                                y1={100}
                                                x2={100}
                                                y2={0}
                                                vectorEffect="non-scaling-stroke"
                                              />
                                            </svg>
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>

                          <button
                            type="submit"
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Add to bag
                          </button>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
  );
}


// const function HtmlWith() {
//   <!--
//   This example requires some changes to your config:
  
//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/aspect-ratio'),
//     ],
//   }
//   ```
// -->
// <div className="relative z-10" role="dialog" aria-modal="true">
//   <!--
//     Background backdrop, show/hide based on modal state.

//     Entering: "ease-out duration-300"
//       From: "opacity-0"
//       To: "opacity-100"
//     Leaving: "ease-in duration-200"
//       From: "opacity-100"
//       To: "opacity-0"
//   -->
//   <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>

//   <div className="fixed inset-0 z-10 overflow-y-auto">
//     <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
//       <!--
//         Modal panel, show/hide based on modal state.

//         Entering: "ease-out duration-300"
//           From: "opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
//           To: "opacity-100 translate-y-0 md:scale-100"
//         Leaving: "ease-in duration-200"
//           From: "opacity-100 translate-y-0 md:scale-100"
//           To: "opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
//       -->
//       <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
//         <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
//           <button type="button" className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8">
//             <span className="sr-only">Close</span>
//             <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
//               <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>

//           <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
//             <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
//               <img src="https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg" alt="Two each of gray, white, and black shirts arranged on table." className="object-cover object-center">
//             </div>
//             <div className="sm:col-span-8 lg:col-span-7">
//               <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">Basic Tee 6-Pack</h2>

//               <section aria-labelledby="information-heading" className="mt-2">
//                 <h3 id="information-heading" className="sr-only">Product information</h3>

//                 <p className="text-2xl text-gray-900">$192</p>

//                 <!-- Reviews -->
//                 <div className="mt-6">
//                   <h4 className="sr-only">Reviews</h4>
//                   <div className="flex items-center">
//                     <div className="flex items-center">
//                       <!-- Active: "text-gray-900", Default: "text-gray-200" -->
//                       <svg className="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                         <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
//                       </svg>
//                       <svg className="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                         <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
//                       </svg>
//                       <svg className="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                         <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
//                       </svg>
//                       <svg className="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                         <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
//                       </svg>
//                       <svg className="text-gray-200 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                         <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
//                       </svg>
//                     </div>
//                     <p className="sr-only">3.9 out of 5 stars</p>
//                     <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</a>
//                   </div>
//                 </div>
//               </section>

//               <section aria-labelledby="options-heading" className="mt-10">
//                 <h3 id="options-heading" className="sr-only">Product options</h3>

//                 <form>
//                   <!-- Colors -->
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-900">Color</h4>

//                     <fieldset className="mt-4">
//                       <legend className="sr-only">Choose a color</legend>
//                       <span className="flex items-center space-x-3">
//                         <!--
//                           Active and Checked: "ring ring-offset-1"
//                           Not Active and Checked: "ring-2"
//                         -->
//                         <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
//                           <input type="radio" name="color-choice" value="White" className="sr-only" aria-labelledby="color-choice-0-label">
//                           <span id="color-choice-0-label" className="sr-only">White</span>
//                           <span aria-hidden="true" className="h-8 w-8 bg-white rounded-full border border-black border-opacity-10"></span>
//                         </label>
//                         <!--
//                           Active and Checked: "ring ring-offset-1"
//                           Not Active and Checked: "ring-2"
//                         -->
//                         <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
//                           <input type="radio" name="color-choice" value="Gray" className="sr-only" aria-labelledby="color-choice-1-label">
//                           <span id="color-choice-1-label" className="sr-only">Gray</span>
//                           <span aria-hidden="true" className="h-8 w-8 bg-gray-200 rounded-full border border-black border-opacity-10"></span>
//                         </label>
//                         <!--
//                           Active and Checked: "ring ring-offset-1"
//                           Not Active and Checked: "ring-2"
//                         -->
//                         <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900">
//                           <input type="radio" name="color-choice" value="Black" className="sr-only" aria-labelledby="color-choice-2-label">
//                           <span id="color-choice-2-label" className="sr-only">Black</span>
//                           <span aria-hidden="true" className="h-8 w-8 bg-gray-900 rounded-full border border-black border-opacity-10"></span>
//                         </label>
//                       </span>
//                     </fieldset>
//                   </div>

//                   <!-- Sizes -->
//                   <div className="mt-10">
//                     <div className="flex items-center justify-between">
//                       <h4 className="text-sm font-medium text-gray-900">Size</h4>
//                       <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
//                     </div>

//                     <fieldset className="mt-4">
//                       <legend className="sr-only">Choose a size</legend>
//                       <div className="grid grid-cols-4 gap-4">
//                         <!-- Active: "ring-2 ring-indigo-500" -->
//                         <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
//                           <input type="radio" name="size-choice" value="XXS" className="sr-only" aria-labelledby="size-choice-0-label">
//                           <span id="size-choice-0-label">XXS</span>
//                           <!--
//                             Active: "border", Not Active: "border-2"
//                             Checked: "border-indigo-500", Not Checked: "border-transparent"
//                           -->
//                           <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
//                         </label>
//                         <!-- Active: "ring-2 ring-indigo-500" -->
//                         <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
//                           <input type="radio" name="size-choice" value="XS" className="sr-only" aria-labelledby="size-choice-1-label">
//                           <span id="size-choice-1-label">XS</span>
//                           <!--
//                             Active: "border", Not Active: "border-2"
//                             Checked: "border-indigo-500", Not Checked: "border-transparent"
//                           -->
//                           <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
//                         </label>
//                         <!-- Active: "ring-2 ring-indigo-500" -->
//                         <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
//                           <input type="radio" name="size-choice" value="S" className="sr-only" aria-labelledby="size-choice-2-label">
//                           <span id="size-choice-2-label">S</span>
//                           <!--
//                             Active: "border", Not Active: "border-2"
//                             Checked: "border-indigo-500", Not Checked: "border-transparent"
//                           -->
//                           <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
//                         </label>
//                         <!-- Active: "ring-2 ring-indigo-500" -->
//                         <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
//                           <input type="radio" name="size-choice" value="M" className="sr-only" aria-labelledby="size-choice-3-label">
//                           <span id="size-choice-3-label">M</span>
//                           <!--
//                             Active: "border", Not Active: "border-2"
//                             Checked: "border-indigo-500", Not Checked: "border-transparent"
//                           -->
//                           <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
//                         </label>
//                         <!-- Active: "ring-2 ring-indigo-500" -->
//                         <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
//                           <input type="radio" name="size-choice" value="L" className="sr-only" aria-labelledby="size-choice-4-label">
//                           <span id="size-choice-4-label">L</span>
//                           <!--
//                             Active: "border", Not Active: "border-2"
//                             Checked: "border-indigo-500", Not Checked: "border-transparent"
//                           -->
//                           <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
//                         </label>
//                         <!-- Active: "ring-2 ring-indigo-500" -->
//                         <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
//                           <input type="radio" name="size-choice" value="XL" className="sr-only" aria-labelledby="size-choice-5-label">
//                           <span id="size-choice-5-label">XL</span>
//                           <!--
//                             Active: "border", Not Active: "border-2"
//                             Checked: "border-indigo-500", Not Checked: "border-transparent"
//                           -->
//                           <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
//                         </label>
//                         <!-- Active: "ring-2 ring-indigo-500" -->
//                         <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
//                           <input type="radio" name="size-choice" value="XXL" className="sr-only" aria-labelledby="size-choice-6-label">
//                           <span id="size-choice-6-label">XXL</span>
//                           <!--
//                             Active: "border", Not Active: "border-2"
//                             Checked: "border-indigo-500", Not Checked: "border-transparent"
//                           -->
//                           <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
//                         </label>
//                         <!-- Active: "ring-2 ring-indigo-500" -->
//                         <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-not-allowed bg-gray-50 text-gray-200">
//                           <input type="radio" name="size-choice" value="XXXL" disabled className="sr-only" aria-labelledby="size-choice-7-label">
//                           <span id="size-choice-7-label">XXXL</span>
//                           <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
//                             <svg className="absolute inset-0 h-full w-full stroke-2 text-gray-200" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
//                               <line x1="0" y1="100" x2="100" y2="0" vector-effect="non-scaling-stroke" />
//                             </svg>
//                           </span>
//                         </label>
//                       </div>
//                     </fieldset>
//                   </div>

//                   <button type="submit" className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add to bag</button>
//                 </form>
//               </section>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

// }