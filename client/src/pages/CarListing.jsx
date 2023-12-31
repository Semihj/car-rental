import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { cars } from "../utils";
export default function CarListing() {
  const user = useSelector((state) => state.user.currentUser);
  const [files, setFiles] = useState([]);
  const [loading,setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    brand: "Abarth",
    model: "",
    year: 2023,
    price: 20,
    images: [],
    userRef: user._id,
  });
  console.log(formData);
  const navigate = useNavigate();
  const handleChange = (e) => {
    if (
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.type === "number" ||
      e.target.type === "select-one"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("api/car/listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success !== false) {
        navigate(`/car/${data._id}`);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done `);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const hanleFileUpload = () => {
    setLoading(true)
    if (files.length > 0 && files.length + formData.images.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({ ...formData, images: formData.images.concat(urls) });
          setLoading(false)
        })

        .catch((err) => {
          console.log(err);
          setLoading(false)
        });
    } else {
      console.log("You can only upload 6 images per listing");
      setLoading(false)
    }
  };
  const handleRemoveImg = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };
  const brandsNames = cars.car_brands.map((brands) => brands.brand);
  let models;
  const modelsNam = cars.car_brands.map((brands) => {
    if (brands.brand === formData.brand) {
      models = brands.models;
    }
  });
  const categories = cars.categories;
  console.log(categories);
  return (
    <div className="w-screen min-h-screen bg-color-4 mx-auto  ">
      <div className="flex flex-wrap w-full h-full   ">
        <form
          onSubmit={handleSubmit}
          className="flex m-10 mx-auto md:m-10  flex-col  gap-10 w-full max-w-[600px]   bg-color-2 p-10 "
        >
          <input
            type="text"
            className="p-4 rounded-sm "
            placeholder="Title"
            id="title"
            onChange={handleChange}
            required
          />
          <textarea
            type="text"
            className="p-4 rounded-sm "
            placeholder="Description(optional)"
            id="description"
            onChange={handleChange}
          />
          <div className=" text-white flex gap-2 items-center ">
            <label className="text-[24px] font-semibold ">Brand :</label>
            <select
              defaultValue={formData.brand}
              onChange={handleChange}
              className="text-black"
              name=""
              id="brand"
              required
            >
              <option value="">Select</option>
              {brandsNames?.map((name, index) => {
                return (
                  <option value={name} key={index}>
                    {name}{" "}
                  </option>
                );
              })}
            </select>
          </div>
          <div className=" text-white flex gap-2 items-center ">
            <label className="text-[24px] font-semibold ">Model :</label>
            <select
              defaultValue={formData.model}
              onChange={handleChange}
              className="text-black"
              name=""
              id="model"
              required
            >
              <option value="">Select</option>
              {models?.map((model, index) => {
                return (
                  <option key={index} value={model}>
                    {" "}
                    {model}{" "}
                  </option>
                );
              })}
            </select>
          </div>
          <div className=" text-white flex gap-2 items-center ">
            <label className="text-[24px] font-semibold ">Category :</label>
            <select
              defaultValue={formData.model}
              onChange={handleChange}
              className="text-black"
              name=""
              id="category"
              required
            >
              <option>Select</option>
              {categories?.map((category, index) => {
                return (
                  <option key={index} value={category}>
                    {" "}
                    {category}{" "}
                  </option>
                );
              })}
            </select>
          </div>
          <input
            type="number"
            className="p-4 rounded-sm "
            defaultValue={2023}
            max={2024}
            id="year"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            className="p-4 rounded-sm "
            defaultValue={20}
            min={20}
            placeholder="20$"
            id="price"
            onChange={handleChange}
            required
          />
          <input
            required
            type="file"
            onChange={(e) => setFiles(e.target.files)}
            id="images"
            accept="image/*"
            multiple
          />

          <button
            onClick={() => hanleFileUpload()}
            type="button"
            className="flex text-white font-semibold bg-green-400 max-w-[150px] text-[19px] py-4 px-2 rounded-md "
          >
            Upload Images
          </button>
          <button
            disabled={loading}
            type="submit"
            className="flex bg-color-4 p-5 disabled:opacity-80 text-[24px] text-white text-center justify-center w-full "
          >
            {loading? "Creating...":"Create"  }
          </button>
        </form>
        <div className="flex m-10  flex-wrap justify-center items-center   gap-10  ">
          {formData.images.length > 0 &&
            formData.images.map((url, index) => {
              return (
                <div
                  className="gap-10 flex items-center flex-col border-4 p-2    "
                  key={index}
                >
                  <img
                    src={url}
                    className="w-40 h-40 object-cover rounded-md  "
                    alt=""
                  />
                  <button
                    onClick={() => handleRemoveImg(index)}
                    className="p-5 bg-red-700 text-white px-8 rounded-md "
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
