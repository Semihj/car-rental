import React from 'react'

export default function Hero({image}) {
  return (
    <div className='w-screen h-full bg-black flex  ' >
      <div className="w-full m-10 my-20 flex mx-auto md:mx-10  ">
        <div className="flex w-full justify-between m-10  gap-20 items-center flex-col lg:flex-row ">
        <div className="flex flex-col max-w-[340px] ">
        <h1 className='text-white text-[37px] font-serif '>
            Car
            <span className='text-color-3 text-[47px] ' >Kıng</span>
        </h1>
        <p className='text-[25px] text-white  ' >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste qui quibusdam necessitatibus aliquid illo?
        </p>
      </div>
     <div className="flex  mx-auto    ">
        <img src={image} className='w-[320px] sm:w-[400px]  md:w-[700px] object-cover rounded-lg' alt="" />
     </div>
        </div>
      </div>
    </div>
  )
}
