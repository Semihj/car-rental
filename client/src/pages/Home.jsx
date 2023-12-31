import React, { useEffect, useState } from "react";
import Row from "../components/Row";
import Hero from "../components/Hero";

export default function Home() {
  const [car, setCar] = useState({images:[]})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
 
    fetchCar()
    
  }, [])
  console.log(loading)

  const fetchCar = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/car/get-car/6590fb76865e2191dec65f6e`)
      const data = await res.json();
      if(data.success != false) {
        setLoading(false)
        setCar(data)
      }
      setCar(data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(car)

  return (
    
  <div className="w-screen min-h-screen flex flex-col  ">
   <div className="flex flex-col ">
  <Hero image={car.images[0]} />

  </div>
    <Row title="Coupe" category="coupe" />
    <Row title="SUV" category="suv" />
  </div>
  
  )
}
