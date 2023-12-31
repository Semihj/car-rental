import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { cars as brands } from '../utils';
import { FaSearch } from "react-icons/fa";
import SearchCard from '../components/SearchCard';

export default function Search() {
  
  const urlParams = new URLSearchParams(location.search)
  const searchTerm = urlParams.get("searchTerm")
  const brandTerm = urlParams.get("brand")
  const modelTerm = urlParams.get("model")
  const yearTerm = urlParams.get("year")
  const categoryTerm = urlParams.get("category")
  console.log(yearTerm)

  const [cars,setCars] = useState();
  const [filter,setFilter] = useState({
    searchTerm:searchTerm || "" ,
    brand:brandTerm || "" ,
    model:modelTerm || "",
    category:categoryTerm || "",
    year: yearTerm || undefined,
    price:0,
  });
  const [years, setYears] = useState([])
  console.log(cars)
 

  
  const params = useParams()
  useEffect(() => {
    const years = [];
    for (let i = 2023; i > 1950; i--) {
      years.push(i);
    }
    setYears(years)
    fetchCars()
    
  }, [params])
  
  const handleChange = (e) => {
    setFilter({
      ...filter,
      [e.target.id]:e.target.value
    })
  }
  const query = urlParams.toString();
  console.log(query.split())
  const fetchCars = async () => {
   
    const searchQuery = urlParams.toString();
    try {
      const res = await fetch(`/api/car/get-cars?${searchQuery}`);
      const data = await res.json()
      setCars(data)
    } catch (error) {

      console.log(error)
    }
  }
  const brandsNames = brands.car_brands.map((brands) => brands.brand )
  let models;
  const modelsNam = brands.car_brands.map((brands) => {
   if(brands.brand === filter.brand ) {
     models = brands.models
   } 
  } )
  const categories = brands.categories;

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      urlParams.set("searchTerm",filter.searchTerm)
      urlParams.set("category",filter.category)
      urlParams.set("brand",filter.brand)
      urlParams.set("model",filter.model)
     if(filter.year) urlParams.set("year",filter.year) 
      urlParams.set("price",filter.price) 
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`)
    } catch (error) {
      console.log(error)
    }
  }
 console.log(filter)
  return (
    <div className='w-screen min-h-screen flex bg-color-2  ' >

        <div className="m-20 mx-auto  w-full flex flex-col md:flex-row  ">
          <form  className='flex md:hidden w-full min-h-[100px] p-5  bg-color-3 justify-center ' onSubmit={handleSubmit} >
            <div className=" w-full h-full flex flex-col m-2 gap-3  ">
              <div className="flex items-center ">
              <input id='searchTerm' defaultValue={searchTerm} placeholder='search...' onChange={handleChange} type="text" className='w-full h-[40px] rounded-md  ' />
              <FaSearch className='text-[24px] absolute right-10 z-10 ' onClick={handleSubmit} />
              </div>
              <select id="brand" onChange={handleChange} defaultValue={brandTerm}  className='bg-color-2 rounded-md hover:bg-white ' name="" >
              <option value="">Select Brand</option>
              {brandsNames.map((brand,index) => {
                return (
                  <option key={index}  > {brand} </option>
                )
              })}
            </select>
            
              <select id="model" onChange={handleChange} defaultValue={modelTerm} className='bg-color-2 rounded-md hover:bg-white ' name="" >
              <option value="">Select Model</option>
              {models?.map((model,index) => {
                return (
                  <option key={index} > {model} </option>
                )
              })}
            </select>
              <select id="category" onChange={handleChange} defaultValue={categoryTerm} className='bg-color-2 rounded-md hover:bg-white ' name="" >
              <option value="">Select Category</option>
              {categories?.map((category,index) => {
                return (
                  <option key={index} > {category} </option>
                )
              })}
            </select>
            <select id="year" onChange={handleChange}  defaultValue={yearTerm} className='bg-color-2 rounded-md hover:bg-white ' name="">
              <option value="">Select Year</option>
              {years?.map((year,index) => {
                return (
                  <option key={index} > {year} </option>
                )
              })}
            </select>
            <div className="mx-10 flex gap-5 items-center ">
              <h3>Min-Price:</h3>
              <input id='price' onChange={handleChange} type="number" defaultValue={2000} placeholder='2000$' className='p-2  rounded-md'  />
            </div>
              <button className='bg-color-2 p-3 rounded-md text-[20px] ' >Filter</button>
            </div>
          </form>
          <form onSubmit={handleSubmit} className="fixed hidden right-0 top-0 w-full md:w-auto mx-10 md:sticky md:top-10 md:p-0 bg-slate-600 p-5 rounded-md h-max md:flex flex-col  ">
            <div className="m-10 flex justify-center items-center gap-2  ">
              <input id='searchTerm' defaultValue={searchTerm} type="text" className=' w-full rounded-md p-3 ' placeholder='Search...' onChange={handleChange} />
            </div>
            <div className="flex m-10 gap-5 ">
              <h3 className='text-white text-[22px] ' >Brand:</h3>
            <select id="brand" onChange={handleChange} defaultValue={brandTerm} className='bg-color-2 rounded-md hover:bg-white ' name="" >
              <option value="">Select</option>
              {brandsNames.map((brand,index) => {
                return (
                  <option key={index} > {brand} </option>
                )
              })}
            </select>
            </div>
            <div className="flex mx-10 gap-5 ">
              <h3 className='text-white text-[22px] ' >Models:</h3>
            <select id="model" onChange={handleChange}  className='bg-color-2 rounded-md hover:bg-white ' name="">
              <option value="">Select</option>
              {models?.map((brand,index) => {
                return (
                  <option key={index} > {brand} </option>
                )
              })}
            </select>
            </div>
            <div className="flex mt-10 mx-10 gap-5 ">
              <h3 className='text-white text-[22px] ' >Categories:</h3>
            <select id="category" onChange={handleChange} className='bg-color-2 rounded-md hover:bg-white ' name="">
              <option value="">Select</option>
              {categories?.map((category,index) => {
                return (
                  <option key={index} > {category} </option>
                )
              })}
            </select>
            </div>
            <div className="flex m-10 gap-5 ">
              <h3 className='text-white text-[22px] ' >Year:</h3>
            <select id="year" onChange={handleChange} className='bg-color-2 rounded-md hover:bg-white ' name="">
              <option value="">Select</option>
              {years?.map((year,index) => {
                return (
                  <option key={index} > {year} </option>
                )
              })}
            </select>
            </div>
            
            <div className="mx-10 flex gap-5 items-center ">
              <h3 className='text-white text-[22px] ' >Min-Price:</h3>
              <input id='price' onChange={handleChange} type="number"  placeholder='2000$' className='p-2  rounded-md'  />
            </div>
            <button  className='m-10 bg-color-2 p-5 rounded-lg text-[24px] font-semibold  ' >Filter</button>
          </form>
            
            <div className=" w-full m-10 flex gap-5 justify-center md:justify-start flex-wrap mx-auto md:mx-10 ">
              { cars ?  cars?.map((car,index) => {
                return (
                 <Link to={`/car/${car._id}`}  key={index}>
               <SearchCard car={car} />
                  </Link>
                )
              }) :"loading"}
            </div>
        </div>
        
    </div>
  )
}
