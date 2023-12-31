import React from "react";
import { FaTwitterSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";

export default function Footer() {
  return (
    <div className="w-screen p-10  bg-color-5  ">
      <div className="flex flex-col  p-5 bg-color-5 justify-center   items-center flex-wrap ">
        <div className="flex flex-col gap-10 border-b-4 my-10 p-7 justify-center   border-slate-500 w-full items-center  ">
          <div className="flex flex-wrap gap-4  mx-10 mx-auto items-center">
            <Link
              to="https://twitter.com/semih_devv"
              target="_blank"
              className=" "
            >
              <FaTwitterSquare className="text-[44px]   text-blue-600 " />
            </Link>
            <Link
              to="https://twitter.com/semih_devv"
              target="_blank"
              className="text-[22px] text-white truncate "
            >
              https://twitter.com/semih_devv
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 mx-10 mx-auto items-center">
            
            <Link
              to="https://github.com/Semihj"
              target="_blank"
            >
              <FaGithub className="text-[44px] text-white " />
              </Link>
              <Link to="https://github.com/Semihj" target="_blank" className="text-[22px] text-white ">
                https://github.com/Semihj
              </Link>
            
          </div>
          <div className="flex flex-wrap gap-4 mx-10 mx-auto items-center" >
          <Link
            to="mailto:semihszak@gmail.com"
          >
         <CiMail className="text-[44px] text-white " /> 
         </Link> 
           
          <Link to="mailto:semihszak@gmail.com" className="text-[22px] text-white ">  semihszak@gmail.com 
          </Link> 
          </div>
        </div>
        <p className="text-white mt-10"> All copyrights Reserved &copy; </p>
      </div>
    </div>
  );
}
