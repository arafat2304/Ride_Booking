import React from "react";
import { Link } from "react-router-dom";
export default function Start() {

  return(
    <div className="lg:w-1/2 lg:mx-[300px] lg:h-[300px]">
      <div className="bg-cover bg-center bg-[url(https://cdn.pixabay.com/photo/2017/11/01/20/50/highway-2909336_1280.jpg)] h-screen pt-8  w-full flex justify-between flex-col">
        <img className="w-16 ml-8" />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get started with US</h2>
          <Link to="/login" className=" flex justify-center item-center w-full bg-black text-white rounded py-3 mt-5" >Continue</Link>
        </div>
      </div>
    </div>
  )
}