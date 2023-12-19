import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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

export default function Profile() {
  const [formControls, setFormControls] = useState({});
  const [file, setFile] = useState(undefined);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const inputRef = useRef();

  console.log(formControls);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
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

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormControls({ ...formControls, avatar: downloadURL })
        );
      }
    );
  };
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
  console.log(file);
  return (
    <div className="w-full h-full flex justify-center items-center my-20 ">
      <div className=" min-w-[300px] md:min-w-[600px] max-w-2xl bg-color-2 p-5 flex flex-col gap-10 justify-center items-center rounded-lg ">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
          ref={inputRef}
          className="hidden"
        />
        <img
          src={user.avatar}
          onClick={() => inputRef.current.click()}
          alt="avatar"
          className="w-40  rounded-full  "
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
        <button
          onClick={handleLogOut}
          className="bg-red-500 w-full p-5 text-color-1 text-[24px] font-bold rounded-lg "
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
