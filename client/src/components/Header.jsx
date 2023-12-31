import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
export default function Header() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBar, setSearchBar] = useState(false);
  console.log(searchTerm)
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.currentUser);
  const params = useLocation();
  console.log(params)
  
  useEffect(() => {
    setOpenSideBar(false)
  }, [params])
  

 const handleSubmit = (e) => {
  e.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("searchTerm",searchTerm);
  const searchQuery = urlParams.toString();
  navigate(`/search?${searchQuery}`)
  if(searchBar) setSearchBar(false)
 }

 return (
    <div className="h-[96px] w-screen bg-color-5  flex  ">
      {searchBar ? (
        <div className=" absolute w-screen opacity-95  h-full z-20 ">
          <div className="">
            <input type="text" className="w-full text-left truncate border-b-4 border-color-4  mx-auto p-5" onChange={(e) => setSearchTerm(e.target.value) } />
            <Link  >
              
              <FaSearch className="absolute top-5 right-5 text-[22px] cursor-pointer " onClick={handleSubmit} />
            </Link>
          </div>
          <div className="bg-black w-full h-full " onClick={() => setSearchBar(false) } ></div>
        </div>
      ) : (
        ""
      )}
      <div className="w-screen h-full md:mx-40 mx-10 flex items-center justify-between ">
        <Link to="/">
          <h1 className="text-[35px] font-serif font-light text-color-1 ">
            Car<span className="text-color-3">Kıng</span>
          </h1>
        </Link>
        <div className="flex items-center gap-4 ">
          <input
            type="text"
            className="hidden lg:inline-block focus:outline-none px-3 py-2 rounded-lg "
            onChange={(e) => setSearchTerm(e.target.value) }
          />
          
            <FaSearch className="text-white text-[20px] hidden lg:inline-block cursor-pointer " onClick={handleSubmit} />
          
        </div>
        <div className="hidden md:flex items-center justify-center gap-5 text-color-2 text-[24px] hover:text-color-1 ">
          <Link to="/">Home</Link>
          <Link to="/about-us">About Us</Link>
          {user ? (
            
            <Link to="/profile">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full "
              />
            </Link>
            
            
          ) : (
            <Link to="/sign-in">Sign In</Link>
          )}
        </div>
        <div className="flex items-center gap-1 sm:gap-7">
          <Link >
            <FaSearch
              className="text-white text-[22px] lg:hidden cursor-pointer"
              onClick={() => setSearchBar(!searchBar)}
            />
          </Link>
          <FiMenu
            onClick={() => setOpenSideBar(true)}
            className="w-[30px] h-[30px] sm:h-[50px] sm:w-[50px] text-color-1 md:hidden "
          />
        </div>
      </div>
      {openSideBar ? (
        <div
          className={`w-screen absolute h-screen bg-color-5 top-0 left-0 z-20  ${
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
            {user ? (
              <Link to="/profile">
                {" "}
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-20 h-20 rounded-full "
                />{" "}
              </Link>
             
              
            ) : (
              <Link to="/sign-in">Sign In</Link>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
