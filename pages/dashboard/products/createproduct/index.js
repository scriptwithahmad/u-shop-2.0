import axios from "axios";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
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
  });

  // for sales logic start here ----------------------------------------------------/

  const formDataChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            {/* 1. Name ------------------------ */}
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

            {/* 3. Price ------------------------ */}
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
              </select>
            </div>
            {/* 5. Seller ------------------------ */}
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
            {/* 6. Stock ------------------------------------------------ */}
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
            {/* 7. Description --------------------------------------- */}
            {/* Editor for Desription --------------------------------- */}
            <div className=" mb-6">
              <label
                htmlFor="description"
                className=" text-gray-400 text-sm my-10"
              >
                Product Description
              </label>
              <Editor
                apiKey="z5f7ugf635wz96udas9dzbjlugsi9xxx6oxnnb6aw83hdkdk"
                value={formData.description}
                onEditorChange={(content) =>
                  setFormData({ ...formData, description: content })
                }
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo blocks " +
                    "bullist numlist " +
                    "table image removeformat code fullscreen",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                placeholder="helkafsd"
              />
            </div>

            {/* Product Hero Image ------------------------------------ */}

            {/* Arry of Images to Show ---------------------------------- */}
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
