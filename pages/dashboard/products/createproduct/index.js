import Loader from "@/components/Loader";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const CreateProduct = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    seller: "",
    stock: "",
    avatar: "",
    images: [],
    sale: {
      name: "",
      value: "",
      startTime: "",
      endTime: "",
    },
  });

  // for sales logic start here ----------------------------------------------------/

  const formDataChangeHandler = (e) => {
    const { name, value } = e.target;

    // Check if the field belongs to the sale object
    if (name.startsWith("sale.")) {
      const saleFieldName = name.substring(5);
      setFormData((prevData) => ({
        ...prevData,
        sale: {
          ...prevData.sale,
          [saleFieldName]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // for sales logic Ends here ----------------------------------------------------/

  // Cloudinary States Fucnton -------------------------/
  const [tempImage, setTempImage] = useState("");
  const uploadImagesToCloudinary = async () => {
    try {
      const imageUrls = [];

      for (const file of tempImage) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "blog-image");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dmyrswz0r/image/upload",
          {
            body: data,
            method: "POST",
          }
        );

        const jsonRes = await res.json();
        imageUrls.push(jsonRes.secure_url);
      }

      return imageUrls;
    } catch (error) {
      alert("Something went wrong while uploading images");
      return [];
    }
  };

  // Add New Product -----------------------------------/
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const imageUrls = await uploadImagesToCloudinary();
      const res = await axios.post("/api/products", {
        ...formData,
        images: imageUrls,
      });
      toast.success("Product Added Successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        seller: "",
        stock: "",
        avatar: "",
        images: [],
        sale: {
          name: "",
          value: "",
          startTime: "",
          endTime: "",
        },
      });

      setImagePreviews([]);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // Show Image on Clinet Side -------------------------/
  const handleImageChange = (e) => {
    const files = e.target.files;
    const previews = [];
    const tempImages = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(files[i]);

      // Push the files to tempImages array
      tempImages.push(files[i]);
    }

    // Update the tempImage state with the new array of files
    setTempImage(tempImages);
  };

  // Remove Specific Image from Client Side ------------/
  const removeImagePreview = (indexToRemove) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, index) => index !== indexToRemove)
    );
  };

  // Map the Categories --------------------------------/
  const [categories, setCategories] = useState([]);

  const fetchCatgories = async () => {
    try {
      const { data } = await axios.get("/api/products/category");
      setCategories(data.getcat);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCatgories();
  }, []);

  return (
    <div>
      <Toaster />
      <section className="createProductOuter">
        <h1>Create Product</h1>
        <form onSubmit={submitHandler}>
          <div className="createProductMain">
            {/* 1. Name ------------*/}
            <div className="createProductInner">
              <label htmlFor="name">Product Name </label>
              <input
                value={formData.name}
                onChange={formDataChangeHandler}
                type="text"
                id="name"
                name="name"
                placeholder="Product Name"
              />
            </div>

            {/* 2. Sale name ------------*/}
            <div className="createProductInner">
              <label htmlFor="saleName">Sale Name:</label>
              <input
                type="text"
                id="saleName"
                name="sale.name"
                placeholder="Sale Name"
                value={formData.sale.name}
                onChange={formDataChangeHandler}
              />
            </div>

            {/* 2. Sale Value  ------------*/}
            <div className="createProductInner">
              <label htmlFor="saleValue">Sale Value:</label>
              <input
                type="text"
                id="saleValue"
                name="sale.value"
                placeholder="Sale Value"
                value={formData.sale.value}
                onChange={formDataChangeHandler}
              />
            </div>

            {/* 2. Sale start time  ------------*/}
            <div className="createProductInner">
              <label htmlFor="saleStartTime">Sale Start Time:</label>
              <input
                type="date"
                id="saleStartTime"
                name="sale.startTime"
                value={formData.sale.startTime}
                onChange={formDataChangeHandler}
              />
            </div>

            {/* 2. Sale end time  ------------*/}
            <div className="createProductInner">
              <label htmlFor="saleEndTime">Sale End Time:</label>
              <input
                type="date"
                id="saleEndTime"
                name="sale.endTime"
                value={formData.sale.endTime}
                onChange={formDataChangeHandler}
              />
            </div>

            {/* 3. Price ------------*/}
            <div className="createProductInner">
              <label htmlFor="price">Product Price </label>
              <input
                value={formData.price}
                onChange={formDataChangeHandler}
                type="number"
                name="price"
                placeholder="Product Price"
                id="Product Price"
              />
            </div>
            {/* 4.  Categories ------------*/}
            <div className="createProductInner">
              <label htmlFor="cate">Product Category</label>
              <select
                value={formData.category}
                onChange={formDataChangeHandler}
                className="remainDiv"
                id="cate"
                name="category"
              >
                <option selected value="select Category">
                  Select Category
                </option>
                {categories?.map((v, i) => {
                  return <option value={v.name}> {v.name} </option>;
                })}
                {/* <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                <option value="Sports">Sports</option> */}
              </select>
            </div>
            {/* 5. Seller ------------*/}
            <div className="createProductInner">
              <label htmlFor="seller">Product Seller</label>
              <input
                value={formData.seller}
                onChange={formDataChangeHandler}
                id="seller"
                name="seller"
                type="text"
                placeholder="Product Saller Name"
              />
            </div>
            {/* 6. Stock ------------*/}
            <div className="createProductInner">
              <label htmlFor="stock">Product Stock</label>
              <input
                value={formData.stock}
                onChange={formDataChangeHandler}
                name="stock"
                type="text"
                placeholder="Product Stock"
              />
            </div>
          </div>
          <div className="myFlex">
            {/* 7. Description ------------*/}
            <div className="createProductInner">
              <label htmlFor="desc">Product Description</label>
              <textarea
                value={formData.description}
                onChange={formDataChangeHandler}
                name="description"
                className="remainDiv diffInput"
                id="desc"
                cols="50"
                rows="5"
                placeholder="Please provide any details"
              ></textarea>
            </div>
            {/* Product Hero Image ------------*/}

            {/* Arry of Images to Show */}
            <div className="createProductInner">
              <label htmlFor="arryOfImages">Select Multiple Images</label>
              <input
                multiple
                type="file"
                id="arryOfImages"
                className="remainDiv"
                style={{ color: "#7d879c" }}
                onChange={handleImageChange}
              />
              {imagePreviews.length == 0 ? null : (
                <div className="border grid grid-cols-4 gap-4 items-center p-6 mt-2 rounded-lg">
                  {imagePreviews.map((preview, index) => (
                    <div className="border rounded-lg w-[270px] h-[320px] overflow-hidden relative">
                      <img
                        key={index}
                        src={preview}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <i
                        onClick={() => removeImagePreview(index)}
                        className="fa-solid fa-xmark absolute top-2 right-2 bg-gray-100 text-gray-500 h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-all cursor-pointer"
                      ></i>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className=" w-fit bg-indigo-500 text-white font-light hover:bg-indigo-600 flex items-center gap-2 px-5 py-2 rounded-lg transition duration-300 cursor-pointer"
            >
              <i className="fa fa-plus"></i>
              {loading ? <Loader /> : "Add Product"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateProduct;
