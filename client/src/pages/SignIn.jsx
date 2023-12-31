import { useState } from "react";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom"
import { signInFailure, signInStart, signInSuccess } from "../redux/user/user";
export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart())
    try {
      const res = await fetch("/api/auth/signin",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)

      })
      const data = await res.json()
      if(data.success != false) {
      dispatch(signInSuccess(data))
      navigate("/")
    }
    } catch (error) {
      console.log(error)
      dispatch(signInFailure())
    }

  }
  return (
    <div className="w-screen  flex  ">
      <div className="w-full h-full flex justify-center   m-10  ">
        <div className="bg-color-3 rounded-md p-10   md:min-w-[600px] min-w-[260px]  flex flex-col  items-center  ">
          <h1 className="text-color-1 font-serif text-[35px] ">Sign In</h1>
          <form className="w-full flex flex-col gap-5 " onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-2  ">
             
            </div>
            <div className="w-full flex flex-col gap-3  ">
              <label className="text-color-2 font-bold font-serif text-[24px] ">
                Email
              </label>
              <input
                id="email"
                onChange={handleChange}
                type="email"
                className="p-5 rounded-md bg-color-1 focus:outline-none "
                placeholder="example@gmail.com"
              />
            </div>
            <div className="w-full flex flex-col gap-3  ">
              <label className="text-color-2 font-bold font-serif text-[24px] ">
                Password
              </label>
              <input
                id="password"
                onChange={handleChange}
                type="password"
                className="p-5 rounded-md bg-color-1 focus:outline-none"
                placeholder="******"
              />
            </div>
            <button className="bg-color-4 p-4 rounded-md text-color-1 text-lg font-semibold text-[21px] " > Sign In </button>
          </form>
          <Link to="/sign-up" className="text-left w-full mt-4 text-color-1 font-semibold truncate   " >Don't Have an Account?</Link>
        </div>
      </div>
    </div>
  );
}
