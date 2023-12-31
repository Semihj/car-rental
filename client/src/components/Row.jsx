import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Row({ title, category }) {
  const [cars, setCars] = useState({});

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await fetch(`/api/car/get-cars?category=${category}`);
      const data = await res.json();
      setCars(data.slice(0,5));
    } catch (error) {
      console.log(error);
    }
  };

  console.log(cars);
  return (
    <div className="flex flex-col gap-10 m-10 mx-auto border-4   ">
      <Link to={`/search?category=${title}`} >
        
        <h1 className="items-center m-10 text-[30px] font-bold hover:underline w-max ">
          {title} 
        </h1>
      </Link>
      <div className="flex gap-6 flex-wrap mx-auto sm:mx-10  items-center text-left ">
        {cars.length > 0 &&
          cars?.map((car, index) => {
            return (
              <div className="border-2 m-2 p-4 min-w-[260px]  flex flex-col justify-center items-center  shadow-lg rounded-md " key={index}>
              <Link to={`/car/${car._id}`} className="justify-cente " >
                <img
                  src={car.images[0]}
                  alt=""
                  className={`w-[300px] h-[300px] rounded-lg object-cover `}
                />
                </Link>
                <div className="flex w-full justify-between m-2 border-b-4 ">
                  <h1 className="hover:underline" > {car.title} </h1>
                  <p>{car.price}$ </p>
                </div>
                <p className="m-2" > {car.description} </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
