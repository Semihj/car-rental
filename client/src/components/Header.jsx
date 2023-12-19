import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const [openSideBar, setOpenSideBar] = useState(false);
  
  const user = useSelector((state) => state.user.currentUser); 
  console.log(user)
  return (
    <div className="h-[96px] bg-color-5 w-screen flex   ">
      <div className="w-full h-full md:mx-40 mx-10 flex items-center justify-between ">
        <Link to="/">
          
          <h1 className="text-[35px] font-serif font-light text-color-1 ">
            Car<span className="text-color-3">Kıng</span>
          </h1>
        </Link>
        <div className="hidden md:flex items-center justify-center gap-5 text-color-2 text-[24px] hover:text-color-1 ">
          <Link to="/">Home</Link>
          <Link to="/about-us">About Us</Link>
        { user ? <Link to="/profile"> <img src={user.avatar} alt="avatar" className="w-20 h-20 rounded-full " /> </Link> : <Link to="/sign-in">Sign In</Link>} 
        </div>
        <FiMenu
          onClick={() => setOpenSideBar(true)}
          className="w-[50px] h-[50px] text-color-1 md:hidden "
        />
      </div>
      {openSideBar ? (
        <div
          className={`w-screen absolute h-screen bg-color-5 top-0 left-0  ${
            openSideBar ? "animate-move" : "animate-close"
          }  transition-all duration-700 `}
        >
          <div className="flex flex-col w-full h-full  items-center justify-center gap-5 text-color-1 text-[54px]  ">
            <h1
              className="absolute top-3 right-10"
              onClick={() => setOpenSideBar(false)}
            >
              X
            </h1>
            <Link to="/">Home</Link>
            <Link to="/about-us">About Us</Link>
            { user ? <Link to="/profile"> <img src={user.avatar} alt="avatar" className="w-20 h-20 rounded-full " /> </Link> : <Link to="/sign-in">Sign In</Link>} 
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
