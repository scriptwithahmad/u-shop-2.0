import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const CreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    sale: "",
    description: "",
    price: "",
    category: "",
    seller: "",
    stock: "",
    avatar: "",
    images: [],
  });

  const formDataChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Cloudinary States
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

  const uploadAvatarToCloudinary = async () => {
    try {
      const data = new FormData();
      data.append("file", formData.avatar);
      data.append("upload_preset", "blog-image");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmyrswz0r/image/upload",
        {
          body: data,
          method: "POST",
        }
      );

      const jsonRes = await res.json();
      return jsonRes.secure_url;
    } catch (error) {
      alert("Something went wrong while uploading the avatar");
      return "";
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const imageUrls = await uploadImagesToCloudinary();
      const avatarUrl = await uploadAvatarToCloudinary();
      const res = await axios.post("/api/products", {
        ...formData,
        avatar: avatarUrl,
        images: imageUrls,
      });
      toast.success("Product Added Successfully!");
      setFormData({
        name: "",
        sale: "",
        description: "",
        price: "",
        category: "",
        seller: "",
        stock: "",
        avatar: "",
        images: [],
      });
      setTempImage("");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

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
            {/* 2. Sale ------------*/}
            <div className="createProductInner">
              <label htmlFor="brand">Product Sale </label>
              <input
                value={formData.sale}
                onChange={formDataChangeHandler}
                type="text"
                name="sale"
                id="sale"
                placeholder="Product Sale"
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
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                <option value="Sports">Sports</option>
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
            <div className="createProductInner">
              <label htmlFor="avatarInput">Product Fetured Image</label>
              <input
                style={{ color: "#7d879c" }}
                className="remainDiv"
                id="avatarInput"
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.files[0] })
                }
              />
            </div>

            {/* Arry of Images to Show */}
            <div className="createProductInner">
              <label htmlFor="arryOfImages">Select Multiple Images</label>
              <input
                style={{ color: "#7d879c" }}
                className="remainDiv"
                id="arryOfImages"
                type="file"
                onChange={(e) => setTempImage(e.target.files)} // Use e.target.files to get multiple files
                multiple // Allow multiple file selection
              />
            </div>

            <button className="createBtn">
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateProduct;
