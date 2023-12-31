import React from "react";

export default function SearchCard({car}) {
  return (
    <div>
        <div className="flex flex-col bg-white shadow-lg p-5 rounded-md h-max items-center justify-center  ">
          <img
            src={car.images[0]}
            alt="car"
            className="w-[300px] object-cover h-[300px] "
          />
          <div className="flex w-full justify-between ">
          <h2> {car.title} </h2>
          <p> {car.price}$ </p>
          </div>

        </div>
    </div>
  );
}
