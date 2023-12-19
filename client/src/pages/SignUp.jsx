import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
export default function SignUp() {
  const [formData, setFormData] = useState({

  });
  const navigate = useNavigate()
  const handleChange = (e) => {
   
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
  e.preventDefault()
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
       navigate("/sign-in")
       if(data.success === false) {
        console.log("something error")
      }
     
    } catch (error) {
      console.log(error.message)
    }
  }
console.log(formData)
  return (
    <div className="w-screen  flex  ">
      <div className="w-full h-full flex justify-center   m-10  ">
        <div className="bg-color-3 rounded-md p-10   md:min-w-[600px] min-w-[300px]  flex flex-col  items-center  ">
          <h1 className="text-color-1 font-serif text-[35px] ">Sign Up</h1>
          <form className="w-full flex flex-col gap-5 " onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-2  ">
              <label className="text-color-2 font-bold font-serif text-[24px] ">
                Name
              </label>
              <input
                id="username"
                onChange={handleChange}
                type="text"
                className="p-5 rounded-md bg-color-1 focus:outline-none"
                placeholder="John Doe"
              />
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
            <button type="submit" className="bg-color-4 p-4 rounded-md text-color-1 text-lg font-semibold text-[21px] " > Sign Up </button>
          </form>
          <Link to="/sign-in" className="text-left w-full mt-4 text-color-1 font-semibold truncate   " > Have an Account?</Link>
        </div>
      </div>
    </div>
  );
}
