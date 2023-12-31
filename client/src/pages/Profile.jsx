import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteFailure,
  DeleteStart,
  DeleteSuccess,
  signInFailure,
  signInSuccess,
  signOutStart,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/user.js";
import { app } from "../firebase.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Link } from "react-router-dom";

export default function Profile() {
  const [formControls, setFormControls] = useState({});
  const [file, setFile] = useState(undefined);
  const [userCars, setUserCars] = useState({})
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const inputRef = useRef();
  useEffect(() => {
    if (file) {
    return handleFileUpload(file);
      
    }
    getUserCars();
  }, [file]);
  
  const handleChange = (e) => {
    setFormControls({
      ...formControls,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());
    try {
      const res = await fetch(`api/user/update/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formControls),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure());
        return;
      }
      dispatch(updateSuccess(data));
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(updateFailure(error));
    }
  };
  

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setFormControls({...formControls,avatar:downloadURL})
    });

  })
}
  const handleLogOut = async () => {
    dispatch(signOutStart());
    try {
      const res = await fetch("api/auth/logout");
      const data = await res.json();
      if (data.success != false) {
        dispatch(signInSuccess());
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error));
    }
  };
  const handleDelete = async () => {
    dispatch(DeleteStart());
    try {
      const res = await fetch(`api/user/delete/${user._id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        }
      });
      const data = await res.json();
      if (data.success != false) {
        dispatch(DeleteSuccess());
      }
    } catch (error) {
      console.log(error);
      dispatch(DeleteFailure(error));
    }
  };
  const handleCarDelete = async (id) => {
    try {
      const res = await fetch(`/api/car/delete/${id}`,
      {
        method:"DELETE",
      }
      )
      const data = await res.json()
      console.log(data)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  const getUserCars = async () => {
    try {
      const res = await fetch(`/api/user/get-listings/${user._id}`)
      const data = await res.json();
      setUserCars(data)

    } catch (error) {
      console.log(error)
    }
  } 
  return (
    <div className="w-full h-full flex flex-col gap-10 justify-center items-center my-20  ">
      <div className=" min-w-[300px] md:min-w-[600px] max-w-2xl bg-color-2 p-5 flex flex-col gap-10 justify-center items-center rounded-lg ">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
          ref={inputRef}
          hidden
        />
        <img
          src={user.avatar}
          onClick={() => inputRef.current.click()}
          alt="avatar"
          className="w-40  rounded-full cursor-pointer  "
        />
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10 ">
          <input
            id="username"
            type="text"
            defaultValue={user.username}
            className=" w-full p-5 rounded-lg text-left "
            onChange={handleChange}
          />
          <input
            id="email"
            type="email"
            defaultValue={user.email}
            className="w-full p-5 rounded-lg text-left "
            onChange={handleChange}
          />
          <input
            id="password"
            type="password"
            placeholder="*****"
            className="w-full p-5 rounded-lg text-left "
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full  bg-slate-600 p-5 rounded-md text-center text-color-1 text-[20px]"
          >
            Update
          </button>
        </form>
        <div className="w-full flex justify-between mx-3">
        <button
          onClick={handleLogOut}
          className="bg-red-500 p-3 text-color-1 text-[20px] font-bold rounded-lg "
        >
          Log Out
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 p-3 text-color-1 text-[20px] font-bold rounded-lg "
        >
          Delete account
        </button>
        </div>
      </div>
    <Link to="/car-listing" className="bg-color-4 p-5 text-[24px] text-white rounded-md" >
      Create Your Car Rental
    </Link>
    <div className="w-full  justify-center flex">
    {userCars.length > 0 &&
    
    <div className="flex flex-col m-10 items-center max-w-xl  gap-5">
      <h1 className="text-[28px] font-bold p-5 overflow-hidden " >Your cars </h1>
      {userCars.map((car,index) => {
        return (
          <div className="flex border-4 w-full h-full p-3 gap-10 justify-between items-center " key={index}>
            <div className="flex flex-col justify-center ">
           <Link to={`/car/${car._id}`} > <img src={car.images[0]} className=" w-24 h-24 object-cover"/></Link>
            <h3 className="text-[20px]  " > {car.title} </h3>
            </div>
            <button className="bg-red-600 p-5   text-white text-[19px] font-semibold rounded-md" onClick={() => handleCarDelete(car._id) } >Delete </button>
          </div>
        )
      })}
    </div> }
    </div>
    </div>
  );
}
