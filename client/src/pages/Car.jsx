import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
export default function Car() {
  const [carInfo, setCarInfo] = useState({});
  const [showModal, setShowModal] = useState();
  const [owner, setOwner] = useState({})
  const params = useParams();
  console.log(owner)
  useEffect(() => {
    getCar();
    getUser();
  }, [params.id]);
  const getCar = async () => {
    try {
      const res = await fetch(`/api/car/get-car/${params.id}`);
      const data = await res.json();
      setCarInfo(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const res = await fetch(`/api/user/get-user/${carInfo.userRef}`)
      const data = await res.json();
      setOwner(data)
    } catch (error) {
      console.log(error)
    }
  }
  const len = carInfo.images?.length - 1;
  console.log(carInfo);
  return (
    <div className="w-screen min-h-screen relative bg-color-1  ">
      {carInfo?.images && showModal <= len && showModal >= 0 && (
        <div className="w-[100vw] h-screen absolute bg-black opacity-95 flex   ">
          <div className="flex w-full justify-between items-center z-20">
            <FaAngleLeft
              onClick={() => setShowModal(showModal - 1)}
              className="text-white text-[25px] mx-4 md:mx-10  "
            />

            <img
              src={carInfo?.images[showModal]}
              className="object-cover border-4 w-[50%] "
              alt="image"
            />
            <FaAngleRight
              onClick={() => setShowModal(showModal + 1)}
              className="text-white mx-4 text-[25px] md:mx-10 "
            />
          </div>
        </div>
      )}
      {carInfo && carInfo.images && (
        <div className="w-full h-full ">
          <div className="m-10   flex  flex-col md:flex-row gap-4   ">
            <div className="flex bg-white border-4  rounded-md   flex-col gap-4 h-[70%] w-[70%]  justify-center ">
              <img
                src={carInfo.images[0]}
                className="w-[100%] rounded-md max-h-[60vh] object-cover  "
                alt=""
              />
              <div className="m-4 flex justify-between flex-wrap">
                <h1 className="text-[21px] text-slate-800 font-bold truncate ">
                  {carInfo.title}{" "}
                </h1>
                <p className="text-[21px] font-semibold "> {carInfo.price}$ </p>
              </div>
              <p className="m-3  text-[17px] text-slate-700 ">
                {" "}
                {carInfo.description}{" "}
              </p>
            </div>
            <div className="flex  md:flex-col items-center  gap-5 ">
              {carInfo.images.map((image, index) => {
                return (
                  <div className="" key={index}>
                    <img
                      src={image}
                      alt="image"
                      className="w-20 h-20 md:w-40 md:h-40  cursor-pointer object-cover   border-4 "
                      onClick={() => setShowModal(index)}
                    ></img>
                  </div>
                );
              })}
            </div>
            
          </div>
          <div className="w-full m-10 mx-auto flex justify-center items-center ">
          <Link
              to={`mailto:${owner.email}`}
              className="bg-slate-700 mx-auto items-center flex w-[80%] justify-center p-5 text-[24px] rounded-md text-white "
            >
              Contact The Owner
            </Link>
            </div>
        </div>
      )}
    </div>
  );
}
