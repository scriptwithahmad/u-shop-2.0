import React from "react";

const Search = ({ setShowSearch }) => {
  return (
    <>
      <div
        onClick={() => setShowSearch(false)}
        className="opacity-layer z-[10] overflow-hidden absolute top-0 left-0 h-screen w-full bg-[#000e]"
      ></div>
      <div className="absolute h-[500px] w-[50vw] m-auto rounded-xl left-0 right-0 z-[12] bg-[#eee]">
        <div className="addFlex border-b-[1px] border-[#3533333d] pb-4 py-10 max-w-[70%] m-auto">
          <input className="w-10/12" type="text" placeholder="Search..." />
          <i
            title="close the Searchbar"
            onClick={() => setShowSearch(false)}
            class="fa-solid fa-xmark"
          ></i>
        </div>
        <div className="w-[30vw] m-auto py-4">
          <div className="searchItems">
            <img
              src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1693159317/blog-image/dcode-cygnal-2-pro-pakistan-priceoye-ick7a-270x270_fkyuxi.webp"
              alt=""
            />
            <div className="search-info">
              <h2 className="cart-heading">Sumsung Dany Smaprt Phone</h2>
              <button>Earbuds</button>
            </div>
          </div>
          <div className="searchItems">
            <img
              src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1693159317/blog-image/dcode-cygnal-2-pro-pakistan-priceoye-ick7a-270x270_fkyuxi.webp"
              alt=""
            />
            <div className="search-info">
              <h2 className="cart-heading">Sumsung Dany Smaprt Phone</h2>
              <button>Earbuds</button>
            </div>
          </div>
          <div className="searchItems">
            <img
              src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1693159317/blog-image/dcode-cygnal-2-pro-pakistan-priceoye-ick7a-270x270_fkyuxi.webp"
              alt=""
            />
            <div className="search-info">
              <h2 className="cart-heading">Sumsung Dany Smaprt Phone</h2>
              <button>Earbuds</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
