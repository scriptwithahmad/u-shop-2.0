import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import index from "..";

const EditProduct = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
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

  const [images, setImages] = useState([]);
  const [tempImgs, setTempImgs] = useState([]);
  const [alreadyExistedImages, setAlreadyExistedImages] = useState([]);

  const router = useRouter();
  const slug = router.query.slug;

  const formDataChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadImagesToCloudinary = async () => {
    const tempImages = [];
    try {
      setLoading(true);
      for (let i = 0; i < images.length; i++) {
        const data = new FormData();
        data.append("file", images[i]);
        data.append("upload_preset", "blog-image");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dmyrswz0r/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const jsonRes = await res.json();
        tempImages.push(jsonRes.secure_url);
      }

      setLoading(false);
    } catch (error) {
      alert(error);
    } finally {
      return [...alreadyExistedImages, ...tempImages];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/products/${slug}`);
      const data = await res.json();

      setFormData(data?.singleProduct);

      setTempImgs(data?.singleProduct?.images);
      setAlreadyExistedImages(data?.singleProduct?.images);
    };
    fetchData();
  }, []);

  // Update Product Data ----------------------------------/
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const imageUrls = await uploadImagesToCloudinary();
      const res = await axios.put(`/api/products/${slug}`, {
        ...formData,
        ...imagePreviews,
        images: imageUrls,
      });
      toast.success("Product Updated Successfully!");
      router.push("/dashboard/products");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Show Image on Clinet Side -----------------------------/
  const handleFileInputChange = async (e) => {
    setImages(e.target.files);
    var newImagesObjUrls = Object.keys(e.target.files).map((key, i) => {
      return URL.createObjectURL(e.target.files[key]);
    });
    setTempImgs([...tempImgs, ...newImagesObjUrls]);
  };

  // Remove Specific Image from Client Side ----------------/
  const removeImagePreview = (indexToRemove) => {
    var substateResImgs = [...tempImgs];
    substateResImgs.splice(indexToRemove, 1);
    setTempImgs([...substateResImgs]);

    const updatedImages = [...images];
    updatedImages.splice(indexToRemove, 1);
    setImages(updatedImages);

    const updateImg = [...alreadyExistedImages];
    updateImg.splice(indexToRemove, 1);
    setAlreadyExistedImages(updateImg);
  };

  return (
    <>
      <Toaster />
      <section className="createProductOuter">
        <h1>Update Product</h1>
        <form onSubmit={submitHandler}>
          <div className="createProductMain">
            {/* 1. Name ------------*/}
            <div className="createProductInner">
              <label htmlFor="name">Product Name </label>
              <input
                value={formData?.name}
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
                value={formData?.sale}
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
                value={formData?.price}
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
                value={formData?.category}
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
                value={formData?.seller}
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
                value={formData?.stock}
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
                value={formData?.description}
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
                onChange={handleFileInputChange}
              />

              <div className="border grid grid-cols-4 gap-4 items-center p-6 mt-2 rounded-lg">
                {tempImgs?.map((preview, index) => (
                  <div className="border rounded-lg w-[270px] h-[320px] overflow-hidden relative">
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-contain rounded-lg"
                    />
                    <i
                      onClick={() => removeImagePreview(index)}
                      className="fa-solid fa-xmark absolute top-2 right-2 bg-gray-100 text-gray-500 h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-all cursor-pointer"
                    ></i>
                  </div>
                ))}
              </div>
            </div>

            <button className="createBtn">
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProduct;
